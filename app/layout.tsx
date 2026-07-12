import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZIAAP · AI-native dispute governance",
  description: "A synthetic, simulation-only showcase of dispute governance configured before conflict and applied under independent human review.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
