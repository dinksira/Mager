import type { Metadata } from "next";
import "./globals.css";
import I18nProvider from "./I18nProvider";
import SessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "Mager Admin",
  description: "Admin panel for Mager Software Solution PLC",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body>
        <SessionProvider>
          <I18nProvider>{children}</I18nProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
