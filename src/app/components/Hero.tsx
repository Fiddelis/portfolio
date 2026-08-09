"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { BoxCard } from "@/components/ui/box-card";
import type { Dictionary } from "@/app/i18n/dictionaries";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGsapReveal } from "@/app/hooks/useGsapReveal";

type HeroProps = {
  copy: Dictionary["hero"];
  links: {
    resume: string;
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
  const sectionRef = useRef<HTMLElement>(null);
  const tickerTrackRef = useRef<HTMLDivElement>(null);
  const contentItems = [
    ...copy.cardBullets.map((item) => ({ text: item, kind: "default" as const })),
    ...copy.cardMeta.map((item) => ({
      text: `${item.label}: ${item.value}`,
      kind: "default" as const,
    })),
  ];
  const loopItems = [...contentItems, ...contentItems];

  useGsapReveal(sectionRef, { y: 20, duration: 0.8, start: "top 90%" });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          noPreference: "(prefers-reduced-motion: no-preference)",
        },
        (mediaContext) => {
          if (mediaContext.conditions?.reduceMotion) {
            gsap.set("[data-gandalf-cycle]", { "--gandalf-hue": "0deg" });
            return;
          }

          if (tickerTrackRef.current) {
            const ticker = tickerTrackRef.current;
            const loopWidth = ticker.scrollWidth / 2;

            if (loopWidth > 0) {
              const wrapX = gsap.utils.wrap(-loopWidth, 0);

              gsap.set(ticker, { x: 0 });
              gsap.to(ticker, {
                x: -loopWidth,
                duration: Math.max(12, loopWidth / 80),
                ease: "steps(120)",
                repeat: -1,
                overwrite: "auto",
                modifiers: {
                  x: (value) => `${wrapX(Number.parseFloat(value))}px`,
                },
              });
            }
          }

          gsap.to("[data-gandalf-cycle]", {
            "--gandalf-hue": "360deg",
            duration: 6,
            ease: "none",
            repeat: -1,
          });
        }
      );

      return () => media.revert();
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full">
      <BoxCard className="hero-card">
        <header className="relative isolate overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[72%] sm:block lg:w-[58%]">
            <Image
              src="/gandalf.png"
              alt=""
              fill
              priority
              data-gandalf-cycle
              className="gandalf-color-cycle object-contain object-right-bottom"
            />
          </div>
          <div className="relative z-10 flex min-h-[500px] items-center px-5 py-8 sm:min-h-[540px] sm:px-10 sm:py-10 lg:min-h-[570px] lg:px-12">
            <div className="hero-copy max-w-3xl space-y-5 text-left sm:space-y-6">
              <Badge
                variant="secondary"
                className="w-fit border border-secondary-foreground/35 uppercase tracking-[0.2em]"
              >
                {copy.badge}
              </Badge>
              <h1 className="sr-only">Lucas Ruan Fiddelis - {copy.role}</h1>
              <div
                data-gandalf-cycle
                className="gandalf-color-cycle notranslate overflow-x-auto pb-2"
                translate="no"
                lang="zxx"
                dir="ltr"
              >
                {asciiName.map((line) => (
                  <pre
                    key={line}
                    className="w-max text-[0.32rem] leading-[1.1] text-primary sm:text-[0.55rem]"
                    translate="no"
                  >
                    {line}
                  </pre>
                ))}
              </div>
              <div className="text-base font-semibold uppercase tracking-[0.22em] text-foreground sm:text-xl">
                {copy.role}
              </div>
              <p className="hero-description max-w-2xl text-sm leading-relaxed text-foreground sm:text-base lg:text-lg">
                {copy.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="cursor-target">
                  <Link href={links.resume} target="_blank" rel="noreferrer">
                    {copy.ctaPrimary}
                  </Link>
                </Button>
                <Button asChild variant="outline" className="cursor-target">
                  <Link href={links.projects}>{copy.ctaSecondary}</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="hero-ticker relative z-10 border-t-2 border-foreground py-3 sm:py-4">
            <p className="sr-only">
              {contentItems.map((item) => item.text).join(", ")}
            </p>
            <div className="overflow-hidden" aria-hidden="true">
              <div
                ref={tickerTrackRef}
                className="flex w-max items-center gap-3 whitespace-nowrap px-6 sm:gap-4 sm:px-10 lg:px-12"
              >
                {loopItems.map((item, index) => {
                  const textClass = "text-secondary-foreground/90";

                  return (
                    <span
                      key={`${item.text}-${index}`}
                      className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] sm:text-sm"
                    >
                      <span className={textClass}>{item.text}</span>
                      <span className="hero-ticker-divider" aria-hidden="true">
                        {"//"}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </header>
      </BoxCard>
    </section>
  );
}
