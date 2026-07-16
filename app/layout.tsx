import type { Metadata } from "next";
import { CANONICAL_PRODUCT_DEFINITION, CURRENT_MATURITY_LEVEL } from "@/lib/product-language";
import "./globals.css";

export const metadata: Metadata = {
  title: `ZIAAP · ${CURRENT_MATURITY_LEVEL} concept demonstrator`,
  description: CANONICAL_PRODUCT_DEFINITION,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
