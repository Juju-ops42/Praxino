# Praxino — Architektur (Stand Meilenstein 1)

Dieses Dokument beschreibt den aktuellen architektonischen Zuschnitt von
Praxino sowie die geplante Evolution. Es wird mit jeder Phase fortgeschrieben.

## Übersicht

```
┌──────────────────────┐        ┌────────────────────────────────────────┐
│  Vercel Edge / CDN   │        │  Supabase (EU-Region geplant)          │
│  – static SPA build  │  HTTPS │  – Postgres                             │
│  – SPA rewrites      ├───────▶│  – Auth (E-Mail/OTP)                    │
│  – Headers / CSP     │        │  – Storage (Audio, später)              │
└──────┬───────────────┘        │  – Edge Functions (KI-Pipeline, später) │
       │ HTTP                   └────────────────────────────────────────┘
       ▼
┌──────────────────────┐
│  Browser (Praxis)    │
│  – React 19 SPA      │
│  – Tailwind v4       │
│  – React Router 7    │
│  – Supabase JS       │
└──────────────────────┘
```

## Frontend

- **Bundler:** Vite 6 mit `@vitejs/plugin-react` und `@tailwindcss/vite`.
- **Sprache:** TypeScript mit `strict: true`, `noUnusedLocals`, `noUnusedParameters`.
- **Routing:** `react-router-dom` v7 als BrowserRouter; SPA-Rewrites in `vercel.json`.
- **State:** Local State pro Komponente. TanStack Query wird Phase 3 eingeführt.
- **Design-System:** Custom Tokens via `@theme` in `src/styles/globals.css`
  (Surface-, Ink-, Accent- und Creme-Skalen). Komponenten in `src/components/ui`.
- **Form-Handling:** Native HTML-Forms mit eigener Validierung; `react-hook-form` /
  `zod` werden bei wachsender Komplexität (App-Phase) eingeführt.
- **Icons:** `lucide-react`.

## Backend / Supabase

- **Datenbank:** Postgres mit `pgcrypto` für UUIDs.
- **Auth:** Supabase-Auth (E-Mail/OTP) — wird ab Phase 4 eingeführt.
- **Storage:** Audio-Uploads (Phase 6) auf privaten Buckets mit kurzlebigen
  Signed URLs.
- **Edge Functions:** Server-side für KI-Aufrufe und Webhooks (Phase 6+).

### Datenmodell (Ziel — Auszug)

| Tabelle              | Zweck |
|----------------------|-------|
| `pilot_waitlist`     | Pilotanfragen aus der Landingpage *(implementiert)*. |
| `profiles`           | 1:1 zu `auth.users`, Praxis-/Rollen-Pointer. |
| `practices`          | Praxis-Stammdaten. |
| `memberships`        | User ↔ Practice mit `role` (`owner`, `therapist`, `assistant`, `admin`). |
| `patients`           | Patient:in (pseudonymisierte ID, Initialen für Anzeige). |
| `prescriptions`      | Verordnungen, Heilmittelpositionsnummer, Frequenz, Einheiten. |
| `diagnoses`          | ICD-10 + ICF, mehrfach pro Patient:in möglich. |
| `sessions`           | Sitzungen pro Patient:in, Verlaufsnotizen. |
| `session_transcripts`| Audio-Referenz + Transkript (Phase 6). |
| `reports`            | Therapie-, Verlängerungs-, Befund-, MDK-Berichte. |
| `audit_log`          | Wer hat was wann gesehen / geändert / freigegeben. |

### Mandantenfähigkeit

Multi-Tenancy auf Praxis-Ebene über `practice_id`-Spalten und RLS-Policies.
Jede Tabelle mit Patientenbezug erhält `practice_id` und eine Policy nach
folgendem Muster (vereinfachtes Beispiel):

```sql
create policy "members can read patients of their practice"
  on public.patients
  for select
  to authenticated
  using (
    exists (
      select 1 from public.memberships m
      where m.user_id = auth.uid()
        and m.practice_id = patients.practice_id
    )
  );
```

Insert/Update/Delete erhalten zusätzliche Rollen-Checks (`role in ('owner','therapist')`).

### Audio-Verarbeitung (Phase 6, geplant)

1. Browser nimmt Audio nach Consent auf (`MediaRecorder`).
2. Upload zu privatem Storage-Bucket via Signed URL.
3. Edge Function startet Transcription über provider-agnostische Abstraktion
   (`TranscriptionProvider` Interface). Provider sind austauschbar (z. B.
   eigenes Modell, Whisper-API, Deepgram). Auswahl orientiert sich an
   DSGVO-/EU-Konformität.
4. Transkript landet in `session_transcripts`. Original-Audio nach 7–30 Tagen
   automatisch gelöscht (Retention Policy konfigurierbar pro Praxis).

### KI-Pipeline (Phase 7, geplant)

```
session_transcript → strukturierter Extraktor → Bericht-Renderer → Editor → Freigabe
                            │
                            ├──► ICD-10 / ICF Mapping
                            ├──► Verordnungs-Kontext
                            └──► Therapieziel-Verlauf
```

Jede generierte Aussage hält Provenance-Metadaten (Quelle: Transkript-Span,
Verordnung, Vorbericht). Therapeut:in sieht im Editor pro Block, woher er kommt.

## Sicherheit

- **CSP / Header:** Basis-Header in `vercel.json` (X-Content-Type-Options,
  X-Frame-Options, Referrer-Policy, Permissions-Policy für `microphone=()` —
  später gezielt freigegeben für Audio-Routes).
- **Service Role Key:** ausschließlich server-seitig; nie im Bundle.
- **RLS:** auf jeder Tabelle aktiviert.
- **Audit Log:** ab Phase 8 pflicht — kein Bericht-Update ohne Eintrag.
- **Backups & Recovery:** Supabase-Standard-Backups + dokumentierter
  Wiederherstellungsprozess (Phase 10).

## Deployment

- **Frontend:** Vercel (Production aus `main`-Branch, Previews aus PRs).
- **Datenbank:** Supabase Hosted (EU-Region).
- **Migrations:** Versioniert in `supabase/migrations/`. Lokal über
  `supabase db push`, später CI-Pipeline mit PR-Vorschau-Datenbanken.
- **Secrets:** Vercel Project Settings + Supabase Dashboard. Service Role nur
  als Vercel Env für Edge Functions / API Routes; nie als `VITE_*`.

## Beobachtbarkeit (geplant)

- **Frontend:** strukturiertes Console-Logging in Dev, Sentry-ähnliches Tooling
  in Prod (Phase 9).
- **Backend:** Supabase Logs + Edge-Function-Logs.
- **Produkt-Analytics:** Privacy-First (Plausible / Pirsch), keine Analyse
  sensibler Inhalte.

## Notes / Konventionen

- Komponenten klein halten (max. ~250 Zeilen). Sektion-Komponenten landen in
  `components/landing/`.
- Pfad-Alias `@/*` zeigt auf `src/*` (siehe `tsconfig.json` + `vite.config.ts`).
- Keine `any`. Domain-Types in `src/types`.
- Form-State explizit, nicht in Refs versteckt.
