"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Info, SquarePen, Trash2 } from "lucide-react";
import { Button, Card, Input, Modal, Toggle, useToast } from "@/components/ui";
import { deleteOrganization, setOrgToggle, updateOrgDetails } from "../actions";

export function OrganizationTab({
  handle,
  isAdmin,
  org,
}: {
  handle: string;
  isAdmin: boolean;
  org: {
    name: string;
    handle: string;
    telemetryEnabled: boolean;
    featureTipsEnabled: boolean;
  };
}) {
  const router = useRouter();
  const toast = useToast();

  const [editing, setEditing] = React.useState(false);
  const [name, setName] = React.useState(org.name);
  const [slug, setSlug] = React.useState(org.handle);
  const [busy, setBusy] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [phrase, setPhrase] = React.useState("");

  // Save Changes stays disabled until something actually differs (frame 98).
  const dirty = name !== org.name || slug !== org.handle;

  async function save() {
    setBusy(true);
    const res = await updateOrgDetails(handle, { name, handle: slug });
    setBusy(false);

    if (!res.ok) {
      toast.push({ title: "Could not save", body: res.error, tone: "error" });
      return;
    }
    setEditing(false);
    toast.push({
      title: "Success",
      body: "Organization details updated successfully",
      tone: "success",
    });
    if (res.handle !== handle) router.push(`/${res.handle}/settings/organization`);
    else router.refresh();
  }

  function discard() {
    setName(org.name);
    setSlug(org.handle);
    setEditing(false);
  }

  async function confirmDelete() {
    setBusy(true);
    const res = await deleteOrganization(handle, phrase);
    setBusy(false);

    if (!res.ok) {
      toast.push({ title: "Could not delete", body: res.error, tone: "error" });
      return;
    }
    router.push("/");
  }

  return (
    <div className="space-y-12">
      <section>
        <h2 className="mb-4 text-[22px] font-semibold text-ink">Organization Details</h2>
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
                <label className="mb-2 block text-[14px] font-medium text-ink">
                  Handle
                </label>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  disabled={!editing}
                />
              </div>
            </div>

            <div className="flex shrink-0 gap-2 pt-7">
              {editing ? (
                <>
                  <Button variant="secondary" onClick={discard} disabled={busy}>
                    Discard
                  </Button>
                  <Button onClick={save} disabled={!dirty || busy}>
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button
                  variant="secondary"
                  onClick={() => setEditing(true)}
                  disabled={!isAdmin}
                >
                  <SquarePen className="size-4" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-[22px] font-semibold text-ink">Enterprise SSO</h2>
        <Card className="p-6">
          <p className="text-[15px] text-ink-muted">
            Contact us at{" "}
            <a href="mailto:support@opengrep.dev" className="text-brand-dark underline">
              support@opengrep.dev
            </a>{" "}
            to enable Enterprise SSO for your organization.
          </p>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-[22px] font-semibold text-ink">Settings</h2>
        <Card>
          <div className="flex items-center justify-between gap-6 p-6">
            <div>
              <p className="text-[17px] font-medium text-ink">Help us improve OpenGrep</p>
              <p className="mt-0.5 text-[15px] text-ink-muted">
                Allow OpenGrep to learn from your usage to improve the code review agent
              </p>
            </div>
            <Toggle
              checked={org.telemetryEnabled}
              disabled={!isAdmin}
              onChange={async (v) => {
                await setOrgToggle(handle, "telemetryEnabled", v);
                router.refresh();
              }}
            />
          </div>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-[22px] font-semibold text-ink">Feature Tips</h2>
        <Card>
          <div className="flex items-center justify-between gap-6 p-6">
            <div>
              <p className="text-[17px] font-medium text-ink">
                New feature tips in PR comments
              </p>
              <p className="mt-0.5 text-[15px] text-ink-muted">
                Occasional tips about OpenGrep features included in review comments
              </p>
            </div>
            <Toggle
              checked={org.featureTipsEnabled}
              disabled={!isAdmin}
              onChange={async (v) => {
                await setOrgToggle(handle, "featureTipsEnabled", v);
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
                Delete this Organization
                <span title="Everything in this organization is removed for every member.">
                  <Info className="size-3.5 text-ink-faint" />
                </span>
              </p>
              <p className="mt-1 text-[15px] text-ink-muted">
                This will permanently delete the organization and all its data for every
                member. This cannot be undone.
              </p>
            </div>
            <Button
              variant="destructive-soft"
              className="shrink-0"
              disabled={!isAdmin}
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2 className="size-4" />
              Delete Organization
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
        title="Delete Organization"
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
              disabled={phrase !== "confirm deletion of organization" || busy}
              onClick={confirmDelete}
            >
              Delete this organization
            </Button>
          </>
        }
      >
        <p className="text-[15px] text-ink-muted">
          This action cannot be undone. This will permanently delete{" "}
          <span className="font-semibold text-ink">{org.name}</span>.
        </p>
        <p className="mt-4 text-[15px] text-ink">
          Please type:{" "}
          <span className="font-mono font-semibold text-danger">
            confirm deletion of organization
          </span>
        </p>
        <Input
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          className="mt-3 font-mono"
        />
      </Modal>
    </div>
  );
}
