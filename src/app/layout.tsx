import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import { ToastProvider } from "@/components/ui";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OpenGrep",
  description:
    "The AI Code Reviewer. AI agents that review and test pull requests with full context of the codebase.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Browser extensions commonly stamp attributes onto <html> and <body>
    // between the server HTML arriving and React hydrating, which React then
    // reports as a mismatch. suppressHydrationWarning applies to these two
    // elements' own attributes only — one level deep — so genuine mismatches
    // anywhere inside the app are still reported.
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        style={{
          fontFamily: "var(--font-jakarta), system-ui, sans-serif",
        }}
      >
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
