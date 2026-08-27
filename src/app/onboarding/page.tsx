import { requireUser } from "@/lib/auth";
import { NameStep } from "./name-step";

export const metadata = { title: "Welcome — OpenGrep" };

export default async function OnboardingNamePage() {
  const user = await requireUser();
  // The signup route seeds the name from the email's local part, which is a
  // placeholder rather than something the user typed.
  const seeded = user.email.split("@")[0];
  return <NameStep initial={user.name === seeded ? "" : user.name} />;
}
