"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, ChevronsUpDown, Clipboard, MoreHorizontal, Plus, Search } from "lucide-react";
import {
  Button,
  Input,
  Modal,
  Table,
  TableEmpty,
  Td,
  Th,
  useToast,
} from "@/components/ui";
import { longDate } from "@/lib/utils";
import { createApiKey, revokeApiKey } from "../actions";

type Key = { id: string; name: string; prefix: string; createdAt: string };

export function ApiKeysTab({
  handle,
  isAdmin,
  keys,
}: {
  handle: string;
  isAdmin: boolean;
  keys: Key[];
}) {
  const router = useRouter();
  const toast = useToast();
  const [query, setQuery] = React.useState("");
  const [createOpen, setCreateOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [secret, setSecret] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [menuFor, setMenuFor] = React.useState<string | null>(null);

  React.useEffect(() => {
    const close = () => setMenuFor(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const filtered = keys.filter(
    (k) => !query.trim() || k.name.toLowerCase().includes(query.toLowerCase()),
  );

  async function create() {
    setBusy(true);
    const res = await createApiKey(handle, name);
    setBusy(false);

    if (!res.ok) {
      toast.push({ title: "Could not create key", body: res.error, tone: "error" });
      return;
    }
    // Revealed exactly once; only a truncated prefix is kept afterwards.
    setSecret(res.secret);
    setName("");
    router.refresh();
  }

  async function copy() {
    if (!secret) return;
    await navigator.clipboard.writeText(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  function closeCreate() {
    setCreateOpen(false);
    setSecret(null);
    setName("");
    setCopied(false);
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-[26px] font-semibold text-ink">API Keys</h2>
        <p className="mt-1 text-[15px] text-ink-muted">
          Create and manage API keys for programmatic access.
        </p>
      </div>

      <div className="mb-5 flex gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name..."
            className="h-11 w-full rounded-[8px] border border-line bg-surface pl-9 pr-3 text-[15px] outline-none placeholder:text-ink-faint focus:border-ink/30"
          />
        </div>
        <Button className="shrink-0" disabled={!isAdmin} onClick={() => setCreateOpen(true)}>
          <Plus className="size-4" />
          Create API Key
        </Button>
      </div>

      <Table>
        <thead>
          <tr>
            <Th>
              <span className="flex items-center gap-1.5">
                Name
                <ChevronsUpDown className="size-3" />
              </span>
            </Th>
            <Th className="w-[320px]">ID</Th>
            <Th className="w-[200px]">
              <span className="flex items-center gap-1.5">
                Created
                <ChevronDown className="size-3" />
              </span>
            </Th>
            <Th className="w-[100px]" />
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && <TableEmpty colSpan={4}>No results.</TableEmpty>}
          {filtered.map((k) => (
            <tr key={k.id}>
              <Td className="font-medium">{k.name}</Td>
              <Td className="font-mono text-[13px] text-ink-muted">{k.prefix}…</Td>
              <Td className="text-ink-muted">{longDate(k.createdAt)}</Td>
              <Td>
                {isAdmin && (
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuFor(menuFor === k.id ? null : k.id);
                      }}
                      className="rounded p-1.5 text-ink-muted hover:bg-surface-muted hover:text-ink"
                      aria-label="Key actions"
                    >
                      <MoreHorizontal className="size-5" />
                    </button>
                    {menuFor === k.id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-9 z-40 w-[180px] rounded-[8px] border border-line bg-surface py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.10)]"
                      >
                        <button
                          onClick={async () => {
                            setMenuFor(null);
                            await revokeApiKey(handle, k.id);
                            toast.push({ title: "Revoked", body: k.name });
                            router.refresh();
                          }}
                          className="block w-full px-4 py-2.5 text-left text-[15px] text-danger hover:bg-surface-muted"
                        >
                          Revoke key
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

      <Modal
        open={createOpen}
        onClose={closeCreate}
        title="Create API Key"
        footer={
          secret ? null : (
            <Button variant="secondary" onClick={create} disabled={!name.trim() || busy}>
              Create
            </Button>
          )
        }
      >
        {secret ? (
          <>
            <label className="mb-2 block text-[14px] font-medium text-ink">API Key</label>
            <div className="mb-3 break-all rounded-[8px] border border-line bg-surface-muted px-3 py-3 font-mono text-[13px] text-ink">
              {secret}
            </div>
            <p className="mb-5 text-[14px] text-ink-muted">
              Copy this key now — it won&apos;t be shown again.
            </p>
            <Button variant="secondary" className="w-full" onClick={copy}>
              <Clipboard className="size-4" />
              {copied ? "Copied!" : "Copy API Key"}
            </Button>
          </>
        ) : (
          <>
            <label className="mb-2 block text-[14px] font-medium text-ink">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && name.trim() && create()}
            />
          </>
        )}
      </Modal>
    </>
  );
}
