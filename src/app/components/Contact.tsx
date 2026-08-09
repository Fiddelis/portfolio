"use client";

import { useRef } from "react";
import { SiDiscord, SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import { BoxCard, BoxCardContent } from "@/components/ui/box-card";
import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/app/i18n/dictionaries";
import { useGsapReveal } from "@/app/hooks/useGsapReveal";
type ContactProps = {
  copy: Dictionary["contact"];
};

export default function Contact({ copy }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useGsapReveal(sectionRef, { y: 28, duration: 0.65 });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="grid scroll-mt-24 items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] sm:gap-10"
    >
      <div className="space-y-6 text-left">
        <Badge
          variant="secondary"
          className="w-fit uppercase tracking-[0.2em]"
        >
          {copy.badge}
        </Badge>
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
          {copy.title}
        </h2>
        <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
          {copy.description}
        </p>
        <a
          href="mailto:contact@fiddelis.dev"
          className="inline-flex flex-wrap items-center gap-2 text-base font-semibold text-primary transition-colors hover:text-secondary cursor-target sm:text-lg break-all"
        >
          contact@fiddelis.dev
        </a>
      </div>

      <BoxCard className="contact-panel border-2 border-foreground bg-card">
        <BoxCardContent className="space-y-6 p-6 pt-6">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-foreground">
            <span>{copy.socialTitle}</span>
            <span>{copy.socialSubtitle}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href="https://www.linkedin.com/in/lucas-ruan-fidelis"
              className="flex items-center gap-3 border-2 border-foreground/60 bg-background p-3 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-target"
            >
              <SiLinkedin className="h-5 w-5" />
              LinkedIn
            </a>
            <a
              href="https://github.com/Fiddelis"
              className="flex items-center gap-3 border-2 border-foreground/60 bg-background p-3 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-target"
            >
              <SiGithub className="h-5 w-5" />
              GitHub
            </a>
            <a
              href="https://discord.com/users/210895480429871104"
              className="flex items-center gap-3 border-2 border-foreground/60 bg-background p-3 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-target"
            >
              <SiDiscord className="h-5 w-5" />
              Discord
            </a>
            <a
              href="https://www.instagram.com/lucasruan.ff"
              className="flex items-center gap-3 border-2 border-foreground/60 bg-background p-3 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-target"
            >
              <SiInstagram className="h-5 w-5" />
              Instagram
            </a>
          </div>
        </BoxCardContent>
      </BoxCard>
    </section>
  );
}
