import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { cookies, headers } from "next/headers";
import { defaultLocale, isLocale } from "./i18n/config";

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
      <body className={dosVga.variable}>
        <div className="relative min-h-screen isolate">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="h-full w-full site-diagonal-bg"></div>
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
