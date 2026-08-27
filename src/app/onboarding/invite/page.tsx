import { InviteStep } from "./invite-step";

export const metadata = { title: "Invite your team — OpenGrep" };

export default async function InvitePage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const { org } = await searchParams;
  return <InviteStep org={org ?? ""} />;
}
