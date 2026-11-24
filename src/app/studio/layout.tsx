import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legacy Studio",
  description: "Preserved Iteration 13 migration and recovery surface.",
  robots: { index: false, follow: false, noarchive: true }
};

export default function LegacyStudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
