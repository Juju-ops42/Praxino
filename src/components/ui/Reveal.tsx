import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "header" | "article" | "li" | "span";
  once?: boolean;
}

/**
 * Sanftes Fade-Up beim ersten Scroll-in. Respektiert prefers-reduced-motion
 * (dann statisch sichtbar, kein Move).
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  once = true,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface RevealStaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  initialDelay?: number;
}

export function RevealStagger({
  children,
  className,
  stagger = 0.08,
  initialDelay = 0,
}: RevealStaggerProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "visible"}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: initialDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealItemProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  className?: string;
  y?: number;
}

export function RevealItem({ children, className, y = 12, ...rest }: RevealItemProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={
        reduce
          ? undefined
          : {
              hidden: { opacity: 0, y },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              },
            }
      }
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
