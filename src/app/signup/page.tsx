import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AuthSplit } from "@/components/auth-art";
import { SignupForm } from "./signup-form";

export const metadata = { title: "Create an account — OpenGrep" };

export default async function SignupPage() {
  if (await getCurrentUser()) redirect("/onboarding");

  return (
    <AuthSplit>
      <SignupForm />
    </AuthSplit>
  );
}
