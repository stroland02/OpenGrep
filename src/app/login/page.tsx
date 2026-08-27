import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AuthSplit } from "@/components/auth-art";
import { LoginForm } from "./login-form";

export const metadata = { title: "Log in — OpenGrep" };

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) {
    const active = user.memberships.find((m) => m.status === "ACTIVE");
    redirect(active ? `/${active.org.handle}/analytics` : "/onboarding");
  }

  return (
    <AuthSplit>
      <LoginForm />
    </AuthSplit>
  );
}
