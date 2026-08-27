import { CompleteStep } from "./complete-step";

export const metadata = { title: "All done — OpenGrep" };

export default async function CompletePage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const { org } = await searchParams;
  return <CompleteStep org={org ?? ""} />;
}
