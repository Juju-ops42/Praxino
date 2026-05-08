-- Praxino — Phase 7: reports
--
-- Berichte aus Sitzung + Verordnung + Verlauf. Bewusst schlank in v1:
--   • type: therapie / verlaengerung / befund / mdk
--   • status: draft → in_review → signed → exported
--   • content jsonb: strukturierte Sektionen (befund, therapieziel, verlauf,
--     empfehlung, …) — Editor-Format kann sich entwickeln, ohne Migration
--   • Optional an eine Sitzung verknüpft (session_id) und immer an Patient:in
--   • Versionierung als int (einfach hochzählen bei jedem Update außer
--     Statuswechsel) — saubere Versions-Historie folgt in Phase 8.

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  practice_id uuid not null references public.practices(id) on delete cascade,
  patient_id uuid not null references public.patients(id) on delete cascade,
  session_id uuid references public.sessions(id) on delete set null,
  created_by uuid not null references auth.users(id),

  type text not null check (type in ('therapie', 'verlaengerung', 'befund', 'mdk')),
  title text not null check (length(trim(title)) > 0),
  status text not null default 'draft'
    check (status in ('draft', 'in_review', 'signed', 'exported')),
  content jsonb not null default '{}'::jsonb,
  version int not null default 1,
  signed_at timestamptz,
  signed_by uuid references auth.users(id)
);

comment on table public.reports is
  'Therapie- / Verlängerungs- / Befund- / MDK-Berichte. content (jsonb) hält Sektionen-Daten flexibel; status steuert den Freigabe-Workflow.';

create index if not exists reports_practice_id_idx
  on public.reports (practice_id);
create index if not exists reports_patient_id_idx
  on public.reports (patient_id);
create index if not exists reports_practice_status_idx
  on public.reports (practice_id, status);
create index if not exists reports_updated_at_idx
  on public.reports (updated_at desc);

alter table public.reports enable row level security;

drop policy if exists "members read reports" on public.reports;
create policy "members read reports"
  on public.reports for select
  to authenticated
  using (public.is_practice_member(practice_id));

drop policy if exists "members insert reports" on public.reports;
create policy "members insert reports"
  on public.reports for insert
  to authenticated
  with check (
    public.is_practice_member(practice_id)
    and created_by = auth.uid()
  );

drop policy if exists "members update reports" on public.reports;
create policy "members update reports"
  on public.reports for update
  to authenticated
  using (public.is_practice_member(practice_id))
  with check (public.is_practice_member(practice_id));

drop policy if exists "members delete reports" on public.reports;
create policy "members delete reports"
  on public.reports for delete
  to authenticated
  using (public.is_practice_member(practice_id));

drop trigger if exists reports_touch_updated on public.reports;
create trigger reports_touch_updated
  before update on public.reports
  for each row execute function public.touch_updated_at();
