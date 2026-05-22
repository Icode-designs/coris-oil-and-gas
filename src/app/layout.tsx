import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coris Oil & Gas | LPG Supply & Gas Installation in Port Harcourt",
  description:
    "Coris Oil & Gas — Your trusted LPG supplier and gas installation experts in Port Harcourt, Nigeria. Safe, certified, and reliable LPG distribution, gas fittings, industrial solutions, and accessories for homes, restaurants, hotels, and industries.",
  keywords: [
    "LPG supply Port Harcourt",
    "gas installation services Nigeria",
    "LPG accessories",
    "industrial gas solutions",
    "gas equipment supplier Nigeria",
    "cooking gas delivery Port Harcourt",
    "gas cylinder supplier",
    "Coris Oil Gas",
  ],
  openGraph: {
    title: "Coris Oil & Gas | Safe & Reliable LPG Solutions",
    description:
      "Professional gas installation & LPG supply you can trust. Serving homes, restaurants, hotels and industries across Port Harcourt.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
