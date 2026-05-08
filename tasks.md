# Praxino Tasks

Roadmap für die Dauerentwicklung von Praxino. Jede Task ist so geschrieben,
dass ein Coding-Agent sie eigenständig abarbeiten kann.

## Status-Legende

- `[ ]` Offen
- `[~]` In Arbeit
- `[x]` Erledigt
- `[!]` Blockiert

Priorität: Hoch · Mittel · Niedrig

---

## Phase 0 — Projektbasis

### P0-001 — Projekt initialisieren
Status: `[x]`
Priorität: Hoch

**Kontext:** React-19/Vite-6/TS-Setup mit Tailwind v4 als Fundament.
**Ziel:** Lauffähige `pnpm dev`/`pnpm build`-Pipeline.
**Akzeptanzkriterien:**
- `package.json` mit React 19, Vite 6, TS 5.7, Tailwind v4 vorhanden.
- `pnpm install` läuft ohne Fehler.
- `pnpm build` erzeugt `dist/`.
**Dateien:** `package.json`, `tsconfig*.json`, `vite.config.ts`, `index.html`.

### P0-002 — Tailwind v4 + Designtokens
Status: `[x]`
Priorität: Hoch

**Kontext:** Eigenes Theme (Surface / Ink / Accent / Creme) per CSS `@theme`.
**Akzeptanzkriterien:**
- `src/styles/globals.css` definiert Token + Basis-Layer.
- Klassen wie `bg-surface-50`, `text-ink-900`, `bg-accent-500` sind nutzbar.
- Fokus-Style `:focus-visible` global gesetzt.
**Dateien:** `src/styles/globals.css`, `vite.config.ts` (`@tailwindcss/vite`).

### P0-003 — Routing-Skelett
Status: `[x]`
Priorität: Hoch

**Akzeptanzkriterien:** `/`, `/privacy`, `/imprint`, `/app`, `*` (404) sind
gemounted und navigierbar.
**Dateien:** `src/app/routes.tsx`, `src/main.tsx`, `src/pages/*.tsx`.

### P0-004 — Supabase Client
Status: `[x]`
Priorität: Hoch

**Kontext:** Bei fehlenden ENV-Variablen darf nichts crashen.
**Akzeptanzkriterien:**
- `isSupabaseConfigured` korrekt.
- `supabase` ist `null`, wenn ENVs fehlen.
- App rendert weiterhin.
**Dateien:** `src/lib/supabase.ts`, `.env.example`.

### P0-005 — Env-Handling & `vite-env.d.ts`
Status: `[x]`
Priorität: Hoch

**Akzeptanzkriterien:** `import.meta.env.VITE_SUPABASE_*` ist typisiert.
**Dateien:** `src/vite-env.d.ts`, `.env.example`.

### P0-006 — Vercel-Deployment-Konfig
Status: `[x]`
Priorität: Hoch

**Akzeptanzkriterien:**
- `vercel.json` mit SPA-Rewrites.
- Sicherheits-Header (X-Frame-Options, Referrer-Policy, Permissions-Policy).
- `outputDirectory: dist`, `framework: vite`.
**Dateien:** `vercel.json`.

### P0-007 — README.md
Status: `[x]`
Priorität: Hoch

**Akzeptanzkriterien:** Lokale Installation, Env-Setup, Supabase-Setup,
Vercel-Deployment, nächste Schritte und Sicherheitshinweise.
**Dateien:** `README.md`.

### P0-008 — Build- & Typecheck-Verifikation
Status: `[ ]`
Priorität: Hoch

**Ziel:** `pnpm install && pnpm typecheck && pnpm build` läuft auf grünem
Vercel-Build-Container ebenfalls durch.
**Akzeptanzkriterien:**
- Keine TS-Fehler.
- Keine Vite-Build-Fehler.
- `dist/index.html` existiert nach Build.
**Hinweise:** Bei Tailwind-v4-Issues `@tailwindcss/vite` Version checken.

---

## Phase 1 — Landingpage

### P1-001 — Hero-Section
Status: `[x]`
Priorität: Hoch

**Akzeptanzkriterien:**
- Headline + Subheadline + 2 CTAs (Pilotpraxis werden / Produkt ansehen).
- Trust-Zeile.
- Browser-Mockup mit Sitzung + Live-Doku + Berichtsentwurf.
- Keine echten Patientendaten.
**Dateien:** `src/components/landing/HeroSection.tsx`.

