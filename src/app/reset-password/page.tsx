import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button, Input } from "@/components/ui";

export const metadata = { title: "Reset your password — OpenGrep" };

/**
 * This route uses a bare centred-card layout rather than the split auth panel,
 * matching frames 132-133.
 */
export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-16">
      <div className="w-full max-w-[445px] rounded-[8px] border border-line px-10 py-11">
        <div className="flex justify-center">
          <Logo size={52} className="rounded-[10px]" />
        </div>

        <h1 className="mt-7 text-center text-[28px] font-bold tracking-tight text-ink">
          Reset your password
        </h1>
        <p className="mt-2 text-center text-[15px] text-ink-muted">
          Enter a new password for your account.
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-[14px] font-medium text-ink">
              New Password
            </label>
            <Input type="password" autoComplete="new-password" />
          </div>
          <div>
            <label className="mb-2 block text-[14px] font-medium text-ink">
              Confirm New Password
            </label>
            <Input type="password" autoComplete="new-password" />
          </div>
        </div>

        <Button variant="brand" size="lg" className="mt-7 w-full" disabled>
          Set New Password
        </Button>

        <p className="mt-6 text-center text-[13px] text-ink-muted">
          Password reset needs an email provider, which OpenGrep does not ship with.{" "}
          <Link href="/login" className="underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
