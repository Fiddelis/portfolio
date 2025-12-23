import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { cookies, headers } from "next/headers";
import { defaultLocale, isLocale } from "./i18n/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fiddelis",
  description: "Fiddelis Portfolio",
  icons: {
    icon: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
  const localeHeader = (await headers()).get("x-locale") ?? undefined;
  const locale = isLocale(localeHeader || localeCookie)
    ? (localeHeader || localeCookie)
    : defaultLocale;

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative min-h-screen isolate">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="h-full w-full bg-background"></div>
          </div>
          <main className="relative">
            {children}
            <Analytics />
          </main>
        </div>
      </body>
    </html>
  );
}
