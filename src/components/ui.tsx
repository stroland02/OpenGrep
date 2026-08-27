"use client";

import * as React from "react";
import { cn, longDate, relativeTime } from "@/lib/utils";
import { Check, ChevronsUpDown, X, Search, Minus } from "lucide-react";

/* ---------------------------------------------------------------------------
   Button
   Variants observed: primary (near-black), brand (mint green, dark label),
   secondary (white + border), ghost, destructive (solid red) and
   destructive-soft (pale pink at rest, as used in Danger Zone).
   --------------------------------------------------------------------------- */

type ButtonVariant =
  | "primary"
  | "brand"
  | "secondary"
  | "ghost"
  | "destructive"
  | "destructive-soft";

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[8px] font-medium transition-colors",
        "disabled:cursor-not-allowed",
        size === "sm" && "h-8 px-3 text-[13px]",
        size === "md" && "h-10 px-4 text-[14px]",
        size === "lg" && "h-12 px-5 text-[15px]",
        variant === "primary" &&
          "bg-ink text-white hover:bg-ink/90 disabled:bg-[#b5b5b5] disabled:text-white",
        variant === "brand" &&
          "bg-brand text-ink hover:brightness-95 disabled:bg-brand/25 disabled:text-ink/40",
        variant === "secondary" &&
          "border border-line bg-surface text-ink hover:bg-surface-muted disabled:text-ink-faint",
        variant === "ghost" && "text-ink-muted hover:bg-surface-muted hover:text-ink",
        variant === "destructive" &&
          "bg-danger text-white hover:brightness-95 disabled:bg-[#f8c9cb] disabled:text-white/70",
        variant === "destructive-soft" &&
          "bg-danger-soft text-danger hover:brightness-95 disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

/* ---------------------------------------------------------------------------
   Inputs
   --------------------------------------------------------------------------- */

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-[8px] border border-line bg-surface px-3 text-[15px] text-ink",
        "placeholder:text-ink-faint outline-none",
        "focus:border-ink/30 disabled:bg-surface-muted disabled:text-ink-muted",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-[8px] border border-line bg-surface px-3 py-2.5 text-[15px] text-ink",
        "placeholder:text-ink-faint outline-none focus:border-ink/30",
        "disabled:bg-surface-muted disabled:text-ink-muted",
        className,
      )}
      {...props}
    />
  );
}

/** Page-level search inputs render their placeholder in italic; modal ones don't. */
export function SearchInput({
  italicPlaceholder = true,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { italicPlaceholder?: boolean }) {
  return (
    <div className={cn("relative w-full", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
      <input
        className={cn(
          "h-11 w-full rounded-[8px] border border-line bg-surface pl-9 pr-3 text-[15px] text-ink outline-none",
          "placeholder:text-ink-faint focus:border-ink/30",
          italicPlaceholder && "placeholder:italic",
        )}
        {...props}
      />
    </div>
  );
}

/** Field label: uppercase monospace, wide tracking. The system's signature. */
export function FieldLabel({
  children,
  required,
  className,
}: {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={cn("mono-label mb-2 block", className)}>
      {children}
      {required && <span className="ml-0.5 text-[#f0524d]">*</span>}
    </label>
  );
}

/* ---------------------------------------------------------------------------
   Select — native element under a stacked-chevron affordance
   --------------------------------------------------------------------------- */

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative inline-block w-full">
      <select
        className={cn(
          "h-11 w-full rounded-[8px] border border-line bg-surface pl-3 pr-9 text-[15px] text-ink outline-none",
          "focus:border-ink/30 disabled:bg-surface-muted disabled:text-ink-muted",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Toggle — dark track when on
   --------------------------------------------------------------------------- */

export function Toggle({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        checked ? "bg-ink" : "bg-[#e2e2e2]",
        disabled && "opacity-40",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-5 rounded-full bg-white transition-transform",
          checked ? "translate-x-[22px]" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

/* ---------------------------------------------------------------------------
   Checkbox — solid dark fill with a white check; tri-state for select-all
   --------------------------------------------------------------------------- */

export function Checkbox({
  checked,
  indeterminate,
  onChange,
  disabled,
  label,
  className,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}) {
  const box = (
    <span
      className={cn(
        "flex size-[18px] shrink-0 items-center justify-center rounded-[4px] border transition-colors",
        checked || indeterminate
          ? "border-ink bg-ink text-white"
          : "border-[#c9c9c5] bg-surface",
        disabled && "opacity-40",
      )}
    >
      {indeterminate ? (
        <Minus className="size-3" strokeWidth={3} />
      ) : checked ? (
        <Check className="size-3" strokeWidth={3} />
      ) : null}
    </span>
  );

  if (!label) {
    return (
      <button
        type="button"
        role="checkbox"
        aria-checked={indeterminate ? "mixed" : checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn("inline-flex", className)}
      >
        {box}
      </button>
    );
  }

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn("inline-flex items-center gap-2", className)}
    >
      {box}
      <span className={cn("text-[14px]", disabled ? "text-ink-faint" : "text-ink")}>
        {label}
      </span>
    </button>
  );
}

/* ---------------------------------------------------------------------------
   Surfaces
   --------------------------------------------------------------------------- */

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("rounded-[8px] border border-line bg-surface", className)}>
      {children}
    </div>
  );
}

/** Neutral grey pill: Pending, You, Admin, Trial, Optional. */
export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "danger" | "warning";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[5px] px-2 py-0.5 text-[12px] font-medium",
        tone === "neutral" && "bg-[#efefef] text-[#4a4a4a]",
        tone === "success" && "bg-[#e6f8ef] text-success",
        tone === "danger" && "bg-danger-soft text-danger",
        tone === "warning" && "bg-warning-soft text-warning",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------------------
   Table — grey uppercase header row, 1px separators
   --------------------------------------------------------------------------- */

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-[8px] border border-line bg-surface">
      <table className="w-full border-collapse text-left">{children}</table>
    </div>
  );
}

