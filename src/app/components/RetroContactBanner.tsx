"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import type { Dictionary } from "@/app/i18n/dictionaries";

type RetroContactBannerProps = {
  copy: Dictionary["cta"];
};

export default function RetroContactBanner({ copy }: RetroContactBannerProps) {
  const bannerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          noPreference: "(prefers-reduced-motion: no-preference)",
        },
        (mediaContext) => {
          if (mediaContext.conditions?.reduceMotion) return;

          const alertTimeline = gsap.timeline({
            repeat: -1,
            repeatDelay: 0.8,
            defaults: { ease: "steps(1)" },
          });

          alertTimeline
            .to("[data-retro-beacon]", {
              autoAlpha: 1,
              scale: 1.08,
              duration: 0.16,
              stagger: 0.08,
            })
            .to(
              banner,
              {
                borderColor: "var(--ticker-signal)",
                duration: 0.16,
              },
              "<"
            )
            .to(
              "[data-retro-alert-label]",
              {
                backgroundColor: "var(--ticker-signal)",
                color: "var(--foreground)",
                duration: 0.16,
              },
              "<"
            )
            .to("[data-retro-beacon]", {
              autoAlpha: 0.32,
              scale: 0.9,
              duration: 0.2,
              stagger: 0.08,
            })
            .to(
              banner,
              {
                borderColor: "var(--foreground)",
                duration: 0.16,
              },
              "<"
            )
            .to(
              "[data-retro-alert-label]",
              {
                backgroundColor: "transparent",
                color: "var(--ticker-signal)",
                duration: 0.16,
              },
              "<"
            );
        }
      );

      return () => media.revert();
    }, banner);

    return () => context.revert();
  }, []);

  return (
    <aside ref={bannerRef} className="retro-contact-banner" aria-label={copy.title}>
      <div className="retro-contact-banner__beacons" aria-hidden="true">
        <svg
          data-retro-beacon
          className="retro-contact-banner__beacon"
          viewBox="0 0 64 56"
          focusable="false"
        >
          <path d="M32 3 62 53H2L32 3Z" fill="currentColor" />
          <path d="M32 14 53 49H11L32 14Z" fill="var(--foreground)" />
          <path d="M29 23h6v14h-6zM29 42h6v6h-6z" fill="currentColor" />
        </svg>
        <span data-retro-beacon className="retro-contact-banner__signal">
          !
        </span>
      </div>

      <div className="relative z-10 min-w-0">
        <p data-retro-alert-label className="retro-contact-banner__label">
          {"//"} contact_channel.open
        </p>
        <h3 className="m-0 text-xl font-bold uppercase leading-tight text-secondary-foreground sm:text-2xl">
          {copy.title}
        </h3>
        <p className="mt-3 max-w-2xl text-sm text-secondary-foreground/90 sm:text-base">
          {copy.description}
        </p>
      </div>

      <Link href="#contact" className="retro-contact-banner__action cursor-target">
        {copy.button} <span aria-hidden="true">▶</span>
      </Link>
    </aside>
  );
}
