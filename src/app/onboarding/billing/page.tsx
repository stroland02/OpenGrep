import { BillingStep } from "./billing-step";

export const metadata = { title: "Your free trial — OpenGrep" };

export default async function OnboardingBillingPage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const { org } = await searchParams;
  return <BillingStep org={org ?? ""} />;
}
