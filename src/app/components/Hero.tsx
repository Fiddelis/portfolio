"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { BoxCard } from "@/components/ui/box-card";
import type { Dictionary } from "@/app/i18n/dictionaries";
import Image from "next/image";

type HeroProps = {
  copy: Dictionary["hero"];
  links: {
    contact: string;
    projects: string;
  };
};

const asciiName = [
    "▀███▀███L   ╟████▌  ╟█████▓▄  ╘██████▄   Å███▀███▌ ▀████L      '████▀   ▄██▀▀██▄",
    " ███╓▄╚█L    │██L    │██L'███  ▐██▌╙╟██─  ███╓▄╨█▌  ╟██─         ███   '██▌▄ ╟██",
    " █████─      │██L    │██L ███  ▐██▌ ╟██─  █████─    ╟██─         ███     '████▄",
    " ███╙╙       │██L    │██L ███  ▐██▌ ╟██─  ███`╙ ▄,  ╟██─  ╓╖     ███    ▄▄, ╙╟██",
    ",███,       ,│██▄,  ,│██▄▓██'  ▄██▌▓██╨  ,███,[██▌ ,╣██▄,███    ▄███,  J██▌,,╟██",
    "▀▀▀▀▀       ╙▀▀▀▀'  ╙▀▀▀▀▀^   '▀▀▀▀▀▀    ╙▀▀▀▀▀▀▀^ ╙▀▀▀▀▀▀▀╙    ▀▀▀▀╙    ╙▀▀▀▀▀",
] as const;

export default function Hero({ copy, links }: HeroProps) {
  const contentItems = [
    { text: copy.cardTitle, kind: "title" as const },
    ...copy.cardBullets.map((item) => ({ text: item, kind: "default" as const })),
    ...copy.cardMeta.map((item) => ({
      text: `${item.label}: ${item.value}`,
      kind: "default" as const,
    })),
  ];
  const tickerItems = contentItems.flatMap((item) => [
    item,
    { text: copy.cardStatus, kind: "status" as const },
  ]);
  const loopItems = [...tickerItems, ...tickerItems];

  return (
    <motion.section
      className="min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <BoxCard>
        <header className="relative isolate overflow-hidden">
          <div className="pointer-events-none absolute right-0 bottom-0 top-28 w-[88%] sm:top-24 sm:w-[62%] lg:top-28 lg:w-[52%]">
            <Image
              src="/gandalf.png"
              alt="Gandalf artwork in ASCII style"
              fill
              priority
              className="gandalf-color-cycle object-contain object-right-bottom mix-blend-multipl opacity-80"
            />
          </div>
          <div className="relative z-10 flex min-h-[68vh] items-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
            <div className="max-w-4xl space-y-5 text-left sm:space-y-6">
              <Badge
                variant="secondary"
                className="w-fit uppercase tracking-[0.2em]"
              >
                {copy.badge}
              </Badge>
              <div className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
                {copy.intro}
              </div>
              <div className="gandalf-color-cycle overflow-x-auto pb-2">
                {asciiName.map((line) => (
                  <pre
                    key={line}
                    className="w-max text-[0.29rem] leading-[1.1] text-primary sm:text-[0.52rem]"
                  >
                    {line}
                  </pre>
                ))}
              </div>
              <div className="text-base font-semibold uppercase tracking-[0.22em] text-foreground sm:text-xl">
                {copy.role}
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-foreground/90 sm:text-base lg:text-lg bg-background border p-5">
                <span className="cursor-target font-semibold text-primary md:whitespace-nowrap">
                  {copy.descriptionHighlight}
                </span>{" "}
                {copy.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="cursor-target">
                  <Link href={links.contact}>{copy.ctaPrimary}</Link>
                </Button>
                <Button asChild variant="outline" className="cursor-target">
                  <Link href={links.projects}>{copy.ctaSecondary}</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="relative z-10 border-t border-border/60 bg-background/70 py-3 sm:py-4">
            <div className="overflow-hidden">
              <motion.div
                className="flex w-max items-center gap-3 whitespace-nowrap px-6 sm:gap-4 sm:px-10 lg:px-12"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 28, ease: "linear", repeat: Infinity }}
              >
                {loopItems.map((item, index) => {
                  const textClass =
                    item.kind === "status"
                      ? "font-bold text-destructive animate-pulse"
                      : item.kind === "title"
                        ? "font-bold text-foreground"
                        : "text-foreground/85";

                  return (
                    <span
                      key={`${item.text}-${index}`}
                      className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] sm:text-sm"
                    >
                      <span className={textClass}>{item.text}</span>
                      <span className={`h-1.5 w-1.5 rounded-full text-destructive flex justify-center items-center`}>!</span>
                    </span>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </header>
      </BoxCard>
    </motion.section>
  );
}
