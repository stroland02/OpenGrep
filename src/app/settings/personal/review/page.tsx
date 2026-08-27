import { requireUser } from "@/lib/auth";
import { ReviewSettings } from "./review-settings";

export const metadata = { title: "Review Settings — OpenGrep" };

export default async function PersonalReviewPage() {
  const user = await requireUser();

  return (
    <ReviewSettings
      linked={user.linkedAccounts.length > 0}
      prefs={{
        showAiFixPrompts: user.showAiFixPrompts,
        personalSummary: user.personalSummary,
        personalSummaryOpen: user.personalSummaryOpen,
        personalIssuesTable: user.personalIssuesTable,
      }}
    />
  );
}
