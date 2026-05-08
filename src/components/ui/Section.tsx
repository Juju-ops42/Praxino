import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: "surface" | "white" | "ink" | "creme";
  containerClassName?: string;
}

const tones = {
  surface: "bg-surface-50 text-ink-800",
  white: "bg-surface-0 text-ink-800",
  ink: "bg-ink-900 text-surface-50",
  creme: "bg-creme-50 text-ink-800",
} as const;

export function Section({
  tone = "surface",
  className,
  containerClassName,
  children,
  ...rest
}: SectionProps) {
  return (
    <section className={cn(tones[tone], "relative", className)} {...rest}>
      <div className={cn("mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-28", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-ink-100 bg-surface-0 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-ink-500",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-accent-500" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1] text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-lg leading-relaxed text-ink-500 text-pretty">{description}</p>
      ) : null}
    </div>
  );
}
