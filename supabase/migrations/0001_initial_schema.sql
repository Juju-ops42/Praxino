-- Praxino — initiales Schema
-- Phase 0: Pilot-Waitlist als minimal nutzbare Tabelle für die Landingpage.
-- Spätere Migrationen ergänzen Profiles, Praxen, Memberships, Patienten,
-- Sitzungen, Berichte, Audit Log etc.
--
-- Konventionen:
--   • UUIDs als Primärschlüssel
--   • created_at / updated_at als timestamptz default now()
--   • Row Level Security ist auf jeder Tabelle aktiviert
--   • Anon-Rollen erhalten nur, was strikt nötig ist (hier: INSERT in pilot_waitlist)

create extension if not exists "pgcrypto";

------------------------------------------------------------
-- pilot_waitlist
------------------------------------------------------------
create table if not exists public.pilot_waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  practice_name text,
  email text not null,
  discipline text,
  team_size text,
  message text,
  source text not null default 'landingpage'
);

comment on table public.pilot_waitlist is
  'Eingehende Anfragen von Pilot-Praxen über die Landingpage. Keine Patientendaten.';

create index if not exists pilot_waitlist_created_at_idx
  on public.pilot_waitlist (created_at desc);

create index if not exists pilot_waitlist_email_idx
  on public.pilot_waitlist (lower(email));

------------------------------------------------------------
-- Row Level Security
------------------------------------------------------------
alter table public.pilot_waitlist enable row level security;

-- Anonyme Inserts erlauben, damit das Landingpage-Formular ohne Login funktioniert.
-- WICHTIG: Es gibt absichtlich KEINE select-/update-/delete-Policy für anon —
-- Pilotanfragen sind nur über den service_role-Key oder eingeloggte Admins lesbar.
drop policy if exists "Allow anonymous waitlist inserts" on public.pilot_waitlist;
create policy "Allow anonymous waitlist inserts"
  on public.pilot_waitlist
  for insert
  to anon, authenticated
  with check (true);

-- Optional: Admins (eingeloggte Service-Rolle) sehen alle Einträge — über service_role
-- Key ohnehin, daher hier keine zusätzliche select-Policy für authenticated.

------------------------------------------------------------
-- Hinweis für Folge-Migrationen
------------------------------------------------------------
-- 0002_profiles.sql      — Therapeut:innen-Profile gekoppelt an auth.users
-- 0003_practices.sql     — Praxen + Memberships + Roles
-- 0004_patients.sql      — Patient:innen, Verordnungen, ICD-10 strukturiert
-- 0005_sessions.sql      — Sitzungen, Therapieziele, Verlauf
-- 0006_reports.sql       — Berichte (Therapie-, Verlängerungs-, Befund-, MDK)
-- 0007_audit_log.sql     — Auditierbare Verarbeitung
