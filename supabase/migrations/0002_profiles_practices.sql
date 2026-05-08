-- Praxino — Phase 4: profiles, practices, memberships
--
-- Setzt das Mandanten-Modell auf:
--   • profiles: 1:1 zu auth.users, Onboarding-Flag
--   • practices: Praxis-Stammdaten (owner_id zeigt auf auth.users)
--   • memberships: User ↔ Practice (role: owner/admin/therapist/assistant)
-- Plus RLS-Policies und Auto-Profile-Trigger.

create extension if not exists "pgcrypto";

------------------------------------------------------------
-- profiles
------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  email text,
  full_name text,
  onboarded_at timestamptz
);

comment on table public.profiles is
  'Praxino-Profil pro Auth-User. Wird automatisch via Trigger angelegt, beim Onboarding mit Daten gefüllt.';

create index if not exists profiles_email_idx on public.profiles (lower(email));

alter table public.profiles enable row level security;

drop policy if exists "users can read own profile" on public.profiles;
create policy "users can read own profile"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

drop policy if exists "users can update own profile" on public.profiles;
create policy "users can update own profile"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

drop policy if exists "users can insert own profile" on public.profiles;
create policy "users can insert own profile"
  on public.profiles for insert
  to authenticated
  with check (id = auth.uid());

------------------------------------------------------------
-- practices
------------------------------------------------------------
create table if not exists public.practices (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  discipline text not null,
  team_size text
);

comment on table public.practices is
  'Eine Praxis. owner_id ist die anlegende Person — Mitgliedschaften steuern den Zugriff über public.memberships.';

create index if not exists practices_owner_id_idx on public.practices (owner_id);

alter table public.practices enable row level security;

------------------------------------------------------------
-- memberships
------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'membership_role') then
    create type public.membership_role as enum ('owner', 'admin', 'therapist', 'assistant');
  end if;
end$$;

create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users(id) on delete cascade,
  practice_id uuid not null references public.practices(id) on delete cascade,
  role public.membership_role not null default 'therapist',
  unique (user_id, practice_id)
);

comment on table public.memberships is
  'Verknüpft User und Praxis mit Rolle. RLS auf Patient:innen/Sitzungen/Berichten checkt diese Tabelle.';

create index if not exists memberships_practice_id_idx on public.memberships (practice_id);
create index if not exists memberships_user_id_idx on public.memberships (user_id);

alter table public.memberships enable row level security;

------------------------------------------------------------
-- helper: is user member of practice
------------------------------------------------------------
create or replace function public.is_practice_member(p_practice_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.memberships m
    where m.user_id = auth.uid() and m.practice_id = p_practice_id
  );
$$;

------------------------------------------------------------
-- practices: RLS
------------------------------------------------------------
drop policy if exists "members can read their practices" on public.practices;
create policy "members can read their practices"
  on public.practices for select
  to authenticated
  using (public.is_practice_member(id));

drop policy if exists "owners can update their practices" on public.practices;
create policy "owners can update their practices"
  on public.practices for update
  to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

drop policy if exists "users can create their own practice" on public.practices;
create policy "users can create their own practice"
  on public.practices for insert
  to authenticated
  with check (owner_id = auth.uid());

drop policy if exists "owners can delete their practices" on public.practices;
create policy "owners can delete their practices"
  on public.practices for delete
  to authenticated
  using (owner_id = auth.uid());

------------------------------------------------------------
-- memberships: RLS
------------------------------------------------------------
drop policy if exists "users can read own memberships" on public.memberships;
create policy "users can read own memberships"
  on public.memberships for select
  to authenticated
  using (user_id = auth.uid() or public.is_practice_member(practice_id));

drop policy if exists "users can insert own membership" on public.memberships;
create policy "users can insert own membership"
  on public.memberships for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "users can delete own membership" on public.memberships;
create policy "users can delete own membership"
  on public.memberships for delete
  to authenticated
  using (user_id = auth.uid());

------------------------------------------------------------
-- handle_new_user trigger: legt automatisch ein Profil an
------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', null)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

------------------------------------------------------------
-- updated_at trigger helper
------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated on public.profiles;
create trigger profiles_touch_updated
  before update on public.profiles
  for each row execute function public.touch_updated_at();

drop trigger if exists practices_touch_updated on public.practices;
create trigger practices_touch_updated
  before update on public.practices
  for each row execute function public.touch_updated_at();
