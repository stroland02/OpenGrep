import "server-only";
import { db } from "./db";

/** Org handles are URL segments: lowercase, hyphenated, no leading/trailing dash. */
export function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "org"
  );
}

/**
 * Handles are unique and also form routes, so a collision has to be resolved
 * before insert rather than surfacing as a constraint error.
 */
export async function uniqueHandle(base: string): Promise<string> {
  let candidate = base;
  let n = 2;
  while (await db.organization.findUnique({ where: { handle: candidate } })) {
    candidate = `${base}-${n++}`;
  }
  return candidate;
}

/** Reserved because they would shadow real routes under /[org]. */
const RESERVED = new Set([
  "api",
  "login",
  "signup",
  "logout",
  "settings",
  "onboarding",
  "reset-password",
  "_next",
]);

export function isReservedHandle(handle: string) {
  return RESERVED.has(handle);
}
