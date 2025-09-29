import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GradualBlurMemo from "@/components/GradualBlur";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <GradualBlurMemo
          target="page"
          position="bottom"
          height="6rem"
          strength={5}
          divCount={5}
          curve="bezier"
          exponential={true}
          opacity={1}
        />
        {children}
      </body>
    </html>
  );
}
