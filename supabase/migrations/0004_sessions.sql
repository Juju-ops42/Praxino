-- Praxino — Phase 5: sessions + session_notes
--
-- Eine Sitzung gehört zu genau einer Patient:in (und damit zu einer Praxis).
-- session_notes dokumentieren Beobachtungen / Übungen / Empfehlungen einer
-- Sitzung. Beide Tabellen führen practice_id redundant mit, damit RLS
-- direkt über is_practice_member (Migration 0002) prüfbar ist — ohne JOIN.

create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  practice_id uuid not null references public.practices(id) on delete cascade,
  patient_id uuid not null references public.patients(id) on delete cascade,
  created_by uuid not null references auth.users(id),

  occurred_at timestamptz not null default now(),
  duration_minutes int not null default 45 check (duration_minutes between 5 and 240),
  goal text,
  summary text,
  status text not null default 'logged' check (status in ('logged', 'draft', 'signed'))
);

comment on table public.sessions is
  'Therapie-Sitzung — Verbindung zwischen Patient:in und Verlauf. status: logged (passiert), draft (in Bearbeitung), signed (Therapeut:in freigegeben).';

create index if not exists sessions_practice_id_idx
  on public.sessions (practice_id);
create index if not exists sessions_patient_id_idx
  on public.sessions (patient_id);
create index if not exists sessions_occurred_at_idx
  on public.sessions (occurred_at desc);

alter table public.sessions enable row level security;

drop policy if exists "members read sessions" on public.sessions;
create policy "members read sessions"
  on public.sessions for select
  to authenticated
  using (public.is_practice_member(practice_id));

drop policy if exists "members insert sessions" on public.sessions;
create policy "members insert sessions"
  on public.sessions for insert
  to authenticated
  with check (
    public.is_practice_member(practice_id)
    and created_by = auth.uid()
  );

drop policy if exists "members update sessions" on public.sessions;
create policy "members update sessions"
  on public.sessions for update
  to authenticated
  using (public.is_practice_member(practice_id))
  with check (public.is_practice_member(practice_id));

drop policy if exists "members delete sessions" on public.sessions;
create policy "members delete sessions"
  on public.sessions for delete
  to authenticated
  using (public.is_practice_member(practice_id));

drop trigger if exists sessions_touch_updated on public.sessions;
create trigger sessions_touch_updated
  before update on public.sessions
  for each row execute function public.touch_updated_at();

------------------------------------------------------------
-- session_notes
------------------------------------------------------------
create table if not exists public.session_notes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  practice_id uuid not null references public.practices(id) on delete cascade,
  created_by uuid not null references auth.users(id),
  content text not null check (length(trim(content)) > 0),
  kind text not null default 'observation'
    check (kind in ('observation', 'exercise', 'recommendation'))
);

comment on table public.session_notes is
  'Notizen zu einer Sitzung. kind: observation (Beobachtung), exercise (Übung), recommendation (Empfehlung).';

create index if not exists session_notes_session_id_idx
  on public.session_notes (session_id);
create index if not exists session_notes_practice_id_idx
  on public.session_notes (practice_id);

alter table public.session_notes enable row level security;

drop policy if exists "members read session_notes" on public.session_notes;
create policy "members read session_notes"
  on public.session_notes for select
  to authenticated
  using (public.is_practice_member(practice_id));

drop policy if exists "members insert session_notes" on public.session_notes;
create policy "members insert session_notes"
  on public.session_notes for insert
  to authenticated
  with check (
    public.is_practice_member(practice_id)
    and created_by = auth.uid()
  );

drop policy if exists "members update session_notes" on public.session_notes;
create policy "members update session_notes"
  on public.session_notes for update
  to authenticated
  using (public.is_practice_member(practice_id))
  with check (public.is_practice_member(practice_id));

drop policy if exists "members delete session_notes" on public.session_notes;
create policy "members delete session_notes"
  on public.session_notes for delete
  to authenticated
  using (public.is_practice_member(practice_id));
