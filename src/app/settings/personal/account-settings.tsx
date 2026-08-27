"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Plus, Settings, SquarePen } from "lucide-react";
import {
  Button,
  Card,
  Input,
  Modal,
  Table,
  TableEmpty,
  Td,
  Th,
  Toggle,
  useToast,
} from "@/components/ui";
import { GitHubMark } from "@/components/oauth-buttons";
import { cn } from "@/lib/utils";
import {
  configureIntegration,
  deleteAccount,
  leaveOrganization,
  linkAccount,
  unlinkAccount,
  updateProfile,
} from "./actions";

export function AccountSettings({
  user,
  orgs,
  linked,
  integrations,
}: {
  user: { name: string; email: string; weeklyDigest: boolean };
  orgs: { membershipId: string; name: string; role: string }[];
  linked: { provider: string; handle: string }[];
  integrations: { name: string; status: string }[];
}) {
  const router = useRouter();
  const toast = useToast();
  const [editing, setEditing] = React.useState(false);
  const [name, setName] = React.useState(user.name);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [phrase, setPhrase] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  // Deletion is gated on having left every organization.
  const canDelete = orgs.length === 0;

  async function saveName() {
    setBusy(true);
    await updateProfile({ name });
    setBusy(false);
    setEditing(false);
    toast.push({ title: "Success", body: "Name updated successfully", tone: "success" });
    router.refresh();
  }

  async function confirmDelete() {
    setBusy(true);
    const res = await deleteAccount(phrase);
    setBusy(false);

    if (!res.ok) {
      toast.push({ title: "Could not delete account", body: res.error, tone: "error" });
      return;
    }
    toast.push({
      title: "Account deleted",
      body: "Your account has been permanently deleted.",
    });
    router.push("/login");
  }

  return (
    <div className="space-y-12">
      <section>
        <h2 className="mb-4 text-[22px] font-semibold text-ink">Profile</h2>
        <Card className="p-6">
          <div className="flex items-start justify-between gap-6">
            <div className="grid flex-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-[14px] font-medium text-ink">Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!editing}
                />
              </div>
              <div>
                <label className="mb-2 block text-[14px] font-medium text-ink">Email</label>
                <Input value={user.email} disabled />
                <p className="mt-1.5 text-[13px] text-ink-muted">
                  Email cannot be changed.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 gap-2 pt-7">
              {editing ? (
                <>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setName(user.name);
                      setEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={saveName} disabled={busy || name === user.name}>
                    Save
                  </Button>
                </>
              ) : (
                <Button variant="secondary" onClick={() => setEditing(true)}>
                  <SquarePen className="size-4" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-[22px] font-semibold text-ink">Roles &amp; Access</h2>
        {orgs.length === 0 ? (
          <Card className="px-6 py-10 text-center text-[15px] text-ink-muted">
            You are not a member of any organizations.
          </Card>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th className="w-[180px]">Role</Th>
                <Th className="w-[120px]">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {orgs.map((o) => (
                <tr key={o.membershipId}>
                  <Td className="font-medium">{o.name}</Td>
                  <Td className="text-ink-muted">
                    {o.role === "ADMIN" ? "Admin" : "Member"}
                  </Td>
                  <Td>
                    <button
                      onClick={async () => {
                        await leaveOrganization(o.membershipId);
                        toast.push({ title: "Left organization", body: o.name });
                        router.refresh();
                      }}
                      className="rounded-[6px] border border-line p-2 text-ink-muted hover:bg-surface-muted hover:text-ink"
                      aria-label={`Leave ${o.name}`}
                      title={`Leave ${o.name}`}
                    >
                      <Settings className="size-4" />
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[22px] font-semibold text-ink">Linked Accounts</h2>
          {linked.length > 0 && (
            <Button
              variant="secondary"
              onClick={async () => {
                await linkAccount("GITLAB");
                router.refresh();
              }}
            >
              <Plus className="size-4" />
              Add Account
            </Button>
          )}
        </div>

        {linked.length === 0 ? (
          <Card className="flex flex-col items-center px-6 py-12 text-center">
            <p className="text-[17px] font-semibold text-ink">No accounts linked</p>
            <p className="mt-1.5 text-[15px] text-ink-muted">
              Connect a GitHub or GitLab account for review settings to take effect.
            </p>
            <div className="mt-5 flex gap-3">
              <Button
                variant="secondary"
                onClick={async () => {
                  await linkAccount("GITHUB");
                  router.refresh();
                }}
              >
                <GitHubMark className="size-4 text-ink" />
                Connect GitHub
              </Button>
              <Button
                variant="secondary"
                onClick={async () => {
                  await linkAccount("GITLAB");
                  router.refresh();
                }}
              >
                Connect GitLab
              </Button>
            </div>
          </Card>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Provider</Th>
                <Th className="w-[140px]">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {linked.map((a) => (
                <tr key={a.provider}>
                  <Td>
                    <span className="flex items-center gap-2.5">
                      {a.provider === "GITHUB" && <GitHubMark className="size-4 text-ink" />}
                      <span className="text-ink">
                        {a.provider === "GITHUB" ? "GitHub" : "GitLab"}
                      </span>
                      <span className="text-ink-muted">{a.handle}</span>
                    </span>
                  </Td>
                  <Td>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={async () => {
                        await unlinkAccount(a.provider);
                        router.refresh();
                      }}
                    >
                      Unlink
                    </Button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-[22px] font-semibold text-ink">Personal Integrations</h2>
        <Table>
          <thead>
            <tr>
              <Th>Integration</Th>
              <Th className="w-[220px]">Status</Th>
              <Th className="w-[160px]">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {integrations.length === 0 && (
              <TableEmpty colSpan={3}>No results.</TableEmpty>
            )}
            {integrations.map((i) => (
              <tr key={i.name}>
                <Td className="font-medium">{i.name}</Td>
                <Td>
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "size-2 rounded-full",
                        i.status === "CONNECTED" ? "bg-success" : "bg-warning",
                      )}
                    />
                    <span className="mono-status text-ink-muted">
                      {i.status.replace("_", " ")}
                    </span>
                  </span>
                </Td>
                <Td>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={async () => {
                      await configureIntegration(i.name);
                      router.refresh();
                    }}
                  >
                    {i.status === "CONNECTED" ? "Disconnect" : "Configure"}
                  </Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      <section>
        <h2 className="mb-4 text-[22px] font-semibold text-ink">Email Preferences</h2>
        <Card>
          <div className="flex items-center justify-between gap-6 p-6">
            <div>
              <p className="text-[17px] font-medium text-ink">Weekly Digest</p>
              <p className="mt-0.5 text-[15px] text-ink-muted">
                Receive a weekly summary about your team&apos;s activity and OpenGrep&apos;s
                catches
              </p>
            </div>
            <Toggle
              checked={user.weeklyDigest}
              onChange={async (v) => {
                await updateProfile({ weeklyDigest: v });
                router.refresh();
              }}
            />
          </div>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-[22px] font-semibold text-ink">Danger Zone</h2>
        <Card className="border-[#f3c9c9] p-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="flex items-center gap-2 text-[17px] font-medium text-danger">
                <AlertTriangle className="size-4" />
                Delete this account
              </p>
              <p className="mt-1 text-[15px] text-ink-muted">
                {canDelete
                  ? "Once you delete your account, all access will be lost. Please be certain."
                  : "You must leave or delete all organizations before deleting your account."}
              </p>
            </div>
            <Button
              variant={canDelete ? "destructive" : "destructive-soft"}
              className="shrink-0"
              disabled={!canDelete}
              onClick={() => setDeleteOpen(true)}
            >
              Delete Account
            </Button>
          </div>
        </Card>
      </section>

      <Modal
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setPhrase("");
        }}
        width={565}
        title="Delete Account"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setDeleteOpen(false);
                setPhrase("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={phrase !== "DELETE" || busy}
              onClick={confirmDelete}
            >
              Permanently Delete Account
            </Button>
          </>
        }
      >
        <p className="text-[15px] text-ink-muted">
          This action is permanent and cannot be undone. All your data, linked accounts, and
          preferences will be deleted.
        </p>
        <p className="mt-4 text-[15px] text-ink">
          Type <span className="font-mono font-semibold">DELETE</span> to confirm.
        </p>
        <Input
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          placeholder="DELETE"
          className="mt-3 font-mono"
        />
      </Modal>
    </div>
  );
}
