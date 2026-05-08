-- Praxino — Phase 5: patients
--
-- Eine Patient:in gehört genau zu einer Praxis. Klarnamen werden bewusst
-- NICHT gespeichert — wir nutzen Initialen (z. B. "M.K.") für Anzeige und
-- Geburtsjahr für Disambiguierung. Klartext-Felder werden später hinter
-- erweiterte Rollen-Rechte gestellt (Phase 8).
--
-- Voraussetzung: Migration 0002 (practices + memberships + is_practice_member)

create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  practice_id uuid not null references public.practices(id) on delete cascade,
  created_by uuid not null references auth.users(id),

  initials text not null check (length(trim(initials)) > 0),
  year_of_birth int check (year_of_birth between 1900 and extract(year from now())::int),
  indication text,
  icd10 text,
  status text not null default 'active' check (status in ('active', 'paused', 'archived')),
  notes text
);

comment on table public.patients is
  'Pseudonymisierte Patient:innen. Klarnamen liegen außerhalb der Anwendung — nur Initialen + Geburtsjahr in der DB.';

create index if not exists patients_practice_id_idx
  on public.patients (practice_id);

create index if not exists patients_practice_status_idx
  on public.patients (practice_id, status);

create index if not exists patients_created_at_idx
  on public.patients (created_at desc);

alter table public.patients enable row level security;

drop policy if exists "members read patients" on public.patients;
create policy "members read patients"
  on public.patients for select
  to authenticated
  using (public.is_practice_member(practice_id));

drop policy if exists "members insert patients" on public.patients;
create policy "members insert patients"
  on public.patients for insert
  to authenticated
  with check (
    public.is_practice_member(practice_id)
    and created_by = auth.uid()
  );

drop policy if exists "members update patients" on public.patients;
create policy "members update patients"
  on public.patients for update
  to authenticated
  using (public.is_practice_member(practice_id))
  with check (public.is_practice_member(practice_id));

drop policy if exists "members delete patients" on public.patients;
create policy "members delete patients"
  on public.patients for delete
  to authenticated
  using (public.is_practice_member(practice_id));

drop trigger if exists patients_touch_updated on public.patients;
create trigger patients_touch_updated
  before update on public.patients
  for each row execute function public.touch_updated_at();
