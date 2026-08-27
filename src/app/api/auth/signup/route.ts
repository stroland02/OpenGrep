import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { createSession, hashPassword } from "@/lib/auth";

const Body = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Use at least 8 characters."),
});

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Check your details." },
      { status: 400 },
    );
  }

  const email = parsed.data.email.toLowerCase();

  if (await db.user.findUnique({ where: { email } })) {
    return NextResponse.json(
      { error: "An account with that email already exists." },
      { status: 409 },
    );
  }

  const user = await db.user.create({
    data: {
      email,
      passwordHash: await hashPassword(parsed.data.password),
      // Onboarding asks for the real name on the next step; until then the
      // local part stands in so the UI never renders an empty identity.
      name: email.split("@")[0],
      integrations: { create: { name: "Cursor Cloud Agents" } },
    },
  });

  await createSession(user.id);
  return NextResponse.json({ redirect: "/onboarding" });
}
