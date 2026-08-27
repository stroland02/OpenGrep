import { SurveyStep } from "./survey-step";

export const metadata = { title: "What brought you here — OpenGrep" };

export default async function SurveyPage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const { org } = await searchParams;
  return <SurveyStep org={org ?? ""} />;
}