### P1-002 — Problem-Section
Status: `[x]`
**Dateien:** `src/components/landing/ProblemSection.tsx`.

### P1-003 — Solution-Section (3 Schritte)
Status: `[x]`
**Dateien:** `src/components/landing/SolutionSection.tsx`.

### P1-004 — Produkt-Vorschau (3 Mockups)
Status: `[x]`
**Akzeptanzkriterien:** Live-Sitzung, Bericht generieren, Praxis-Dashboard.
**Dateien:** `src/components/landing/ProductPreviewSection.tsx`.

### P1-005 — Why-Now-Section
Status: `[x]`
**Dateien:** `src/components/landing/WhyNowSection.tsx`.

### P1-006 — Privacy-Section
Status: `[x]`
**Akzeptanzkriterien:** keine falschen Zertifizierungs-Claims, klare
„geplant"/„vorgesehen"-Sprache.
**Dateien:** `src/components/landing/PrivacySection.tsx`.

### P1-007 — Pricing-Preview-Section
Status: `[x]`
**Akzeptanzkriterien:** 3 Pakete (Solo / Praxis / Klinik), Disclaimer „geplant".
**Dateien:** `src/components/landing/PricingSection.tsx`.

### P1-008 — Waitlist-Section + Formular
Status: `[x]`
**Akzeptanzkriterien:**
- Felder: Name, Praxisname, E-Mail, Fachrichtung, Teamgröße, Nachricht.
- Validierung clientseitig.
- Loading- / Success- / Error-States.
- Mock-Pfad bei fehlender Supabase-Konfiguration.
**Dateien:** `src/components/landing/WaitlistSection.tsx`, `src/lib/supabase.ts`.

### P1-009 — Header + Footer + PageShell
Status: `[x]`
**Dateien:** `src/components/layout/{Header,Footer,PageShell}.tsx`.

### P1-010 — Placeholder-Pages (Privacy / Imprint / App / 404)
Status: `[x]`
**Akzeptanzkriterien:** Klar als Platzhalter gekennzeichnet, mit Hinweis auf
juristische Prüfung vor Produktivbetrieb.
**Dateien:** `src/pages/{Privacy,Imprint,AppPlaceholder,NotFound}Page.tsx`.

### P1-011 — SEO-Meta & Open-Graph
Status: `[~]`
Priorität: Mittel

**Ziel:** OG-Image und sitemap.xml ergänzen.
**Akzeptanzkriterien:**
- `public/og-image.png` (1200×630) existiert.
- `<link rel="canonical">` pro Route.
- `public/sitemap.xml` mit allen statischen Routes.
**Hinweise:** OG-Image kann automatisiert via Satori / Vercel OG generiert
werden, oder als statisches Bild.

### P1-012 — Responsive Verhalten Tablet/Mobile
Status: `[ ]`
Priorität: Mittel

**Ziel:** Landingpage-Sektionen auf 768/1024px und Mobile (390px) prüfen.
**Akzeptanzkriterien:**
- Hero-Mockup skaliert sauber.
- Pricing-Cards stapeln korrekt.
- Waitlist-Formular ist auf Mobile bedienbar.
- Header-Nav klappt auf Mobile zu einem schlanken Menü.

### P1-013 — Smooth-Scroll + Anchor-Links robust
Status: `[ ]`
Priorität: Niedrig

**Akzeptanzkriterien:** Anchor-Links (`#produkt`, `#pilot`, `#datenschutz`)
funktionieren auch bei direkter URL-Eingabe.

---

## Phase 2 — Supabase Waitlist

### P2-001 — Migration `pilot_waitlist`
Status: `[x]`
**Dateien:** `supabase/migrations/0001_initial_schema.sql`.

### P2-002 — RLS-Policy für anon-Insert
Status: `[x]`
**Akzeptanzkriterien:** `INSERT` für `anon` erlaubt, kein `SELECT`.

### P2-003 — Insert-Test gegen echte Supabase-Instanz
Status: `[ ]`
Priorität: Hoch

**Ziel:** End-to-End absichern.
**Akzeptanzkriterien:**
- Auf einer Supabase-Test-Instanz Insert manuell verifiziert.
- Eintrag in Tabelle sichtbar.

### P2-004 — Fehlerhandling im Frontend härten
Status: `[ ]`
Priorität: Mittel

