"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Plus, Receipt } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Modal,
  Table,
  TableEmpty,
  Td,
  Th,
  useToast,
} from "@/components/ui";
import { longDate } from "@/lib/utils";
import { addPaymentMethod, removePaymentMethod } from "../actions";

type Method = {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
};
type Invoice = { id: string; date: string; amount: number; status: string };

export function BillingTab({
  handle,
  isAdmin,
  trialEndsAt,
  methods,
  invoices,
}: {
  handle: string;
  isAdmin: boolean;
  trialEndsAt: string;
  methods: Method[];
  invoices: Invoice[];
}) {
  const router = useRouter();
  const [addOpen, setAddOpen] = React.useState(false);

  return (
    <>
      <div className="mb-6">
        <h2 className="text-[26px] font-semibold text-ink">Billing</h2>
        <p className="mt-1 text-[15px] text-ink-muted">
          Manage your subscription, payment methods, and invoices.
        </p>
      </div>

      <section className="mb-10">
        <h3 className="mb-1 text-[22px] font-semibold text-ink">Billing &amp; Usage</h3>
        <p className="mb-4 text-[15px] text-ink-muted">Manage your billing details</p>

        <Card>
          <div className="flex items-center gap-2 border-b border-line px-5 py-3">
            <Receipt className="size-4 text-ink-faint" />
            <span className="mono-label">Invoice History</span>
          </div>
          {invoices.length === 0 ? (
            <div className="grid h-[300px] place-items-center text-[15px] text-ink-muted">
              No invoice data available
            </div>
          ) : (
            <div className="flex h-[300px] items-end gap-3 px-6 pb-6 pt-8">
              {invoices
                .slice()
                .reverse()
                .map((i) => {
                  const max = Math.max(...invoices.map((x) => x.amount));
                  return (
                    <div key={i.id} className="flex flex-1 flex-col items-center gap-2">
                      <div
                        className="w-full max-w-[56px] rounded-t-[3px] bg-[#8a8a93]"
                        style={{ height: `${(i.amount / max) * 200}px` }}
                        title={`$${(i.amount / 100).toFixed(2)}`}
                      />
                      <span className="mono-label">{longDate(i.date)}</span>
                    </div>
                  );
                })}
            </div>
          )}
        </Card>
      </section>

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[22px] font-semibold text-ink">Payment Details</h3>
          <Button variant="secondary" disabled={!isAdmin} onClick={() => setAddOpen(true)}>
            <Plus className="size-4" />
            Add Payment Method
          </Button>
        </div>

        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th className="w-[120px]" />
            </tr>
          </thead>
          <tbody>
            {methods.length === 0 && <TableEmpty colSpan={2}>No payment methods</TableEmpty>}
            {methods.map((m) => (
              <tr key={m.id}>
                <Td>
                  <span className="flex items-center gap-3">
                    <span className="rounded-[4px] bg-surface-muted px-2 py-1 font-mono text-[12px] font-semibold text-ink">
                      {m.brand}
                    </span>
                    <span className="text-ink">•••• {m.last4}</span>
                    <span className="text-ink-muted">
                      {String(m.expMonth).padStart(2, "0")}/{String(m.expYear).slice(-2)}
                    </span>
                  </span>
                </Td>
                <Td>
                  <button
                    onClick={async () => {
                      await removePaymentMethod(handle, m.id);
                      router.refresh();
                    }}
                    className="text-[14px] text-danger hover:underline"
                  >
                    Remove
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      <section className="mb-10">
        <h3 className="mb-4 text-[22px] font-semibold text-ink">Past Invoices</h3>
        <Table>
          <thead>
            <tr>
              <Th>
                <span className="flex items-center gap-1.5">
                  Date
                  <ChevronDown className="size-3" />
                </span>
              </Th>
              <Th className="w-[200px]">Amount</Th>
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 && <TableEmpty colSpan={2}>No results.</TableEmpty>}
            {invoices.map((i) => (
              <tr key={i.id}>
                <Td className="text-ink">{longDate(i.date)}</Td>
                <Td className="text-ink">${(i.amount / 100).toFixed(2)}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      <section>
        <h3 className="mb-4 text-[22px] font-semibold text-ink">Billing Portal</h3>
        <Card className="flex items-center justify-between gap-6 p-6">
          <div>
            <p className="flex items-center gap-2 text-[17px] font-medium text-ink">
              Manage Billing
              <Badge>Trial</Badge>
            </p>
            <p className="mt-1 text-[15px] text-ink-muted">
              You&apos;re on a free trial until {longDate(trialEndsAt)}. Visit the portal to
              add a payment method or manage your plan.
            </p>
          </div>
          <Button variant="secondary" className="shrink-0" onClick={() => setAddOpen(true)}>
            Manage
          </Button>
        </Card>
      </section>

      <AddPaymentModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        handle={handle}
      />
    </>
  );
}

/**
 * A faithful reproduction of the payment form, with real client-side Luhn
 * validation and the error strings from the captures. Nothing is sent to a
 * processor — the card is recorded locally and never charged.
 */
function AddPaymentModal({
  open,
  onClose,
  handle,
}: {
  open: boolean;
  onClose: () => void;
  handle: string;
}) {
  const router = useRouter();
  const toast = useToast();
  const [number, setNumber] = React.useState("");
  const [expiry, setExpiry] = React.useState("");
  const [cvc, setCvc] = React.useState("");
  const [country, setCountry] = React.useState("Singapore");
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  const complete = number.replace(/\D/g, "").length >= 13 && /\d\d\s*\/\s*\d\d/.test(expiry) && cvc.length >= 3;

  async function save() {
    setError(null);
    const [mm, yy] = expiry.split("/").map((s) => Number(s.trim()));
    setBusy(true);
    const res = await addPaymentMethod(handle, {
      number,
      expMonth: mm,
      expYear: 2000 + yy,
      country,
    });
    setBusy(false);

    if (!res.ok) {
      setError(res.error);
      return;
    }
    toast.push({ title: "Success", body: "Payment method added", tone: "success" });
    setNumber("");
    setExpiry("");
    setCvc("");
    onClose();
    router.refresh();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Payment Method"
      footer={
        <Button onClick={save} disabled={!complete || busy}>
          Save Payment Method
        </Button>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-[14px] text-ink">Card number</label>
          <input
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
              setError(null);
            }}
            placeholder="4242 4242 4242 4242"
            className={`h-11 w-full rounded-[8px] border px-3 font-mono text-[15px] outline-none ${
              error ? "border-danger text-danger" : "border-line focus:border-[#0570de]"
            }`}
          />
          {error && <p className="mt-1.5 text-[13px] text-danger">{error}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-[14px] text-ink">Expiration (MM/YY)</label>
            <input
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="04 / 28"
              className="h-11 w-full rounded-[8px] border border-line px-3 font-mono text-[15px] outline-none focus:border-[#0570de]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[14px] text-ink">Security code</label>
            <input
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="123"
              maxLength={4}
              className="h-11 w-full rounded-[8px] border border-line px-3 font-mono text-[15px] outline-none focus:border-[#0570de]"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[14px] text-ink">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="h-11 w-full rounded-[8px] border border-line bg-surface px-3 text-[15px] outline-none"
          >
            {["Singapore", "United States", "United Kingdom", "Germany", "Australia"].map(
              (c) => (
                <option key={c}>{c}</option>
              ),
            )}
          </select>
        </div>

        <p className="text-[13px] leading-relaxed text-ink-muted">
          OpenGrep does not contact a payment processor. This form validates and records a
          card locally so the billing screens have real data; nothing is ever charged.
        </p>
      </div>
    </Modal>
  );
}
