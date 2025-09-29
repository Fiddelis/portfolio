import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DotGrid from "@/components/DotGrid";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative min-h-screen isolate">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="h-full w-full bg-background">
              <DotGrid
                dotSize={3}
                gap={10}
                baseColor="#EDE9EE"
                activeColor="#2E033E"
                proximity={180}
                shockRadius={250}
                shockStrength={10}
                resistance={800}
                returnDuration={0.5}
              />
            </div>
          </div>
          <main className="relative pt-24 px-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
