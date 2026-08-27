"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, Link2, MoreHorizontal, Plus, Search } from "lucide-react";
import {
  Badge,
  Button,
  Table,
  TableEmpty,
  Td,
  Th,
  useToast,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { inviteMember, removeMember, updateMemberRole } from "../actions";

type Member = {
  id: string;
  email: string;
  role: "ADMIN" | "MEMBER";
  status: "ACTIVE" | "PENDING";
  isYou: boolean;
};

export function PeopleTab({
  handle,
  isAdmin,
  members,
}: {
  handle: string;
  isAdmin: boolean;
  members: Member[];
}) {
  const router = useRouter();
  const toast = useToast();
  const [query, setQuery] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState<"all" | "ADMIN" | "MEMBER">("all");
  const [inviteOpen, setInviteOpen] = React.useState(false);
  const [menuFor, setMenuFor] = React.useState<string | null>(null);

  React.useEffect(() => {
    const close = () => setMenuFor(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const filtered = members.filter(
    (m) =>
      (roleFilter === "all" || m.role === roleFilter) &&
      (!query.trim() || m.email.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <>
      <div className="mb-6">
        <h2 className="text-[26px] font-semibold text-ink">People</h2>
        <p className="mt-1 text-[15px] text-ink-muted">
          Manage members, roles, and invitations.
        </p>
      </div>

      <div className="relative mb-5 flex gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by email"
            className="h-11 w-full rounded-[8px] border border-line bg-surface pl-9 pr-3 text-[15px] outline-none placeholder:text-ink-faint focus:border-ink/30"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as typeof roleFilter)}
          className="h-11 rounded-[8px] border border-line bg-surface px-3 text-[15px] outline-none"
        >
          <option value="all">All roles</option>
          <option value="ADMIN">Admin</option>
          <option value="MEMBER">Member</option>
        </select>

        <Button
          className="shrink-0"
          disabled={!isAdmin}
          onClick={(e) => {
            e.stopPropagation();
            setInviteOpen((v) => !v);
          }}
        >
          <Plus className="size-4" />
          Invite people
        </Button>

        {inviteOpen && (
          <InvitePopover
            handle={handle}
            onClose={() => setInviteOpen(false)}
            onInvited={() => router.refresh()}
          />
        )}
      </div>

      <Table>
        <thead>
          <tr>
            <Th>Email</Th>
            <Th className="w-[180px]">Role</Th>
            <Th className="w-[120px]">Actions</Th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && <TableEmpty colSpan={3}>No results.</TableEmpty>}
          {filtered.map((m) => (
            <tr key={m.id}>
              <Td>
                <span className="flex items-center gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#e2e2e0] text-[13px] font-semibold text-ink-muted">
                    {m.email.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-ink">{m.email}</span>
                  {m.isYou ? (
                    <Badge>You</Badge>
                  ) : m.status === "PENDING" ? (
                    <Badge>Pending</Badge>
                  ) : null}
                </span>
              </Td>
              <Td className="text-ink-muted">
                {m.role === "ADMIN" ? "Admin" : "Member"}
              </Td>
              <Td>
                {/* Self-management is disallowed — the "You" row has no menu. */}
                {!m.isYou && isAdmin && (
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuFor(menuFor === m.id ? null : m.id);
                      }}
                      className="rounded p-1.5 text-ink-muted hover:bg-surface-muted hover:text-ink"
                      aria-label="Member actions"
                    >
                      <MoreHorizontal className="size-5" />
                    </button>

                    {menuFor === m.id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-9 z-40 w-[220px] rounded-[8px] border border-line bg-surface py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.10)]"
                      >
                        <button
                          onClick={async () => {
                            setMenuFor(null);
                            await updateMemberRole(
                              handle,
                              m.id,
                              m.role === "ADMIN" ? "MEMBER" : "ADMIN",
                            );
                            router.refresh();
                          }}
                          className="block w-full px-4 py-2.5 text-left text-[15px] text-ink hover:bg-surface-muted"
                        >
                          Make {m.role === "ADMIN" ? "Member" : "Admin"}
                        </button>
                        <button
                          onClick={async () => {
                            setMenuFor(null);
                            await removeMember(handle, m.id);
                            toast.push({ title: "Removed", body: m.email });
                            router.refresh();
                          }}
                          className="block w-full px-4 py-2.5 text-left text-[15px] text-danger hover:bg-surface-muted"
                        >
                          Remove from organization
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

/** Anchored form with two invite paths: by email, or a shareable member link. */
function InvitePopover({
  handle,
  onClose,
  onInvited,
}: {
  handle: string;
  onClose: () => void;
  onInvited: () => void;
}) {
  const toast = useToast();
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState<"ADMIN" | "MEMBER">("MEMBER");
  const [copied, setCopied] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [busy, setBusy] = React.useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(
      `${window.location.origin}/signup?invite=${handle}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  async function send() {
    setBusy(true);
    const res = await inviteMember(handle, email, role);
    setBusy(false);

    if (!res.ok) {
      toast.push({ title: "Could not invite", body: res.error, tone: "error" });
      return;
    }
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 2200);
    onInvited();
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute right-0 top-[52px] z-40 w-[710px] max-w-[calc(100vw-3rem)] rounded-[8px] border border-line bg-surface shadow-[0_4px_16px_rgba(0,0,0,0.10)]"
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <p className="text-[16px] font-semibold text-ink">Invite people</p>
        <button
          onClick={copyLink}
          className="inline-flex items-center gap-1.5 text-[14px] text-ink-muted hover:text-ink"
        >
          {copied ? (
            <>
              <Check className="size-4" />
              Copied
            </>
          ) : (
            <>
              <Link2 className="size-4" />
              Copy member link
            </>
          )}
        </button>
      </div>

      <div className="flex gap-3 p-4">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && email.trim() && send()}
          placeholder="Email address"
          className="h-11 flex-1 rounded-[8px] border border-line px-3 text-[15px] outline-none placeholder:text-ink-faint focus:border-ink/30"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "ADMIN" | "MEMBER")}
          className="h-11 rounded-[8px] border border-line bg-surface px-3 text-[15px] outline-none"
        >
          <option value="MEMBER">Member</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button
          onClick={send}
          disabled={!email.trim() || busy || sent}
          className={cn(
            "h-11 rounded-[8px] px-5 text-[14px] font-medium",
            sent
              ? "bg-surface-muted text-ink-muted"
              : "bg-ink text-white disabled:bg-[#b5b5b5]",
          )}
        >
          {sent ? (
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-4" />
              Sent
            </span>
          ) : (
            "Invite"
          )}
        </button>
      </div>
      <button className="sr-only" onClick={onClose}>
        Close
      </button>
    </div>
  );
}
