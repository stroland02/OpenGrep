import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { db } from "./db";

const COOKIE = "opengrep_session";
const MAX_AGE_DAYS = 30;

export async function hashPassword(plain: string) {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + MAX_AGE_DAYS * 86_400_000);

  await db.session.create({ data: { token, userId, expiresAt } });

  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token) {
    await db.session.deleteMany({ where: { token } });
    jar.delete(COOKIE);
  }
}

/** The signed-in user, or null. Safe to call from any server component. */
export async function getCurrentUser() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;

  const session = await db.session.findUnique({
    where: { token },
    include: {
      user: {
        include: {
          linkedAccounts: true,
          integrations: true,
          memberships: { include: { org: true } },
        },
      },
    },
  });

  if (!session) return null;

  // Expired sessions are cleaned up lazily rather than on a schedule.
  if (session.expiresAt < new Date()) {
    await db.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }

  return session.user;
}

export type CurrentUser = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>;

export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

/**
 * Resolves an org from its URL handle and asserts the current user belongs to
 * it. Every authenticated page under /[org] goes through here, so an outsider
 * guessing a handle gets bounced rather than shown someone else's data.
 */
export async function requireOrg(handle: string) {
  const user = await requireUser();

  const org = await db.organization.findUnique({
    where: { handle },
    include: { reviewSettings: true },
  });
  if (!org) redirect("/");

  const membership = await db.membership.findFirst({
    where: { orgId: org.id, userId: user.id, status: "ACTIVE" },
  });
  if (!membership) redirect("/");

  return { user, org, membership, role: membership.role as "ADMIN" | "MEMBER" };
}

/** Orgs the user can switch between, for the header dropdown. */
export async function listOrgs(userId: string) {
  const memberships = await db.membership.findMany({
    where: { userId, status: "ACTIVE" },
    include: { org: true },
    orderBy: { createdAt: "asc" },
  });
  return memberships.map((m) => m.org);
}