**Akzeptanzkriterien:**
- Netzwerkfehler werden abgefangen.
- Spezifische Supabase-Fehler (z. B. `PGRST*`) sauber gemappt.
- User sieht eine deutsche Fehlermeldung.

### P2-005 — Admin-Auswertung vorbereiten (Off-App)
Status: `[ ]`
Priorität: Niedrig

**Ziel:** Einfacher Supabase-View / SQL-Snippet zum Auslesen pro Woche.
**Hinweise:** Kein Frontend nötig — Supabase Studio reicht.

---

## Phase 3 — App-Shell

### P3-001 — `/app`-Layout mit Sidebar + Topbar
Status: `[ ]`
Priorität: Hoch

**Ziel:** Echte App-Hülle, keine Marketing-Seite.
**Akzeptanzkriterien:**
- Sidebar mit Patient:innen / Sitzungen / Berichte / Einstellungen.
- Topbar mit Praxisname, User-Menu (Platzhalter).
- Responsive: Sidebar collabsbar.

### P3-002 — Dashboard-Placeholder mit echten Empty-States
Status: `[ ]`
Priorität: Hoch

**Akzeptanzkriterien:**
- Empty-States haben gutes Wording („Noch keine Sitzungen geplant").
- Keine grauen Tabellen.

### P3-003 — Auth-Gate vorbereiten (`<Protected>`)
Status: `[ ]`
Priorität: Hoch

**Akzeptanzkriterien:**
- `Protected`-Komponente, die ohne Session zur `/login` umleitet.
- Stub-`useSession`-Hook.

### P3-004 — TanStack Query installieren + konfigurieren
Status: `[ ]`
Priorität: Mittel

**Akzeptanzkriterien:**
- `QueryClientProvider` in `App.tsx`.
- Sinnvolle Defaults (`staleTime`, `retry`).

### P3-005 — Globaler Error-Boundary
Status: `[ ]`
Priorität: Mittel

**Akzeptanzkriterien:**
- Crashes zeigen freundliche Fallback-UI.
- Optional: Reload-Button.

---

## Phase 4 — Auth & Praxis-Struktur

### P4-001 — Supabase-Auth (E-Mail OTP)
Status: `[ ]`
Priorität: Hoch
**Dateien:** `src/lib/auth.ts`, `src/pages/LoginPage.tsx`.

### P4-002 — Migration `profiles`
Status: `[ ]`
**Akzeptanzkriterien:** 1:1 zu `auth.users`, automatisches Anlegen via Trigger.

### P4-003 — Migration `practices` + `memberships`
Status: `[ ]`
**Akzeptanzkriterien:** Rollen `owner`, `therapist`, `assistant`, `admin`.

### P4-004 — RLS-Policies für `practices` / `memberships`
Status: `[ ]`
**Akzeptanzkriterien:** Nutzer:innen sehen nur Praxen, in denen sie Mitglied sind.

### P4-005 — Einladungs-Flow (Praxis-Owner lädt Therapeut:in ein)
Status: `[ ]`
Priorität: Mittel

### P4-006 — Teamverwaltung im Frontend
Status: `[ ]`
Priorität: Mittel

---

## Phase 5 — Patient:innen & Sitzungen

### P5-001 — Migration `patients` (pseudonymisiert)
Status: `[ ]`
**Akzeptanzkriterien:** Initialen + Geburtsjahr für Anzeige; Klarnamen
optional, RLS streng.

### P5-002 — Migration `prescriptions` + `diagnoses`
Status: `[ ]`
**Akzeptanzkriterien:** ICD-10 + ICF strukturiert (Code + Bezeichnung).

### P5-003 — Migration `sessions` + `session_notes`
Status: `[ ]`

### P5-004 — UI: Patient:innen-Liste + Detail
Status: `[ ]`
Priorität: Hoch

### P5-005 — UI: Sitzung anlegen + Verlauf
Status: `[ ]`
Priorität: Hoch

---

## Phase 6 — Audio MVP

> ⚠ **Kein Produktiv-Rollout vor finaler Datenschutzprüfung.**

### P6-001 — Audio-Recording-Spike (Browser)
Status: `[ ]`
Priorität: Hoch
**Akzeptanzkriterien:** `MediaRecorder` nimmt auf, Pause/Resume, Lautstärke-
Visualisierung. Permission-State sauber gehandhabt.

### P6-002 — Consent-Flow vor Aufnahme
Status: `[ ]`
**Akzeptanzkriterien:** Modal mit Erklärung + bestätigender Klick. Audit-Eintrag.

### P6-003 — Upload zu Supabase Storage
Status: `[ ]`
**Akzeptanzkriterien:** Privater Bucket, Signed-URL-Upload, Retry-Logik.

### P6-004 — Audio-Retention-Policy
Status: `[ ]`
**Akzeptanzkriterien:** Pro Praxis konfigurierbare Aufbewahrungsfrist (Default 14 Tage).

### P6-005 — Transcription-Provider-Abstraktion
Status: `[ ]`
**Akzeptanzkriterien:** Interface `TranscriptionProvider`, Mock-Implementation,
echte Provider via Edge Function.

---

## Phase 7 — Berichtsgenerator MVP

### P7-001 — Migration `reports` + Versionierung
Status: `[ ]`
**Akzeptanzkriterien:** Status (`draft`, `in_review`, `signed`), Versionierung
auf jedem Update.

### P7-002 — Vorlagen-Engine (Therapie- / Verlängerungs- / Befund- / MDK-Bericht)
Status: `[ ]`

### P7-003 — Strukturierter Editor mit Provenance-Markern
Status: `[ ]`
**Akzeptanzkriterien:** Jede generierte Aussage zeigt Quelle (Transkript-Span,
Verordnung, Vorbericht).

### P7-004 — Therapeut:in-Review-Workflow (signieren / freigeben)
Status: `[ ]`

### P7-005 — Export PDF / Word
Status: `[ ]`

---

## Phase 8 — Compliance & Datenschutz

### P8-001 — AVV/DPA-Template-Prozess
Status: `[ ]`
Priorität: Hoch (Voraussetzung für echte Patientendaten)

### P8-002 — Löschkonzept (Praxis & Patient:in)
Status: `[ ]`

### P8-003 — Audit-Log auf allen mutierenden Operationen
Status: `[ ]`

### P8-004 — Rollenrechte hart durchgesetzt (RLS + UI)
Status: `[ ]`

### P8-005 — Datenminimierung & PII-Maskierung in Logs
Status: `[ ]`

### P8-006 — Region/Hosting-Konzept finalisiert
Status: `[ ]`
**Akzeptanzkriterien:** Vercel-Region, Supabase-Region, AVV-Verträge
dokumentiert.

### P8-007 — Rechtliche Review-TODOs (Privacy/Impressum)
Status: `[ ]`

---

## Phase 9 — Pilotbetrieb

### P9-001 — Pilot-Onboarding-Flow
Status: `[ ]`

### P9-002 — Feedback-Modul
Status: `[ ]`
**Akzeptanzkriterien:** In-App-Feedback-Knopf, anonymisiert, ohne Inhalte aus
Patient:innen-Doku.

### P9-003 — Privacy-First-Analytics
Status: `[ ]`
**Akzeptanzkriterien:** Plausible/Pirsch o. ä., nur aggregierte Events.

### P9-004 — Fehlerreporting (Sentry-style)
Status: `[ ]`
**Akzeptanzkriterien:** PII-Scrubbing, kein Bericht-Inhalt im Stacktrace.

### P9-005 — Manueller Pilot-Freischaltungs-Workflow
Status: `[ ]`

---

## Phase 10 — Produktreife

### P10-001 — PVS-Integrations-Research (Theorg / Buchner / Starke Praxis)
Status: `[ ]`

### P10-002 — Exportformate für PVS / Praxen
Status: `[ ]`

### P10-003 — Abrechnungskontext (Heilmittelpositionsnummern)
Status: `[ ]`

### P10-004 — Multi-Tenant-Härtung (Penetration-Test)
Status: `[ ]`

### P10-005 — Monitoring (Uptime, Error-Rate, Tail-Latency)
Status: `[ ]`

### P10-006 — Backup- & Recovery-Plan inkl. Drill
Status: `[ ]`

### P10-007 — Security-Review extern
Status: `[ ]`

---

## Cross-Cutting

### CC-001 — Storybook / UI-Showcase
Status: `[ ]`
Priorität: Niedrig

### CC-002 — Playwright-E2E-Tests für Landingpage + Waitlist
Status: `[ ]`
Priorität: Mittel

### CC-003 — CI auf GitHub Actions (typecheck + build)
Status: `[ ]`
Priorität: Hoch

### CC-004 — Pre-Commit-Hooks (Prettier + ESLint)
Status: `[ ]`
Priorität: Mittel
