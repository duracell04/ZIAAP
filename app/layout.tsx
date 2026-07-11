import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZIAAP · Zero-instance alignment",
  description: "Bilateral contract alignment before conflict.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
