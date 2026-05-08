import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function StoryTeaserSection() {
  return (
    <Section tone="creme" containerClassName="py-16 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-100 bg-surface-0 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-ink-500">
            Unsere Geschichte
          </span>
          <h2 className="mt-5 font-display text-[2rem] font-medium leading-[1.1] tracking-[-0.025em] text-ink-900 sm:text-[2.4rem] text-balance">
            Drei Freunde, ein Sonntag-Abend, eine Therapeutin, die zu lange nach
            Berichten geseufzt hat.
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-600">
            Praxino ist nicht in einem Konferenzraum entstanden. Es ist in einer
            Küche entstanden, bei einem Glas Wein, mit der Frage: Warum baut
            niemand etwas, das Heilmittel-Praxen wirklich entlastet?
          </p>
          <Link
            to="/team"
            className="group mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-ink-800 hover:text-ink-900"
          >
            Geschichte lesen
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="relative rounded-3xl border border-ink-100 bg-surface-0 p-7 shadow-card lg:p-9">
            <Quote className="size-6 text-accent-500" aria-hidden />
            <blockquote className="mt-4 font-display text-[1.45rem] font-medium leading-[1.3] tracking-[-0.01em] text-ink-900 text-balance sm:text-[1.7rem]">
              „Ich verbringe mehr Zeit mit Doku als mit Patient:innen. Und niemand
              baut etwas, das das wirklich ändert."
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-ink-100 pt-5">
              <span
                aria-hidden
                className="grid size-10 place-items-center rounded-full bg-accent-50 text-[12px] font-semibold text-accent-700 ring-1 ring-accent-100"
              >
                T
              </span>
              <div>
                <p className="text-sm font-medium text-ink-900">
                  Eine befreundete Therapeutin
                </p>
                <p className="text-[12px] text-ink-500">
                  Sonntag-Abend in der Küche, an dem alles begann
                </p>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
