-- Praxino — Fix: practices SELECT-Policy für Self-Ownership
--
-- Bug: Beim Onboarding ruft createPracticeWithMembership ein
-- `insert(...).select("*").single()` auf practices auf. PostgREST liest
-- die gerade eingefügte Zeile via RLS-gefiltertem RETURNING zurück.
-- Die bisherige SELECT-Policy "members can read their practices" prüft
-- `is_practice_member(id)` — aber die Mitgliedschaft wird ERST DANACH
-- angelegt. Resultat: .single() schlägt fehl, Membership-Insert wird
-- übersprungen, Onboarding bricht ab.
--
-- Fix: SELECT-Policy auf practices erlaubt zusätzlich `owner_id = auth.uid()`.
-- Das deckt den Onboarding-Fall (Owner liest sich selbst) und ist konsistent
-- mit der UPDATE-/DELETE-Policy, die ohnehin owner_id checkt.

drop policy if exists "members can read their practices" on public.practices;
create policy "members can read their practices"
  on public.practices for select
  to authenticated
  using (
    public.is_practice_member(id)
    or owner_id = auth.uid()
  );
