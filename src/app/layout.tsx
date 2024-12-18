import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthModal from "@/components/auth/auth-modal";
import StoreProvider from "@/providers/store-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
  const queryClient = new QueryClient();

  return (
    <html lang="vi">
      <head>
        <link rel="shortcut icon" href="/logo-no-text.png" type="image/png" />
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className}`}>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            {children}
            <AuthModal />
          </QueryClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
