import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import store from "@/stores/store";

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
      <body className={`antialiased ${inter.className}`}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}