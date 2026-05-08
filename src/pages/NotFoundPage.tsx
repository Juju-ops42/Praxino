import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";

export function NotFoundPage() {
  useEffect(() => {
    document.title = "Seite nicht gefunden · Praxino";
  }, []);

  return (
    <PageShell>
      <Section tone="surface" containerClassName="max-w-2xl py-24 text-center lg:py-32">
        <p className="font-display text-7xl font-semibold tracking-tight text-ink-900">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink-800">
          Diese Seite gibt es noch nicht.
        </h1>
        <p className="mt-3 text-ink-500">
          Wahrscheinlich ein verirrter Link. Du findest alles Wichtige auf der Startseite.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-ink-900 px-5 text-sm font-medium text-surface-50 transition-colors hover:bg-ink-800"
        >
          <ArrowLeft className="size-4" aria-hidden /> Zur Startseite
        </Link>
      </Section>
    </PageShell>
  );
}
