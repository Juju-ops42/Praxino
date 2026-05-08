# Praxino

> Die Praxis-KI, die mitschreibt — während du behandelst.

Praxino ist eine vertikale KI-Webapp für Heilmittel-Praxen in Deutschland
(Logopädie, Ergotherapie, Physiotherapie). Im ersten Schritt liefert dieses
Repository eine professionelle Landingpage mit Pilotpraxis-Wartelisten-CTA und
eine saubere technische Basis für die folgenden App-Phasen.

**Status:** Meilenstein 1 — Landingpage + Projektbasis.

## Tech Stack

| Layer        | Wahl |
|--------------|------|
| Frontend     | React 19, Vite 6, TypeScript 5.7 |
| Styling      | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Routing      | `react-router-dom` v7 |
| Icons        | `lucide-react` |
| Backend      | Supabase (Postgres + Auth + Storage) |
| Hosting      | Vercel (SPA Rewrites) |
| Paket-Manager| pnpm (npm fallback) |

## Lokale Entwicklung

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm build        # erzeugt dist/
pnpm preview      # serviert den Build lokal
pnpm typecheck    # tsc -b --noEmit
```

> **Ohne pnpm?** `npm install && npm run dev` funktioniert ebenfalls.

## Environment Variablen

Kopiere `.env.example` zu `.env.local` und fülle die Werte:

```ini
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# Niemals im Frontend nutzen, nur in Server- oder Edge-Function-Code:
SUPABASE_SERVICE_ROLE_KEY=
```

Wenn die ENV-Variablen **nicht** gesetzt sind, läuft die App weiter — das
Wartelisten-Formular zeigt dann einen klar gekennzeichneten Mock-Erfolg, ohne
zu crashen. Das ist Absicht (Demo-Deployments, lokale Previews).

## Supabase Setup

1. Neues Projekt im [Supabase Dashboard](https://app.supabase.com) anlegen
   (Region: `eu-central-1` oder `eu-west-1`).
2. Aus *Project Settings → API* die `URL` und den `anon`-Key kopieren und in
   `.env.local` (lokal) bzw. in Vercel-Project-Settings (prod) einsetzen.
3. CLI installieren: <https://supabase.com/docs/guides/cli>.
4. Projekt linken und Schema pushen:

```bash
supabase login
supabase link --project-ref <YOUR_PROJECT_REF>
supabase db push
```

Das initiale Schema liegt in `supabase/migrations/0001_initial_schema.sql`.
Es legt die Tabelle `public.pilot_waitlist` an, aktiviert RLS und erlaubt
anonyme Inserts (kein Read für anon).

## Deployment auf Vercel

1. Repository mit Vercel verbinden.
2. **Build Command:** `pnpm build`
3. **Output Directory:** `dist`
4. **Install Command:** `pnpm install --frozen-lockfile` (ist in `vercel.json`).
5. Environment-Variablen in Vercel setzen:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Deployen. Die SPA-Rewrites aus `vercel.json` sorgen dafür, dass alle
   Client-Routes auf `index.html` zeigen.

## Routing

| Route       | Inhalt |
|-------------|--------|
| `/`         | Landingpage |
| `/login`    | Login mit Supabase Magic Link / 6-stelligem OTP-Code |
| `/privacy`  | Datenschutz (Platzhalter — vor Produktivbetrieb juristisch prüfen) |
| `/imprint`  | Impressum (Platzhalter — vor Produktivbetrieb juristisch prüfen) |
| `/app`      | Workspace (Sidebar + Topbar, Heute / Patient:innen / Sitzungen / Berichte / Einstellungen) — `<Protected>`-Gate, redirect zu `/login` ohne Session |

## Auth-Flow

Praxino nutzt Supabase Magic Link Auth (`signInWithOtp`):

1. Nutzer:in gibt E-Mail in `/login` ein.
2. Supabase sendet eine E-Mail mit Magic Link **und** 6-stelligem Code.
3. Klick auf den Link → Redirect zu `/app`, Session wird automatisch erkannt
   (`detectSessionInUrl: true`, `flowType: pkce`).
4. Alternativ: Code in der UI eingeben → `verifyOtp`.
5. Logout über UserMenu im Header oder im App-Sidebar-Footer.

Wichtig: Im Supabase Dashboard unter *Authentication → URL Configuration* die
Site-URL und Redirect-URLs setzen (z. B. `https://praxino.de`,
`https://*.vercel.app/app`, `http://localhost:5173/app`).

## Projektstruktur

```
src/
  app/           App-Root + Routes
  components/
    layout/      Header, Footer, PageShell
    landing/     Sektionen der Landingpage
    ui/          Button, Input, Card, Badge, Section, Logo
  lib/           supabase Client + utils
  pages/         Page-Komponenten (eine pro Route)
  styles/        Tailwind v4 Theme + globals
  types/         Domain-Types (z. B. PilotWaitlistEntry)
supabase/
  migrations/    SQL-Migrationen (Schema, RLS-Policies)
  functions/     Edge Functions (später)
docs/
  product-brief.md
  architecture.md
tasks.md         Roadmap für Dauerentwicklung — vom Coding-Agent abarbeitbar.
```

## Sicherheits- und Compliance-Hinweise

- **Keine Patientendaten** in dieser Phase, weder Seed-, Test- noch UI-Daten.
- **Keine medizinischen Diagnosen** werden behauptet — Praxino erstellt
  Vorschläge, Therapeut:in prüft und gibt frei.
- **Keine Zertifizierungs-Claims** ohne Nachweis. Alles, was geplant ist,
  wird auch als „geplant" kommuniziert.
- **Keine Service-Role-Keys im Frontend.** Nur Anon-Key, niemals Service-Role.
- **Keine öffentliche Select-Policy** auf Wartelistendaten.
- **Audio- und Patient:innen-Module** werden erst nach Datenschutzkonzept
  produktiv ausgerollt (siehe `docs/architecture.md`, `tasks.md` Phase 6 + 8).

## Nächste Schritte

Siehe [`tasks.md`](./tasks.md) — die Roadmap ist als sequentielle Task-Liste
für einen Coding-Agenten ausgelegt.

## Lizenz

Privates Repository, alle Rechte vorbehalten — bis zur expliziten Lizenzwahl.