export function Th({
  children,
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "mono-label border-b border-line bg-surface-muted px-5 py-3 font-normal",
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
}

export function Td({
  children,
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn("border-b border-line px-5 py-4 text-[15px]", className)} {...props}>
      {children}
    </td>
  );
}

/**
 * Empty-state copy is per-table in this product, not global — "No results.",
 * "No payment methods" and "No invoice data available" all coexist. The caller
 * passes the exact string.
 */
export function TableEmpty({ colSpan, children }: { colSpan: number; children: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-5 py-14 text-center text-[15px] text-ink-muted">
        {children}
      </td>
    </tr>
  );
}

/* ---------------------------------------------------------------------------
   Modal — white wash backdrop, never a dark scrim
   --------------------------------------------------------------------------- */

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  width = 650,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  width?: number;
  footer?: React.ReactNode;
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="scrim absolute inset-0" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        style={{ width }}
        className="thin-scroll relative max-h-[86vh] overflow-y-auto rounded-[10px] border border-line bg-surface shadow-[0_8px_32px_rgba(0,0,0,0.10)]"
      >
        {(title || subtitle) && (
          <div className="flex items-start justify-between border-b border-line px-7 py-5">
            <div>
              {title && <h2 className="text-[21px] font-semibold text-ink">{title}</h2>}
              {subtitle && <p className="mt-1 text-[14px] text-ink-muted">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="-mr-1 rounded p-1 text-ink-muted hover:bg-surface-muted hover:text-ink"
            >
              <X className="size-5" />
            </button>
          </div>
        )}
        <div className="px-7 py-6">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-line px-7 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Toast — bottom-right, no dismiss control, auto-expiring
   --------------------------------------------------------------------------- */

export type ToastTone = "neutral" | "success" | "error";

export function Toast({
  title,
  body,
  tone = "neutral",
}: {
  title: string;
  body?: string;
  tone?: ToastTone;
}) {
  return (
    <div className="animate-toast pointer-events-auto w-[440px] max-w-[calc(100vw-3rem)] rounded-[8px] border border-line bg-surface px-5 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
      <p
        className={cn(
          "text-[15px] font-semibold",
          tone === "success" && "text-success",
          tone === "error" && "text-danger",
          tone === "neutral" && "text-ink",
        )}
      >
        {title}
      </p>
      {body && (
        <p
          className={cn(
            "mt-0.5 text-[14px]",
            tone === "success" ? "text-success" : "text-ink-muted",
          )}
        >
          {body}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Toast plumbing
   --------------------------------------------------------------------------- */

type ToastRecord = { id: number; title: string; body?: string; tone: ToastTone };

/** Callers usually want the neutral toast, so `tone` is optional at the call site. */
export type ToastInput = { title: string; body?: string; tone?: ToastTone };

const ToastContext = React.createContext<{ push: (t: ToastInput) => void }>({
  push: () => {},
});

export function useToast() {
  return React.useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastRecord[]>([]);
  const next = React.useRef(0);

  const push = React.useCallback((t: ToastInput) => {
    const id = next.current++;
    setToasts((prev) => [...prev, { tone: "neutral", ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4200);
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
        {toasts.map((t) => (
          <Toast key={t.id} title={t.title} body={t.body} tone={t.tone} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/* ---------------------------------------------------------------------------
   Misc
   --------------------------------------------------------------------------- */

/** Status chip: green check for COMPLETED, grey spinner for PENDING. */
export function StatusChip({ status }: { status: string }) {
  const done = status === "COMPLETED";
  const failed = status === "FAILED";
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={cn(
          "flex size-6 items-center justify-center rounded-[6px]",
          done && "bg-[#e6f8ef] text-[#22a06b]",
          failed && "bg-danger-soft text-danger",
          !done && !failed && "bg-[#efefef] text-ink-faint",
        )}
      >
        {done ? (
          <Check className="size-3.5" strokeWidth={3} />
        ) : failed ? (
          <X className="size-3.5" strokeWidth={3} />
        ) : (
          <span className="size-3 animate-spin rounded-full border-[1.5px] border-current border-t-transparent" />
        )}
      </span>
      <span className="mono-status text-ink-muted">{status}</span>
    </span>
  );
}

export function SeverityBadge({ severity }: { severity: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[4px] px-1.5 py-0.5 font-mono text-[11px] font-semibold",
        severity === "P0" && "bg-p0 text-white",
        severity === "P1" && "bg-p1 text-white",
        severity === "P2" && "bg-p2 text-ink",
      )}
    >
      {severity}
    </span>
  );
}

/** The KPI loading treatment: three pulsing dots in place of the numeral. */
export function LoadingDots() {
  return (
    <span className="inline-flex gap-1 text-[32px] leading-none text-ink-faint">
      <span className="dot-1">•</span>
      <span className="dot-2">•</span>
      <span className="dot-3">•</span>
    </span>
  );
}

/**
 * Relative timestamps ("about 3 hours ago") are computed from the current
 * clock, so the server and the client can legitimately disagree when hydration
 * lands on the other side of a minute boundary. suppressHydrationWarning
 * covers this element's own text, which is exactly the intended difference;
 * the absolute date is exposed as a tooltip and in `dateTime` for machines.
 */
export function TimeAgo({ date, className }: { date: string; className?: string }) {
  return (
    <time
      dateTime={date}
      title={longDate(date)}
      className={className}
      suppressHydrationWarning
    >
      {relativeTime(date)}
    </time>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h1 className="text-[30px] font-semibold tracking-tight text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-[15px] text-ink-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
