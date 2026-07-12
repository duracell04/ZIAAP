import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZIAAP · AI-native arbitrator",
  description: "Jointly configure, test, freeze, and appoint a ZIAAP-powered arbitrator.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
