import { cn } from "@/lib/utils";

/**
 * The OpenGrep mark: an isometric cube on a mint tile, echoing the reference
 * product's diamond/box logo.
 */
export function Logo({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[6px] bg-brand",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg
        width={size * 0.62}
        height={size * 0.62}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path d="M12 2.5 21 7.6v8.8L12 21.5 3 16.4V7.6L12 2.5Z" fill="#0d2b1e" />
        <path d="M12 7 16.6 9.6v5.2L12 17.4 7.4 14.8V9.6L12 7Z" fill="#2ee59d" />
      </svg>
    </span>
  );
}

export function LogoWord({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Logo size={30} />
      <span className="text-[20px] font-bold tracking-tight text-ink">OpenGrep</span>
    </span>
  );
}
