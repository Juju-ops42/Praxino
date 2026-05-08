import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const fieldLabel = "block text-sm font-medium text-ink-700";
const fieldHint = "mt-1.5 text-xs text-ink-400";
const fieldError = "mt-1.5 text-xs text-danger";
const baseControl =
  "block w-full rounded-lg border border-ink-200 bg-surface-0 px-3.5 py-2.5 text-[0.95rem] text-ink-900 " +
  "shadow-[inset_0_1px_0_rgb(255_255_255/0.4)] placeholder:text-ink-400 " +
  "focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-200 " +
  "disabled:cursor-not-allowed disabled:bg-surface-100 disabled:text-ink-400";

interface FieldShellProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export function FieldShell({ id, label, hint, error, required, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className={fieldLabel}>
        {label}
        {required ? <span className="ml-0.5 text-accent-600">*</span> : null}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p className={fieldError} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className={fieldHint}>{hint}</p>
      ) : null}
    </div>
  );
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(baseControl, invalid && "border-danger focus:border-danger focus:ring-danger/20", className)}
      {...rest}
    />
  );
});

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, invalid, rows = 4, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(baseControl, "resize-y leading-relaxed", invalid && "border-danger focus:border-danger focus:ring-danger/20", className)}
      {...rest}
    />
  );
});

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, invalid, children, ...rest },
  ref,
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          baseControl,
          "appearance-none pr-10",
          invalid && "border-danger focus:border-danger focus:ring-danger/20",
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      <svg
        aria-hidden
        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-400"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
});
