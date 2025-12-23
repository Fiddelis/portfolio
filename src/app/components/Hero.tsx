"use client";
import DecryptedText from "@/components/DecryptedText";
import LogoLoop from "@/components/LogoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiPython,
  SiSpring,
  SiMysql,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Dictionary } from "@/app/i18n/dictionaries";

type HeroProps = {
  copy: Dictionary["hero"];
  links: {
    contact: string;
    projects: string;
  };
};

export default function Hero({ copy, links }: HeroProps) {
  const techLogos = [
    {
      node: <SiReact className="cursor-target" />,
      title: "React",
      href: "https://react.dev",
    },
    {
      node: <SiNextdotjs className="cursor-target" />,
      title: "Next.js",
      href: "https://nextjs.org",
    },
    {
      node: <SiTypescript className="cursor-target" />,
      title: "TypeScript",
      href: "https://www.typescriptlang.org",
    },
    {
      node: <SiPython className="cursor-target" />,
      title: "Python",
      href: "https://www.python.org/",
    },
    {
      node: <SiSpring className="cursor-target" />,
      title: "Spring",
      href: "https://spring.io/",
    },
    {
      node: <SiMysql className="cursor-target" />,
      title: "MySQL",
      href: "https://www.mysql.com/",
    },
    {
      node: <FaJava className="cursor-target" />,
      title: "Java",
      href: "https://www.java.com/pt-BR/",
    },
  ];

  return (
    <motion.section
      className="flex flex-col gap-8 pt-24 sm:gap-12 sm:pt-28"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] sm:gap-12">
        <div className="space-y-5 text-left sm:space-y-6">
          <Badge
            variant="secondary"
            className="w-fit uppercase tracking-[0.2em]"
          >
            {copy.badge}
          </Badge>
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              {copy.intro}
            </div>
            <div className="mt-3 text-4xl font-bold text-foreground sm:text-6xl lg:text-7xl">
              <span className="cursor-target text-primary">Fiddelis.</span>
            </div>
            <DecryptedText
              parentClassName="mt-3 text-xl text-foreground font-semibold sm:text-2xl lg:text-3xl"
              speed={60}
              maxIterations={10}
              text={copy.role}
              sequential={true}
              animateOn="view"
              revealDirection="center"
            />
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
            <span className="cursor-target text-primary font-semibold md:whitespace-nowrap">
              {copy.descriptionHighlight}
            </span>{" "}
            {copy.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild className="cursor-target">
              <Link href={`#contact`}>{copy.ctaPrimary}</Link>
            </Button>
          </div>
        </div>

        <Card className="border border-border/60 bg-card/70 shadow-lg backdrop-blur">
          <CardContent className="space-y-5 p-5 sm:space-y-6 sm:p-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span>{copy.cardTitle}</span>
              <span className="text-primary font-semibold">
                {copy.cardStatus}
              </span>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {copy.cardBullets.map((item, index) => {
                const dotClass =
                  index === 0
                    ? "bg-primary"
                    : index === 1
                      ? "bg-accent"
                      : "bg-secondary";
                return (
                  <li key={item} className="flex items-start gap-3">
                    <span className={`mt-2 h-2 w-2 rounded-full ${dotClass}`} />
                    {item}
                  </li>
                );
              })}
            </ul>
            <div className="grid gap-3 sm:grid-cols-2">
              {copy.cardMeta.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-border/60 bg-background/60 p-3"
                >
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {item.label}
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div
        className="relative overflow-hidden backdrop-blur"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <LogoLoop
          logos={techLogos}
          className="text-foreground"
          speed={120}
          direction="left"
          logoHeight={48}
          gap={40}
          pauseOnHover
          scaleOnHover
          ariaLabel={copy.logosAria}
        />
      </div>
    </motion.section>
  );
}
