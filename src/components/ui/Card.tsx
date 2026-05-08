import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  bordered?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, elevated = false, bordered = true, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl bg-surface-0",
        bordered && "border border-ink-100",
        elevated ? "shadow-card" : "shadow-soft",
        className,
      )}
      {...rest}
    />
  );
});
