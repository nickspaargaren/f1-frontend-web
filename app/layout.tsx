import "../styles/globals.css";

import { Metadata } from "next";
import Script from "next/script";

import { useTranslation } from "@/helpers/useTranslation";

const { t } = useTranslation();

export const metadata: Metadata = {
  title: t("F1times", { version: "22" }),
  description: "Circuits",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="nl-NL">
      <Script
        defer
        data-domain="racetijden.nl"
        src="/js/script.js"
        strategy="afterInteractive"
      />
      <body>{children}</body>
    </html>
  );
}
