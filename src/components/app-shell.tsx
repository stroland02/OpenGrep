"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  Gift,
  ChevronsUpDown,
  Building2,
  Plus,
  Settings,
  LogOut,
  SquarePen,
  Check,
  X,
  MessageCircle,
} from "lucide-react";
import { cn, daysLeft } from "@/lib/utils";
import { Logo } from "./logo";
import { Badge, Button, Input, Modal, useToast } from "./ui";

export type ShellOrg = { id: string; name: string; handle: string; trialEndsAt: string };
export type ShellUser = { id: string; name: string; email: string; avatarUrl: string | null };

/* ---------------------------------------------------------------------------
   Trial banner — persistent chrome on every authenticated page
   --------------------------------------------------------------------------- */

export function TrialBanner({ org }: { org: ShellOrg }) {
  const left = daysLeft(org.trialEndsAt);
  if (left <= 0) return null;

  return (
    <div className="flex h-[60px] items-center justify-center gap-4 bg-brand px-6">
      <p className="text-[15px] font-semibold text-ink">
        {left} {left === 1 ? "day" : "days"} left in your free trial!
      </p>
      <Link
        href={`/${org.handle}/settings/billing`}
        className="inline-flex h-9 items-center gap-1.5 rounded-[8px] bg-white px-3.5 text-[14px] font-medium text-ink hover:bg-white/90"
      >
        <Plus className="size-4" />
        Add Payment Method
      </Link>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Header
   --------------------------------------------------------------------------- */

export function AppHeader({
  org,
  orgs,
  user,
  role,
}: {
  org: ShellOrg;
  orgs: ShellOrg[];
  user: ShellUser;
  role: string;
}) {
  const [orgOpen, setOrgOpen] = React.useState(false);
  const [acctOpen, setAcctOpen] = React.useState(false);
  const [createOpen, setCreateOpen] = React.useState(false);

  // One outside-click listener for both popovers.
  const headerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setOrgOpen(false);
        setAcctOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div ref={headerRef} className="relative border-b border-line bg-surface">
      <div className="flex h-[62px] items-center justify-between px-6">
        <div className="relative flex items-center gap-3">
          <Logo size={28} />
          <button
            onClick={() => {
              setOrgOpen((v) => !v);
              setAcctOpen(false);
            }}
            className="flex items-center gap-2.5 rounded px-1 py-1 hover:bg-surface-muted"
          >
            <span className="text-[17px] font-semibold text-ink">{org.name}</span>
            <Badge>{role === "ADMIN" ? "Admin" : "Member"}</Badge>
            <ChevronsUpDown className="size-4 text-ink-faint" />
          </button>

          {orgOpen && (
            <div className="absolute left-9 top-[46px] z-50 w-[360px] rounded-[8px] border border-line bg-surface py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
              {orgs.map((o) => (
                <Link
                  key={o.id}
                  href={`/${o.handle}/analytics`}
                  onClick={() => setOrgOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 px-4 py-2.5 text-[15px] text-ink hover:bg-surface-muted",
                    o.id === org.id && "bg-surface-muted",
                  )}
                >
                  <Building2 className="size-4 text-ink-muted" />
                  {o.name}
                </Link>
              ))}
              <div className="my-1 border-t border-line" />
              <button
                onClick={() => {
                  setOrgOpen(false);
                  setCreateOpen(true);
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-[15px] text-ink-muted hover:bg-surface-muted"
              >
                <Plus className="size-4" />
                Add organizations
              </button>
            </div>
          )}
        </div>

        <div className="relative flex items-center gap-1">
          <a
            href="https://github.com/stroland02/OpenGrep"
            target="_blank"
            rel="noreferrer"
            className="rounded p-2 text-ink-muted hover:bg-surface-muted hover:text-ink"
            aria-label="Docs"
          >
            <BookOpen className="size-5" />
          </a>
          <button
            className="rounded p-2 text-ink-muted hover:bg-surface-muted hover:text-ink"
            aria-label="Referrals"
          >
            <Gift className="size-5" />
          </button>
          <button
            onClick={() => {
              setAcctOpen((v) => !v);
              setOrgOpen(false);
            }}
            className="ml-1 rounded-full"
            aria-label="Account"
          >
            <Avatar user={user} size={30} />
          </button>

          {acctOpen && <AccountMenu user={user} onClose={() => setAcctOpen(false)} />}
        </div>
      </div>

      <CreateOrgModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}

function Avatar({ user, size = 30 }: { user: ShellUser; size?: number }) {
  if (user.avatarUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={user.avatarUrl}
        alt=""
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="inline-flex items-center justify-center rounded-full bg-[#e2e2e0] text-[13px] font-semibold text-ink-muted"
      style={{ width: size, height: size }}
    >
      {user.name.charAt(0).toUpperCase()}
    </span>
  );
}

/** Account popover with inline display-name editing, as in frames 82–85. */
function AccountMenu({ user, onClose }: { user: ShellUser; onClose: () => void }) {
  const router = useRouter();
  const toast = useToast();
  const [editing, setEditing] = React.useState(false);
  const [name, setName] = React.useState(user.name);
  const [saving, setSaving] = React.useState(false);

  async function save() {
    setSaving(true);
    const res = await fetch("/api/account/name", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setSaving(false);
    if (res.ok) {
      setEditing(false);
      toast.push({ title: "Success", body: "Name updated successfully", tone: "success" });
      router.refresh();
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div className="absolute right-0 top-[46px] z-50 w-[370px] rounded-[8px] border border-line bg-surface shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
      <div className="flex items-center gap-3 p-4">
        <Avatar user={user} size={44} />
        <div className="min-w-0 flex-1">
          {editing ? (
            <div className="flex items-center gap-1.5">
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && save()}
                className="h-8 w-[150px] rounded-[6px] border border-ink/30 px-2 text-[14px] outline-none"
              />
              <button
                onClick={save}
                disabled={saving}
                className="grid size-8 place-items-center rounded-[6px] border border-line hover:bg-surface-muted"
                aria-label="Confirm"
              >
                <Check className="size-4" />
              </button>
              <button
                onClick={() => {
                  setName(user.name);
                  setEditing(false);
                }}
                className="grid size-8 place-items-center rounded-[6px] border border-line hover:bg-surface-muted"
                aria-label="Cancel"
              >
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <p className="truncate text-[16px] font-semibold text-ink">{user.name}</p>
          )}
          <p className="truncate text-[13px] text-ink-muted">{user.email}</p>
        </div>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="rounded p-1.5 text-ink-muted hover:bg-surface-muted hover:text-ink"
            aria-label="Edit name"
          >
            <SquarePen className="size-4" />
          </button>
        )}
      </div>

      <div className="border-t border-line py-1.5">
        <Link
          href="/settings/personal"
          onClick={onClose}
          className="flex items-center gap-2.5 px-4 py-2.5 text-[15px] text-ink hover:bg-surface-muted"
        >
          <Settings className="size-4 text-ink-muted" />
          Settings
        </Link>
        <button
          onClick={logout}
          className="flex w-full items-center gap-2.5 px-4 py-2.5 text-[15px] text-danger hover:bg-surface-muted"
        >
          <LogOut className="size-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

function CreateOrgModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  async function create() {
    if (!name.trim()) return;
    setBusy(true);
    const res = await fetch("/api/orgs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setBusy(false);
    if (res.ok) {
      const { handle } = await res.json();
      onClose();
      setName("");
      router.push(`/${handle}/analytics`);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create Organization"
      subtitle="Organizations are a way to group your projects and users. You can create multiple organizations to keep your projects separate."
      footer={
        <Button variant="secondary" onClick={create} disabled={busy}>
          Create
        </Button>
      }
    >
      <label className="mb-2 block text-[14px] font-medium text-ink">
        Organization Name
      </label>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
    </Modal>
  );
}

/* ---------------------------------------------------------------------------
   Tab bar — underline active indicator
   --------------------------------------------------------------------------- */

const TABS = [
  ["Analytics", "analytics"],
  ["Repositories", "repositories"],
  ["Code Review Settings", "code-review-settings"],
  ["Custom Context", "custom-context"],
  ["Pull Requests", "pull-requests"],
  ["Code Providers", "code-providers"],
  ["Integrations", "integrations"],
  ["Organization Settings", "settings/organization"],
] as const;

export function TabNav({ handle }: { handle: string }) {
  const pathname = usePathname();

  return (
    <nav className="border-b border-line bg-surface px-6">
      <div className="flex gap-7 overflow-x-auto">
        {TABS.map(([label, seg]) => {
          const href = `/${handle}/${seg}`;
          const active =
            seg === "settings/organization"
              ? pathname.startsWith(`/${handle}/settings`)
              : pathname === href;
          return (
            <Link
              key={seg}
              href={href}
              className={cn(
                "-mb-px whitespace-nowrap border-b-2 px-0.5 py-3.5 text-[16px] transition-colors",
                active
                  ? "border-ink font-medium text-ink"
                  : "border-transparent text-ink-muted hover:text-ink",
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

/* ---------------------------------------------------------------------------
   Support launcher — present on every screen in the reference set
   --------------------------------------------------------------------------- */

export function SupportBubble() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-[320px] rounded-[10px] border border-line bg-surface p-5 shadow-[0_8px_28px_rgba(0,0,0,0.12)]">
          <p className="text-[15px] font-semibold text-ink">Need a hand?</p>
          <p className="mt-1.5 text-[14px] text-ink-muted">
            OpenGrep is a reconstruction built from UI reference captures. There is no
            support desk behind this button — it is here because the original has one on
            every screen.
          </p>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-40 grid size-14 place-items-center rounded-full bg-brand shadow-[0_4px_14px_rgba(0,0,0,0.18)] transition-transform hover:scale-105"
        aria-label="Support"
      >
        <MessageCircle className="size-6 text-ink" />
      </button>
    </>
  );
}
