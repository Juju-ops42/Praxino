import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  /** Format with locale (e.g. "de-DE" for thousand-separator) */
  locale?: string;
}

/**
 * Animiertes Hochzählen einer Zahl, sobald die Komponente in den
 * Viewport scrollt. Respektiert prefers-reduced-motion (zeigt direkt
 * den Endwert).
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.6,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  locale = "de-DE",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : from);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const totalMs = duration * 1000;
    const tick = (t: number) => {
      const elapsed = t - start;
      const progress = Math.min(elapsed / totalMs, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(from + (to - from) * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, from, to, duration]);

  const formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
