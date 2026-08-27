import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { slugify, uniqueHandle } from "@/lib/org";

export async function POST(req: Request) {
  const user = await requireUser();
  const parsed = z.object({ name: z.string().min(1).max(80) }).safeParse(await req.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Enter an organization name." }, { status: 400 });
  }

  const name = parsed.data.name.trim();
  const handle = await uniqueHandle(slugify(name));

  const org = await db.organization.create({
    data: {
      name,
      handle,
      trialEndsAt: new Date(Date.now() + 14 * 86_400_000),
      reviewSettings: { create: {} },
      memberships: {
        create: { userId: user.id, email: user.email, role: "ADMIN", status: "ACTIVE" },
      },
    },
  });

  return NextResponse.json({ handle: org.handle, id: org.id });
}
