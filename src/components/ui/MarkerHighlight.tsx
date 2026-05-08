import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Fett markierter Text mit handgemaltem Marker-Hintergrund — animiert beim Mount.
 * Bewusst dezent, kein Glitter.
 */
export function MarkerHighlight({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative isolate inline-block whitespace-nowrap">
      <motion.span
        aria-hidden
        initial={reduce ? false : { scaleX: 0 }}
        animate={reduce ? undefined : { scaleX: 1 }}
        transition={{
          duration: 0.85,
          delay: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ originX: 0 }}
        className="absolute inset-x-[-0.1em] bottom-[0.08em] -z-10 h-[0.42em] rounded-[2px] bg-accent-200/80"
      />
      {children}
    </span>
  );
}
