import { requireUser } from "@/lib/auth";
import { OrganizationStep } from "./organization-step";

export const metadata = { title: "Create your organization — OpenGrep" };

export default async function OnboardingOrgPage() {
  const user = await requireUser();

  // The work-email domain seeds the org name, handle and website, exactly as
  // the reference product does (frame 6).
  const domain = user.email.split("@")[1] ?? "";
  const base = domain.split(".")[0] ?? "";

  return (
    <OrganizationStep
      seed={{
        name: base ? base.charAt(0).toUpperCase() + base.slice(1) : "",
        handle: base,
        website: domain,
      }}
    />
  );
}
