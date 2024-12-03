import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthModal from "@/components/modal/AuthModal";
import StoreProvider from "@/providers/store-provider";

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
        <link rel="shortcut icon" href="logo-no-text.png" type="image/png" />
      </head>
      <body className={`${inter.className}`}>
        <StoreProvider>
          {children}
          <AuthModal></AuthModal>
        </StoreProvider>
      </body>
    </html>
  );
}
