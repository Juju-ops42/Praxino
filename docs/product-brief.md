# Praxino — Product Brief

## Was ist Praxino?

Praxino ist die Praxis-KI für Heilmittel: ein vertikales SaaS-Werkzeug, das
Behandlungsdokumentation und Therapieberichte für Logopädie-, Ergo- und
Physiotherapie-Praxen drastisch verschnellert. Therapeut:innen behandeln —
Praxino strukturiert Sitzung, Verordnungslogik und Verlauf zu einem
prüfbaren Berichtsentwurf, den die Praxis editiert und freigibt.

## Für wen?

| Segment | Beschreibung |
|---------|--------------|
| Solo-Praxen | Einzelne Therapeut:innen mit eigener Praxis. |
| Kleine Praxen | 2–5 Therapeut:innen, oft mit Inhaber:in als Behandelnde. |
| Mittlere Praxen | 6–15 Therapeut:innen, strukturierter Praxisbetrieb. |
| MVZ / Träger | Mehrere Standorte, höhere Compliance-Anforderungen (Phase 10+). |

Sekundäre Persona: Praxisinhaber:in mit Verwaltungsfokus — sie sehen Status,
offene Berichte, Wochenüberblick.

## Welches Problem?

- 45 Minuten Therapie, 30 Minuten Bericht. Doku frisst Behandlungszeit.
- Verordnungslogik, ICD-10, ICF, Therapieziele und MDK-Stellungnahmen sind
  komplex und wachsen weiter.
- Personalmangel zwingt zu Effizienz — ohne Qualitätsverlust.
- Klassische PVS-Systeme decken Doku nur eingeschränkt ab; KI-Tools sind
  generisch und kennen Heilmittel-Workflows nicht.

## Wie löst Praxino das Problem?

1. **Aufnehmen** — Sitzung im Browser starten. Audio läuft im Hintergrund.
2. **Verstehen** — Praxino strukturiert das Gesagte entlang Heilmittel-,
   Verordnungs- und Berichtslogik (ICD-10, ICF, Heilmittelkatalog).
3. **Berichten** — Aus Sitzung, Verordnung und Verlauf entsteht ein
   Berichtsentwurf. Therapeut:in editiert, prüft und gibt frei.

Ergänzt PVS-Systeme (Theorg, Buchner, Starke Praxis) — ersetzt sie nicht.

## Was ist der erste MVP (Meilenstein 1)?

- Landingpage mit klarer Wertkommunikation.
- Pilotpraxis-Wartelisten-CTA mit Supabase-Anbindung.
- Saubere technische Basis (React 19 + Vite, TS strict, Tailwind v4, Vercel).
- Routenstruktur für `/app`, `/privacy`, `/imprint` als Platzhalter.
- Nachvollziehbare Roadmap in `tasks.md`.

## Was ist bewusst NICHT Teil von MVP-1?

- Echte KI-Pipeline (Speech-to-Text, Strukturierung, Generierung).
- Echte Audio-Aufnahme oder Speicherung von Sitzungen.
- Produktive Patient:innen-Akte oder Verordnungsverwaltung.
- Abrechnung, TI-Integration, KIM-Mailbox, ePA-Anbindung.
- PVS-Schnittstellen (Theorg, Buchner, …).
- Mobile App / Native Wrapper.

Diese Bestandteile sind in `docs/architecture.md` und `tasks.md` (Phase 4+)
beschrieben und vorbereitet, aber nicht ausgeliefert.

## Risiken

| Risiko | Beschreibung | Mitigation |
|--------|--------------|------------|
| Datenschutz | Patientendaten + Audio = hohe Anforderungen. | DPA/AVV-fähige Architektur, EU-Hosting, Audit-Log, menschliche Freigabe. Keine Audio-Verarbeitung vor finaler Datenschutzprüfung. |
| Halluzinationen | KI generiert Inhalte, die nicht in der Sitzung waren. | Strukturierter Generator-Output, Therapeut:in prüft, Quellen-Hinweise pro Aussage. |
| PVS-Lock-in | Praxen sind oft an etablierte PVS gebunden. | Zunächst Ergänzung statt Ersatz. PVS-Anbindungen Phase 10. |
| Akzeptanz | Therapeut:innen misstrauen KI in medizinischen Kontexten. | Klare Sprache, niemals als Diagnostik vermarktet, Pilotpraxen als Co-Designer. |
| Marktreife | Frühe Phase, viele Annahmen. | Pilotpraxen statt Volumen-Vertrieb, kurze Iterationen, transparenter Status. |

## Datenschutzgrundsätze

- Datensparsamkeit: nur erfassen, was wir brauchen.
- Zweckbindung: Verarbeitung ausschließlich zur Doku-Unterstützung.
- Lokale Hoheit: Praxis bleibt Eigentümer der Daten.
- Auditierbarkeit: jede generierte Aussage ist nachvollziehbar.
- Menschliche Freigabe: kein Bericht verlässt die Praxis ohne Therapeut:in.

## Produktprinzipien

1. **Werkzeug, nicht Wahrheitsmaschine.** Praxino liefert Vorschläge.
2. **Heilmittel-spezifisch.** Wir verstehen Verordnungslogik, nicht generische
   Büroaufgaben.
3. **Ruhig statt verspielt.** Medizinisch sauber, hochwertig, nicht hyperbolisch.
4. **Transparenz vor Versprechen.** Was geht, was geht (noch) nicht — klar gesagt.
5. **Pilotpraxen sind Mitautoren.** Praxisalltag schlägt Hypothesen.
