import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CA House - Accomodation Search System",
  description: "Easy - Fast - Trust",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="shortcut icon" href="logo.png" type="image/png" />
      </head>
      <body className={`antialiased ${inter.className}`}>{children}</body>
    </html>
  );
}
