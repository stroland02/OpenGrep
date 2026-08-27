"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ScanFace } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button, FieldLabel, Input, useToast } from "@/components/ui";
import { OAuthButtons } from "@/components/oauth-buttons";

export function LoginForm() {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  // The reference screens reveal the password field only once an email has
  // been entered (frames 128 -> 129), so we do the same.
  const showPassword = email.trim().length > 0;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);

    const res = await fetch("/api/auth/login", {
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

  function forgotPassword() {
    toast.push({
      title: "Password reset email sent",
      body: "Please check your email for further instructions",
    });
  }

  return (
    <form onSubmit={submit}>
      <Logo size={56} className="mb-7 rounded-[10px]" />

      <h1 className="text-[38px] font-bold leading-tight tracking-tight text-ink">
        Log into your account
      </h1>
      <p className="mt-2 text-[15px] text-ink-muted">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-[#3b5bdb] underline">
          Sign up
        </Link>
      </p>

      <div className="mt-9">
        <FieldLabel>Enter work email</FieldLabel>
        <div className="relative">
          <Input
            type="email"
            autoComplete="email"
            placeholder="me@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pr-10"
          />
          <ScanFace className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
        </div>
      </div>

      {showPassword && (
        <div className="mt-5">
          <FieldLabel>Enter password</FieldLabel>
          <Input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      )}

      {error && <p className="mt-4 text-[14px] text-danger">{error}</p>}

      <Button
        type="submit"
        variant="brand"
        size="lg"
        disabled={busy}
        className="mt-6 w-full"
      >
        {busy ? "Signing in…" : "Login"}
        <ArrowRight className="size-4" />
      </Button>

      {showPassword && (
        <button
          type="button"
          onClick={forgotPassword}
          className="mt-4 w-full text-center text-[14px] text-ink-muted hover:text-ink"
        >
          Forgot password?
        </button>
      )}

      <OAuthButtons verb="Sign in" className="mt-7" />
    </form>
  );
}
