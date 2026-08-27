"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Clock, MoreVertical, Plus } from "lucide-react";
import { Button, Card, Modal, PageHeader, useToast } from "@/components/ui";
import { GitHubMark } from "@/components/oauth-buttons";
import { cn, relativeTime } from "@/lib/utils";
import { connectProvider, disconnectProvider, syncProvider } from "./actions";

type Provider = {
  id: string;
  type: "GITHUB" | "GITLAB";
  accountName: string;
  teamCount: number;
  repoCount: number;
  lastSyncAt: string | null;
};

export function CodeProvidersView({
  handle,
  providers,
}: {
  handle: string;
  providers: Provider[];
}) {
  const router = useRouter();
  const toast = useToast();
  const [menuFor, setMenuFor] = React.useState<string | null>(null);
  const [confirmFor, setConfirmFor] = React.useState<Provider | null>(null);
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    const close = () => setMenuFor(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  async function connect(type: "GITHUB" | "GITLAB") {
    setBusy(true);
    await connectProvider(handle, type);
    setBusy(false);
    toast.push({
      title: "Success",
      body: `Connected ${type === "GITHUB" ? "GitHub" : "GitLab"} successfully`,
      tone: "success",
    });
    router.refresh();
  }

  async function disconnect() {
    if (!confirmFor) return;
    setBusy(true);
    await disconnectProvider(handle, confirmFor.id);
    setBusy(false);
    const label = confirmFor.type.toLowerCase();
    setConfirmFor(null);
    toast.push({ title: "Success", body: `Disconnected ${label} successfully` });
    router.refresh();
  }

  return (
    <>
      <div className="mb-6 flex items-end justify-between">
        <PageHeader
          title="Code Providers"
          subtitle="Connect or manage your code providers"
        />
        {providers.length > 0 && (
          <Button className="mb-6" onClick={() => connect("GITLAB")} disabled={busy}>
            <Plus className="size-4" />
            Add Provider
          </Button>
        )}
      </div>

      {providers.length === 0 ? (
        <Card className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="mb-5 flex items-center gap-5">
            <GitHubMark className="size-9 text-ink" />
            <GitLabLogo />
          </div>
          <p className="text-[19px] font-semibold text-ink">No code providers connected</p>
          <p className="mt-1.5 text-[15px] text-ink-muted">
            Connect GitHub or GitLab to sync repositories and start reviews.
          </p>
          <div className="mt-6 flex gap-3">
            <Button variant="secondary" onClick={() => connect("GITLAB")} disabled={busy}>
              <GitLabLogo size={16} />
              Connect GitLab
            </Button>
            <Button variant="secondary" onClick={() => connect("GITHUB")} disabled={busy}>
              <GitHubMark className="size-4 text-ink" />
              Connect GitHub
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {providers.map((p) => (
            <Card key={p.id}>
              <div className="flex items-center gap-4 px-5 py-4">
                {p.type === "GITHUB" ? (
                  <GitHubMark className="size-6 text-ink" />
                ) : (
                  <GitLabLogo size={24} />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-[17px] font-semibold text-ink">
                    {p.type === "GITHUB" ? "GitHub" : "GitLab"}
                  </p>
                  <p className="text-[14px] text-ink-muted">{p.accountName}</p>
                </div>

                <div className="flex items-center gap-2 text-[14px] text-ink-muted">
                  <Clock className="size-4" />
                  <span>Last Sync:</span>
                  <span className="text-ink">
                    {p.lastSyncAt ? relativeTime(p.lastSyncAt) : "never"}
                  </span>
                </div>

                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuFor(menuFor === p.id ? null : p.id);
                    }}
                    className="rounded p-2 text-ink-muted hover:bg-surface-muted hover:text-ink"
                    aria-label="Provider actions"
                  >
                    <MoreVertical className="size-5" />
                  </button>

                  {menuFor === p.id && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 top-11 z-40 w-[255px] rounded-[4px] border border-line bg-surface py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.10)]"
                    >
                      <MenuItem
                        onClick={async () => {
                          setMenuFor(null);
                          await syncProvider(handle, p.id);
                          toast.push({ title: "Synced", body: "Provider metadata refreshed." });
                          router.refresh();
                        }}
                      >
                        Edit Configuration
                      </MenuItem>
                      <MenuItem onClick={() => setMenuFor(null)}>
                        Manage Organizations
                      </MenuItem>
                      <MenuItem
                        destructive
                        onClick={() => {
                          setMenuFor(null);
                          setConfirmFor(p);
                        }}
                      >
                        Disconnect
                      </MenuItem>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-line px-5 py-3.5">
                <span className="text-[15px] text-ink">
                  {p.teamCount} {p.teamCount === 1 ? "Team" : "Teams"}
                </span>
                <button
                  onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                  className="flex items-center gap-1.5 text-[15px] text-ink hover:text-ink-muted"
                >
                  {p.repoCount} {p.repoCount === 1 ? "Repository" : "Repositories"}
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform",
                      expanded === p.id && "rotate-180",
                    )}
                  />
                </button>
              </div>

              {expanded === p.id && (
                <div className="border-t border-line px-5 py-4 text-[14px] text-ink-muted">
                  Repositories are managed from the{" "}
                  <a href={`/${handle}/repositories`} className="text-brand-dark underline">
                    Repositories
                  </a>{" "}
                  tab.
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={confirmFor !== null}
        onClose={() => setConfirmFor(null)}
        width={570}
        title="Disconnect Provider"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmFor(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={disconnect} disabled={busy}>
              Disconnect
            </Button>
          </>
        }
      >
        <p className="text-[15px] text-ink-muted">
          Are you sure you want to disconnect this provider? This action cannot be undone.
        </p>
      </Modal>
    </>
  );
}

function MenuItem({
  children,
  onClick,
  destructive,
}: {
  children: React.ReactNode;
  onClick: () => void;
  destructive?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "block w-full px-4 py-2.5 text-left text-[15px] hover:bg-surface-muted",
        destructive ? "text-danger" : "text-ink",
      )}
    >
      {children}
    </button>
  );
}

function GitLabLogo({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="m12 22.5-3.7-11.4h7.4L12 22.5Z" fill="#e24329" />
      <path d="M12 22.5 8.3 11.1H3.1L12 22.5Z" fill="#fc6d26" />
      <path d="M3.1 11.1 2 14.6a.76.76 0 0 0 .28.85L12 22.5 3.1 11.1Z" fill="#fca326" />
      <path d="M3.1 11.1h5.2L6.06 4.2c-.11-.35-.61-.35-.73 0L3.1 11.1Z" fill="#e24329" />
      <path d="m12 22.5 3.7-11.4h5.2L12 22.5Z" fill="#fc6d26" />
      <path d="m20.9 11.1 1.1 3.5a.76.76 0 0 1-.28.85L12 22.5l8.9-11.4Z" fill="#fca326" />
      <path d="M20.9 11.1h-5.2l2.24-6.9c.11-.35.61-.35.73 0l2.23 6.9Z" fill="#e24329" />
    </svg>
  );
}
