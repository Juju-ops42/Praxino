import { motion } from "motion/react";
import { Sparkles, Mic, FileSignature, Plug, Building2, Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Status = "live" | "in-progress" | "planned";

interface Milestone {
  phase: string;
  title: string;
  body: string;
  icon: typeof Mic;
  status: Status;
}

const milestones: Milestone[] = [
  {
    phase: "Heute",
    title: "Pilot-Workspace",
    body: "Landingpage, Login, App-Shell mit Patient:innen-Stammdaten und Berichts-Queue. Pilotpraxen testen Workflow und Vorlagen.",
    icon: Sparkles,
    status: "live",
  },
  {
    phase: "Q3 2026",
    title: "Audio + Live-Doku",
    body: "Browser-Aufnahme mit Consent, EU-Transkription, Live-Strukturierung der Sitzung in Stichpunkten — strikt mit Therapeut:innen-Freigabe.",
    icon: Mic,
    status: "in-progress",
  },
  {
    phase: "Q4 2026",
    title: "KI-Berichts-Generator",
    body: "Therapie-, Verlängerungs-, Befund- und MDK-Berichte aus Sitzung + Verordnung + Verlauf. Editor mit Provenance-Markern auf jeder Aussage.",
    icon: FileSignature,
    status: "planned",
  },
  {
    phase: "Q1 2027",
    title: "PVS-Anbindungen",
    body: "Schrittweise Integration mit Theorg, Buchner und Starke Praxis. Export-Formate, die in deinen bestehenden Workflow passen.",
    icon: Plug,
    status: "planned",
  },
  {
    phase: "Ab Q2 2027",
    title: "MVZ & Träger",
    body: "Mandantenfähigkeit, erweiterte Compliance-Optionen (AVV/DPA, Audit-Log), Onboarding pro Standort.",
    icon: Building2,
    status: "planned",
  },
];

export function RoadmapSection() {
  return (
    <Section tone="surface" id="roadmap">
      <Reveal>
        <SectionHeading
          eyebrow="Roadmap"
          title="Wir bauen offen. Du siehst, was kommt."
          description="Datumangaben sind Richtwerte und werden mit den Pilotpraxen verfeinert. Was geht — und wann es geht — sagen wir ehrlich."
        />
      </Reveal>

      <div className="relative mt-14">
        <div
          aria-hidden
          className="pointer-events-none absolute left-5 top-0 bottom-0 hidden w-px bg-gradient-to-b from-transparent via-ink-200 to-transparent lg:block"
        />
        <RevealStagger className="space-y-4" stagger={0.07}>
          {milestones.map((m, i) => (
            <RevealItem key={m.title}>
              <MilestoneRow milestone={m} index={i} />
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </Section>
  );
}

function MilestoneRow({ milestone, index }: { milestone: Milestone; index: number }) {
  const statusBadge: Record<Status, { label: string; cls: string }> = {
    live: {
      label: "Live im Pilot",
      cls: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    },
    "in-progress": {
      label: "In Arbeit",
      cls: "bg-amber-50 text-amber-700 ring-amber-100",
    },
    planned: {
      label: "Geplant",
      cls: "bg-ink-50 text-ink-500 ring-ink-100",
    },
  };
  const s = statusBadge[milestone.status];

  return (
    <article className="group relative grid grid-cols-1 gap-4 rounded-2xl border border-ink-100 bg-surface-0 p-5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card lg:grid-cols-[140px_1fr_180px] lg:items-center lg:gap-8 lg:pl-12">
      {/* Timeline-Dot — only on lg */}
      <motion.span
        aria-hidden
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{
          duration: 0.4,
          delay: 0.1 + index * 0.05,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={cn(
          "absolute left-0 hidden size-10 -translate-x-1/2 place-items-center rounded-full ring-4 ring-surface-50 lg:grid",
          milestone.status === "live"
            ? "bg-accent-500 text-white"
            : milestone.status === "in-progress"
              ? "bg-amber-500 text-white"
              : "bg-ink-200 text-ink-600",
        )}
      >
        {milestone.status === "live" ? (
          <Check className="size-4" aria-hidden strokeWidth={3} />
        ) : (
          <milestone.icon className="size-4" aria-hidden />
        )}
      </motion.span>

      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400">
        {milestone.phase}
      </p>
      <div>
        <h3 className="text-[1.05rem] font-semibold tracking-tight text-ink-900">
          {milestone.title}
        </h3>
        <p className="mt-1.5 text-[14px] leading-relaxed text-ink-500">{milestone.body}</p>
      </div>
      <span
        className={cn(
          "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 lg:justify-self-end",
          s.cls,
        )}
      >
        <span
          aria-hidden
          className={cn(
            "size-1.5 rounded-full",
            milestone.status === "live"
              ? "bg-emerald-500"
              : milestone.status === "in-progress"
                ? "bg-amber-500"
                : "bg-ink-400",
          )}
        />
        {s.label}
      </span>
    </article>
  );
}
