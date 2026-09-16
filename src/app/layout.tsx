import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YKS Orbit — Çalışma işletim sistemin",
  description: "YKS hazırlığını planla, çalış ve gelişimini gör.",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
