"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Info } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button, FieldLabel, Input } from "@/components/ui";
import { OAuthButtons } from "@/components/oauth-buttons";

export function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setBusy(false);
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return;
    }
    router.push(data.redirect);
    router.refresh();
  }

  return (
    <form onSubmit={submit}>
      <Logo size={56} className="mb-7 rounded-[10px]" />

      <h1 className="text-[38px] font-bold leading-tight tracking-tight text-ink">
        Create an account
      </h1>
      <p className="mt-2 text-[15px] text-ink-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-[#3b5bdb] underline">
          Login
        </Link>
      </p>

      <div className="mt-9">
        <FieldLabel>Enter work email</FieldLabel>
        <Input
          type="email"
          autoComplete="email"
          placeholder="me@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center gap-1.5">
          <span className="mono-label">Enter password</span>
          <span title="At least 8 characters.">
            <Info className="size-3.5 text-ink-faint" />
          </span>
        </div>
        <Input
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p className="mt-4 text-[14px] text-danger">{error}</p>}

      <Button
        type="submit"
        variant="brand"
        size="lg"
        disabled={busy}
        className="mt-6 w-full"
      >
        {busy ? "Creating…" : "Start for Free"}
        <ArrowRight className="size-4" />
      </Button>

      <OAuthButtons verb="Sign up" className="mt-7" />

      <p className="mt-8 text-center text-[13px] text-ink-muted">
        By signing up, you agree to the{" "}
        <span className="underline">Terms of Service</span> and{" "}
        <span className="underline">Privacy Policy</span>.
      </p>
    </form>
  );
}
