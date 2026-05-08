import { Activity, Brain, Stethoscope } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const items = [
  { icon: Stethoscope, label: "Logopädie" },
  { icon: Brain, label: "Ergotherapie" },
  { icon: Activity, label: "Physiotherapie" },
  { icon: Stethoscope, label: "MVZ / Träger" },
  { icon: Brain, label: "Heilmittel-Reha" },
];

/**
 * Sanfter „Marquee"-Streifen mit den adressierten Fachrichtungen.
 * Keine erfundenen Logos, keine Fake-Kunden — wir sind in Pilotphase.
 */
export function TrustStrip() {
  const reduce = useReducedMotion();
  const loop = [...items, ...items, ...items];

  return (
    <section
      aria-label="Adressierte Fachrichtungen"
      className="relative border-y border-ink-100/80 bg-surface-0/60 py-7"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center gap-6 px-6 lg:px-10">
        <p className="hidden shrink-0 text-xs font-medium uppercase tracking-[0.18em] text-ink-400 sm:block">
          Gebaut für
        </p>
        <div
          className="relative flex-1 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
          }}
        >
          <motion.div
            className="flex w-max items-center gap-10"
            initial={false}
            animate={
              reduce
                ? undefined
                : { x: ["0%", "-33.3333%"] }
            }
            transition={
              reduce
                ? undefined
                : { duration: 32, ease: "linear", repeat: Infinity }
            }
          >
            {loop.map((it, i) => (
              <span
                key={`${it.label}-${i}`}
                className="inline-flex items-center gap-2 text-[0.95rem] font-medium tracking-tight text-ink-600"
              >
                <it.icon className="size-4 text-accent-600" aria-hidden />
                {it.label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
