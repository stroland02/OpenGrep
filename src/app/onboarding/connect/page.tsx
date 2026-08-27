import { ConnectStep } from "./connect-step";

export const metadata = { title: "Connect your code provider — OpenGrep" };

export default async function ConnectPage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const { org } = await searchParams;
  return <ConnectStep org={org ?? ""} />;
}
