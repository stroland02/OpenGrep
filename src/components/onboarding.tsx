"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui";
import { SupportBubble } from "./app-shell";

/**
 * The onboarding chrome: dotted canvas, a fixed bottom action bar carrying
 * Logout / Back / Next with their keyboard hints, and the persistent support
 * launcher.
 */
export function OnboardingShell({
  children,
  back,
  next,
  nextLabel = "Next",
  nextDisabled,
  onNext,
  busy,
  variant = "card",
}: {
  children: React.ReactNode;
  back?: string;
  next?: string;
  nextLabel?: string;
  nextDisabled?: boolean;
  onNext?: () => void | Promise<void>;
  busy?: boolean;
  variant?: "card" | "split";
}) {
  const router = useRouter();

  async function advance() {
    if (onNext) await onNext();
    else if (next) router.push(next);
  }

  // ⌘+↵ advances, ⌘+⇧+↵ goes back — the shortcuts printed on the buttons.
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!(e.metaKey || e.ctrlKey) || e.key !== "Enter") return;
      e.preventDefault();
      if (e.shiftKey) {
        if (back) router.push(back);
      } else if (!nextDisabled) {
        void advance();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div className={cn("flex min-h-screen flex-col", variant === "card" && "dotted")}>
      <div className="flex flex-1 items-center justify-center px-6 py-14">{children}</div>

      <div className="sticky bottom-0 flex h-[76px] items-center border-t border-line bg-canvas px-6">
        <button
          onClick={logout}
          className="text-[15px] text-ink-muted hover:text-ink"
        >
          Logout
        </button>

        <div className="mx-auto flex gap-3">
          {back && (
            <Button
              variant="secondary"
              size="lg"
              className="w-[280px]"
              onClick={() => router.push(back)}
            >
              Back
              <Shortcut keys="⌘+⇧+↵" />
            </Button>
          )}
          <Button
            variant="brand"
            size="lg"
            className={back ? "w-[280px]" : "w-[585px]"}
            disabled={nextDisabled || busy}
            onClick={advance}
          >
            {busy ? "Working…" : nextLabel}
            <Shortcut keys="⌘+↵" />
            {!busy && <ArrowRight className="size-4" />}
          </Button>
        </div>
      </div>

      <SupportBubble />
    </div>
  );
}

function Shortcut({ keys }: { keys: string }) {
  return <span className="ml-1 text-[85%] opacity-55">{keys}</span>;
}

/** The centred white card with lime corner handles. */
export function OnboardingCard({
  title,
  subtitle,
  children,
  width = 645,
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: number;
}) {
  return (
    <div
      className="handles relative border border-line bg-surface px-10 py-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
      style={{ width: "100%", maxWidth: width }}
    >
      <span className="handle-b" />
      {title && (
        <h1 className="text-[34px] font-bold leading-tight tracking-tight text-ink">
          {title}
        </h1>
      )}
      {subtitle && <p className="mt-2 text-[15px] text-ink-muted">{subtitle}</p>}
      <div className={title ? "mt-8" : ""}>{children}</div>
    </div>
  );
}

/** The four-segment progress strip on the review-configuration wizard. */
export function WizardTabs({
  steps,
  active,
}: {
  steps: string[];
  active: number;
}) {
  return (
    <div className="mb-9 flex gap-3">
      {steps.map((s, i) => (
        <div key={s} className="flex-1">
          <div
            className={cn("h-[3px] rounded-full", i === active ? "bg-ink" : "bg-[#dcdcd8]")}
          />
          <p
            className={cn(
              "mono-label mt-2.5",
              i === active ? "text-ink" : "text-ink-faint",
            )}
          >
            {s}
          </p>
        </div>
      ))}
    </div>
  );
}

/** The split layout used by the connect and review-config screens. */
export function OnboardingSplit({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="grid w-full flex-1 grid-cols-1 lg:grid-cols-[49%_51%]">
      <div className="flex items-start px-10 py-12">
        <div className="w-full max-w-[780px]">{left}</div>
      </div>
      <div className="relative hidden overflow-hidden border-l border-line lg:block">
        {right}
      </div>
    </div>
  );
}
