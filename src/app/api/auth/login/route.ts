import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { createSession, verifyPassword } from "@/lib/auth";

const Body = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter an email and password." }, { status: 400 });
  }

  const { email, password } = parsed.data;
  const user = await db.user.findUnique({
    where: { email: email.toLowerCase() },
    include: { memberships: { include: { org: true } } },
  });

  // Same message either way — telling an attacker which half was wrong hands
  // them a way to enumerate accounts.
  const invalid = NextResponse.json(
    { error: "That email and password combination is not recognised." },
    { status: 401 },
  );

  if (!user) return invalid;
  if (!(await verifyPassword(password, user.passwordHash))) return invalid;

  await createSession(user.id);

  const active = user.memberships.find((m) => m.status === "ACTIVE");
  return NextResponse.json({
    redirect: active ? `/${active.org.handle}/analytics` : "/onboarding/organization",
  });
}
