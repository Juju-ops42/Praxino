import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function isEmail(value: string): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  if (trimmed.length < 5 || trimmed.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

export function formatDateDe(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

/**
 * Liest eine sinnvolle Fehlermeldung aus beliebigen Throw-Werten —
 * insbesondere aus Supabase / PostgREST-Errors, die KEINE Error-Instanzen
 * sind, sondern Objekte mit { message, code, details, hint }.
 */
export function extractErrorMessage(err: unknown, fallback?: string): string {
  if (err instanceof Error) return err.message;
  if (err && typeof err === "object") {
    const obj = err as Record<string, unknown>;
    const parts: string[] = [];
    if (typeof obj.message === "string") parts.push(obj.message);
    if (typeof obj.details === "string" && obj.details) parts.push(obj.details);
    if (typeof obj.hint === "string" && obj.hint) parts.push(`Hinweis: ${obj.hint}`);
    if (parts.length > 0) return parts.join(" · ");
    if (typeof obj.error_description === "string") return obj.error_description;
  }
  if (typeof err === "string") return err;
  return fallback ?? "Ein unbekannter Fehler ist aufgetreten.";
}
