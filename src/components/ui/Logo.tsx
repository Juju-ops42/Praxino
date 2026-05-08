import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  to?: string;
  showWordmark?: boolean;
}

export function Logo({ className, to = "/", showWordmark = true }: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className="grid size-9 place-items-center rounded-xl bg-ink-900 text-accent-200 shadow-soft"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
          <path
            d="M5 5h6.5c2.8 0 5 2 5 4.7s-2.2 4.7-5 4.7H8.5V20H5V5z"
            fill="currentColor"
          />
          <circle cx="17.5" cy="17.5" r="2" fill="currentColor" />
        </svg>
      </span>
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.05rem] font-semibold tracking-tight text-ink-900">
            Praxino
          </span>
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-ink-400">
            Praxis-KI
          </span>
        </span>
      ) : null}
    </span>
  );

  if (!to) return content;
  return (
    <Link to={to} aria-label="Praxino — zur Startseite" className="inline-flex">
      {content}
    </Link>
  );
}
