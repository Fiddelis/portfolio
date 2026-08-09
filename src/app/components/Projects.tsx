"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import ProjectCard from "./ProjectCard";
import RetroContactBanner from "./RetroContactBanner";
import type { Dictionary } from "@/app/i18n/dictionaries";
import { useGsapReveal } from "@/app/hooks/useGsapReveal";

const projects = [
  {
    id: "kindle2anki",
    title: "Kindle2Anki",
    link: "https://www.kindle2anki.app/",
    imageSrc: "/projects/kindle2anki.png",
    width: 1733,
    height: 907,
  },
  {
    id: "kognilo",
    title: "Kognilo",
    link: "https://kognilo.com/",
    imageSrc: "/projects/kognilo.png",
    width: 1672,
    height: 941,
  },
] as const;

type ProjectsProps = {
  copy: Dictionary["projects"];
  cta: Dictionary["cta"];
};

export default function Projects({ copy, cta }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useGsapReveal(sectionRef, { y: 28, duration: 0.65, start: "top 60%" });

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
          if (mediaContext.conditions?.reduceMotion) return;

          const status = section.querySelector<HTMLElement>(
            "[data-project-status]"
          );
          const statusText = section.querySelector<HTMLElement>(
            "[data-project-status-text]"
          );

          if (status && statusText) {
            const statusPulse = gsap.timeline({
              repeat: -1,
              repeatDelay: 0.35,
            });

            statusPulse
              .to(status, {
                backgroundColor: "transparent",
                borderColor: "transparent",
                duration: 0.14,
                ease: "steps(1)",
              })
              .to(
                statusText,
                {
                  autoAlpha: 0.35,
                  color: "var(--foreground)",
                  duration: 0.14,
                  ease: "steps(1)",
                },
                "<"
              )
              .to(status, {
                backgroundColor: "var(--ticker-signal)",
                borderColor: "var(--foreground)",
                duration: 0.14,
                ease: "steps(1)",
              })
              .to(
                statusText,
                {
                  autoAlpha: 1,
                  color: "var(--foreground)",
                  duration: 0.14,
                  ease: "steps(1)",
                },
                "<"
              );
          }

        }
      );

      return () => media.revert();
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="scroll-mt-20"
    >
      <div className="mb-8 text-center sm:mb-10">
        <div className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {"//"} {copy.archiveLabel}
        </div>
        <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
          {copy.titlePrefix}{" "}
          <span className="text-primary">{copy.titleAccent}</span>
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
          {copy.subtitle}
        </p>
      </div>

      <div className="project-console">
        <div className="project-console__header">
          <div className="flex min-w-0 items-center gap-3">
            <span className="project-console__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="truncate">{copy.consoleLabel}</span>
          </div>
          <span data-project-status className="project-console__status">
            <span data-project-status-text>[{copy.consoleStatus}]</span>
          </span>
        </div>

        <div className="grid items-start gap-7 p-4 sm:p-6 lg:grid-cols-2 lg:gap-8 lg:p-8">
          {projects.map((project, index) => {
            const details = copy.details[project.id];

            return (
              <ProjectCard
                key={project.title}
                number={String(index + 1).padStart(2, "0")}
                projectLabel={copy.projectLabel}
                liveLabel={copy.liveLabel}
                openLabel={copy.openLabel}
                description={details.description}
                tags={details.tags}
                {...project}
              />
            );
          })}
        </div>
      </div>

      <RetroContactBanner copy={cta} />
    </section>
  );
}
