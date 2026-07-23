import type { Metadata } from "next";
import "./globals.css";
import I18nProvider from "@/components/I18nProvider";
import { ContentProvider } from "@/contexts/ContentContext";

export const metadata: Metadata = {
  title: "Mager Software Solution PLC | Engineering the Digital Future of Africa",
  description: "We build custom software, AI solutions, and cloud platforms that empower businesses across Ethiopia and beyond.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body><I18nProvider><ContentProvider>{children}</ContentProvider></I18nProvider></body>
    </html>
  );
}
