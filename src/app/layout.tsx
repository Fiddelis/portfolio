import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { defaultLocale } from "./i18n/config";
import { LocaleProvider } from "./i18n/LocaleProvider";

const dosVga = localFont({
  src: "../../public/Perfect DOS VGA 437.ttf",
  variable: "--font-dos-vga",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fiddelis",
  description: "Fiddelis Portfolio",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultLocale} suppressHydrationWarning>
      <body className={dosVga.variable}>
        <LocaleProvider>
          <div className="relative min-h-[100svh] isolate">
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <div className="h-full w-full site-diagonal-bg"></div>
            </div>
            <main className="relative min-h-[100svh]">
              {children}
              <Analytics />
              <SpeedInsights />
            </main>
            <Script
              src="https://static.cloudflareinsights.com/beacon.min.js"
              strategy="afterInteractive"
              data-cf-beacon='{"token":"ac1871303eca478484cd423bebb2de99","spa":true}'
              suppressHydrationWarning
            />
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
