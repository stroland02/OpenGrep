import { requireOrg } from "@/lib/auth";
import { db } from "@/lib/db";
import { BillingTab } from "./billing-tab";

export const metadata = { title: "Billing — OpenGrep" };

export default async function BillingPage({
  params,
}: {
  params: Promise<{ org: string }>;
}) {
  const { org: handle } = await params;
  const { org, role } = await requireOrg(handle);

  const [methods, invoices] = await Promise.all([
    db.paymentMethod.findMany({ where: { orgId: org.id }, orderBy: { createdAt: "desc" } }),
    db.invoice.findMany({ where: { orgId: org.id }, orderBy: { date: "desc" } }),
  ]);

  return (
    <BillingTab
      handle={handle}
      isAdmin={role === "ADMIN"}
      trialEndsAt={org.trialEndsAt.toISOString()}
      methods={methods.map((m) => ({
        id: m.id,
        brand: m.brand,
        last4: m.last4,
        expMonth: m.expMonth,
        expYear: m.expYear,
      }))}
      invoices={invoices.map((i) => ({
        id: i.id,
        date: i.date.toISOString(),
        amount: i.amount,
        status: i.status,
      }))}
    />
  );
}
