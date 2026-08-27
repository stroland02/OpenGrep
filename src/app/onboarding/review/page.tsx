import { ReviewWizard } from "./review-wizard";

export const metadata = { title: "Configure reviews — OpenGrep" };

export default async function ReviewConfigPage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const { org } = await searchParams;
  return <ReviewWizard org={org ?? ""} />;
}
