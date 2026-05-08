import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: (reset: () => void, error: Error) => ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error("[Praxino] UI crash:", error, info);
  }

  reset = (): void => this.setState({ error: null });

  render(): ReactNode {
    const { error } = this.state;
    if (!error) return this.props.children;

    if (this.props.fallback) return this.props.fallback(this.reset, error);

    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-50 px-6 py-16">
        <div className="w-full max-w-md rounded-2xl border border-ink-100 bg-surface-0 p-8 shadow-card">
          <div className="inline-grid size-11 place-items-center rounded-xl bg-rose-50 text-rose-600 ring-1 ring-rose-100">
            <AlertTriangle className="size-5" aria-hidden />
          </div>
          <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink-900">
            Etwas ist schiefgelaufen.
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-500">
            Die Seite konnte nicht angezeigt werden. Lade neu, das löst die meisten
            Probleme.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                this.reset();
                window.location.reload();
              }}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-ink-900 px-5 text-sm font-medium text-surface-50 transition-colors hover:bg-ink-800"
            >
              <RefreshCw className="size-4" aria-hidden /> Seite neu laden
            </button>
            <button
              type="button"
              onClick={this.reset}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-ink-200 bg-surface-0 px-5 text-sm font-medium text-ink-800 transition-colors hover:border-ink-300 hover:bg-surface-100"
            >
              Erneut versuchen
            </button>
          </div>
          {import.meta.env.DEV ? (
            <pre className="mt-6 max-h-40 overflow-auto rounded-lg bg-surface-50 p-3 text-[11px] leading-relaxed text-ink-500 ring-1 ring-ink-100">
              {error.message}
            </pre>
          ) : null}
        </div>
      </div>
    );
  }
}
