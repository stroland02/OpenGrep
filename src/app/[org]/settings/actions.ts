"use server";

import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireOrg } from "@/lib/auth";
import { isReservedHandle, slugify } from "@/lib/org";

/** Admins only — Members can read settings but not change them. */
async function requireAdmin(handle: string) {
  const ctx = await requireOrg(handle);
  if (ctx.role !== "ADMIN") redirect(`/${handle}/analytics`);
  return ctx;
}

export async function updateOrgDetails(
  handle: string,
  input: { name: string; handle: string },
) {
  const { org } = await requireAdmin(handle);

  const nextHandle = slugify(input.handle);
  if (isReservedHandle(nextHandle)) {
    return { ok: false as const, error: "That handle is reserved." };
  }

  const clash = await db.organization.findFirst({
    where: { handle: nextHandle, NOT: { id: org.id } },
  });
  if (clash) return { ok: false as const, error: "That handle is already taken." };

  await db.organization.update({
    where: { id: org.id },
    data: { name: input.name.trim(), handle: nextHandle },
  });

  // The handle is a route segment, so a change moves the whole settings area.
  revalidatePath(`/${nextHandle}/settings/organization`);
  return { ok: true as const, handle: nextHandle };
}

export async function setOrgToggle(
  handle: string,
  key: "telemetryEnabled" | "featureTipsEnabled",
  value: boolean,
) {
  const { org } = await requireAdmin(handle);
  await db.organization.update({ where: { id: org.id }, data: { [key]: value } });
  revalidatePath(`/${handle}/settings/organization`);
}

export async function deleteOrganization(handle: string, phrase: string) {
  const { org } = await requireAdmin(handle);

  // The gate is a fixed sentence, not the org name (frames 101-102).
  if (phrase !== "confirm deletion of organization") {
    return { ok: false as const, error: "The confirmation phrase does not match." };
  }

  await db.organization.delete({ where: { id: org.id } });
  return { ok: true as const };
}

/* ---------------------------------------------------------------------------
   People
   --------------------------------------------------------------------------- */

export async function inviteMember(
  handle: string,
  email: string,
  role: "ADMIN" | "MEMBER",
) {
  const { org } = await requireAdmin(handle);

  const parsed = z.string().email().safeParse(email.trim().toLowerCase());
  if (!parsed.success) return { ok: false as const, error: "Enter a valid email." };

  const existing = await db.membership.findFirst({
    where: { orgId: org.id, email: parsed.data },
  });
  if (existing) return { ok: false as const, error: "That person is already invited." };

  // If the invitee already has an account, link the membership straight to it.
  const user = await db.user.findUnique({ where: { email: parsed.data } });

  await db.membership.create({
    data: {
      orgId: org.id,
      email: parsed.data,
      userId: user?.id ?? null,
      role,
      status: "PENDING",
    },
  });

  revalidatePath(`/${handle}/settings/people`);
  return { ok: true as const };
}

export async function updateMemberRole(
  handle: string,
  membershipId: string,
  role: "ADMIN" | "MEMBER",
) {
  const { org } = await requireAdmin(handle);
  await db.membership.updateMany({
    where: { id: membershipId, orgId: org.id },
    data: { role },
  });
  revalidatePath(`/${handle}/settings/people`);
}

export async function removeMember(handle: string, membershipId: string) {
  const { org, user } = await requireAdmin(handle);

  const membership = await db.membership.findFirst({
    where: { id: membershipId, orgId: org.id },
  });
  // Self-management is disallowed — the "You" row has no actions menu.
  if (!membership || membership.userId === user.id) return;

  await db.membership.delete({ where: { id: membership.id } });
  revalidatePath(`/${handle}/settings/people`);
}

/* ---------------------------------------------------------------------------
   API keys
   --------------------------------------------------------------------------- */

export async function createApiKey(handle: string, name: string) {
  const { org } = await requireAdmin(handle);
  if (!name.trim()) return { ok: false as const, error: "Give the key a name." };

  // Shown once, stored hashed; the table keeps only a truncated prefix.
  const secret = `og_live_${randomBytes(24).toString("base64url")}`;

  await db.apiKey.create({
    data: {
      orgId: org.id,
      name: name.trim(),
      prefix: secret.slice(0, 20),
      keyHash: await bcrypt.hash(secret, 10),
    },
  });

  revalidatePath(`/${handle}/settings/api-keys`);
  return { ok: true as const, secret };
}

export async function revokeApiKey(handle: string, id: string) {
  const { org } = await requireAdmin(handle);
  await db.apiKey.deleteMany({ where: { id, orgId: org.id } });
  revalidatePath(`/${handle}/settings/api-keys`);
}

/* ---------------------------------------------------------------------------
   Billing
   --------------------------------------------------------------------------- */

export async function addPaymentMethod(
  handle: string,
  input: { number: string; expMonth: number; expYear: number; country: string },
) {
  const { org } = await requireAdmin(handle);

  const digits = input.number.replace(/\D/g, "");
  if (!luhn(digits)) {
    return { ok: false as const, error: "Your card number is invalid." };
  }

  // OpenGrep contacts no processor. The card is recorded so the UI has
  // something real to show; nothing is ever charged.
  await db.paymentMethod.create({
    data: {
      orgId: org.id,
      brand: brandOf(digits),
      last4: digits.slice(-4),
      expMonth: input.expMonth,
      expYear: input.expYear,
      country: input.country,
    },
  });

  revalidatePath(`/${handle}/settings/billing`);
  return { ok: true as const };
}

export async function removePaymentMethod(handle: string, id: string) {
  const { org } = await requireAdmin(handle);
  await db.paymentMethod.deleteMany({ where: { id, orgId: org.id } });
  revalidatePath(`/${handle}/settings/billing`);
}

function luhn(digits: string): boolean {
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = digits.charCodeAt(i) - 48;
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
}

function brandOf(digits: string): string {
  if (/^4/.test(digits)) return "VISA";
  if (/^5[1-5]/.test(digits)) return "MASTERCARD";
  if (/^3[47]/.test(digits)) return "AMEX";
  if (/^6(?:011|5)/.test(digits)) return "DISCOVER";
  if (/^35/.test(digits)) return "JCB";
  return "CARD";
}
