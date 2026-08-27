import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await requireUser();
  const parsed = z.object({ name: z.string().min(1).max(80) }).safeParse(await req.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a name." }, { status: 400 });
  }

  await db.user.update({
    where: { id: user.id },
    data: { name: parsed.data.name.trim() },
  });

  return NextResponse.json({ ok: true });
}
