import type { Metadata } from "next";
import { clashGrotesk, satoshi } from "@/lib/fonts";
import "./globals.css";
import rawContent from "@/content.json";

export const metadata: Metadata = {
  title: rawContent.meta?.title || "Coding Mafia | Crack Your Dream Tech Job with Us",
  description: rawContent.meta?.description || "Coding Mafia 6-Month Career Accelerator",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${clashGrotesk.variable} ${satoshi.variable}`}>
      <body className="antialiased min-h-screen text-[var(--body)] bg-[var(--surface)] font-[family-name:var(--font-body)]">
        {children}
      </body>
    </html>
  );
}
