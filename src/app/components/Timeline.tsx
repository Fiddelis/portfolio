"use client";

import * as React from "react";
import { ExternalLink, MapPin, Briefcase, Calendar } from "lucide-react";
import {
  BoxCard,
  BoxCardContent,
  BoxCardHeader,
  BoxCardTitle,
} from "@/components/ui/box-card";
import { Badge } from "@/components/ui/badge";
import { useGsapReveal } from "@/app/hooks/useGsapReveal";
import { gsap } from "gsap";

export type TimelineItem = {
  company: string;
  role: string;
  start: string | Date;
  end?: string | Date | null;
  location?: string;
  description?: string;
  tech?: string[];
  url?: string;
};

export type TimelineProps = {
  items: TimelineItem[];
  density?: "comfortable" | "compact";
  accentClassName?: string;
  showYearHeaders?: boolean;
  locale?: string;
  labels?: {
    archiveLabel: string;
    titleEmphasis: string;
    titleRest: string;
    visitSite: string;
    present: string;
  };
};

// ===================== Helpers =====================
function toLabel(d: string | Date | null | undefined, locale?: string) {
  if (!d) return undefined;
  const date = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(date.getTime())) return String(d);
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
  }).format(date);
}

function groupByYear(items: TimelineItem[]) {
  const map = new Map<string, TimelineItem[]>();
  for (const it of items) {
    const year =
      (typeof it.start === "string"
        ? (it.start.match(/\d{4}/)?.[0] ?? "")
        : new Date(it.start).getFullYear().toString()) || "";
    const arr = map.get(year) ?? [];
    arr.push(it);
    map.set(year, arr);
  }
  return Array.from(map.entries())
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, nodes]) => ({ year, nodes }));
}

// ===================== UI =====================
function Dot({ accentClassName }: { accentClassName?: string }) {
  return (
    <div className="relative z-10">
      {/* maior no mobile, padrão no >=sm */}
      <div
        className={`h-3 w-3 sm:h-2 sm:w-2 border bg-background ${
          accentClassName ?? "border-primary"
        }`}
      />
      <div
        className={`absolute -inset-2 sm:-inset-1 opacity-25 ${
          accentClassName ?? "bg-primary"
        }`}
      />
    </div>
  );
}

function TimelineLine({
  accentClassName,
}: {
  accentClassName?: string;
}) {
  const lineClassName =
    accentClassName?.replace(/\bbg-/g, "text-") ?? "text-primary";

  return (
    <div
      className="timeline-line absolute left-0 top-0 h-full"
      aria-hidden="true"
    >
      <svg
        className={lineClassName}
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        focusable="false"
      >
        <g data-timeline-segments />
      </svg>
    </div>
  );
}

function HeaderRow({
  item,
  density,
  presentLabel,
  locale,
}: {
  item: TimelineItem;
  density: TimelineProps["density"];
  presentLabel: string;
  locale?: string;
}) {
  const start = toLabel(item.start, locale);
  const end = toLabel(item.end, locale) ?? presentLabel;
  return (
    <div
      className={`flex flex-wrap items-center gap-1.5 ${
        density === "compact"
          ? "text-xs sm:text-xs"
          : "text-sm sm:text-base"
      }`}
    >
      <span className="inline-flex items-center gap-1 text-muted-foreground">
        <Calendar className="h-4 w-4 sm:h-3 sm:w-3" />
        {start} - {end}
      </span>
      <span className="hidden sm:block">*</span>
      {item.location && (
        <span className="inline-flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-4 w-4 sm:h-3 sm:w-3" />
          {item.location}
        </span>
      )}
    </div>
  );
}

function TechBadges({ tech }: { tech?: string[] }) {
  if (!tech?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tech.map((t, i) => (
        <Badge key={i} className="px-2 py-0.5 text-[0.7rem] sm:text-xs">
          {t}
        </Badge>
      ))}
    </div>
  );
}

function ItemCard({
  item,
  density,
  visitSiteLabel,
  presentLabel,
  locale,
}: {
  item: TimelineItem;
  density: TimelineProps["density"];
  visitSiteLabel: string;
  presentLabel: string;
  locale?: string;
}) {
  const headerClass =
    density === "compact" ? "px-4 pt-3 pb-2" : "px-6 pt-6 pb-2";
  const contentClass =
    density === "compact" ? "px-4 pb-3 pt-0" : "px-6 pb-6 pt-0";

  return (
    <BoxCard
      className="timeline-card border-2 border-foreground/80 bg-card"
      data-timeline-item
    >
      <BoxCardHeader className={headerClass}>
        <BoxCardTitle className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:text-[0.9rem]">
          <span className="inline-flex items-center gap-1">
            {/* maior no mobile */}
            <Briefcase className="h-5 w-5 sm:h-4 sm:w-4 max-md:hidden" />
            <span className="leading-none">{item.role}</span>
          </span>
          <span className="text-muted-foreground">@ {item.company}</span>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="max-md:hidden ml-auto inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4 sm:h-3 sm:w-3" />{" "}
              {visitSiteLabel}
            </a>
          )}
        </BoxCardTitle>
        <HeaderRow
          item={item}
          density={density}
          presentLabel={presentLabel}
          locale={locale}
        />
      </BoxCardHeader>
      <BoxCardContent className={contentClass}>
        {item.description && (
          <p className="text-left mb-2 text-[0.9rem] sm:text-sm leading-relaxed">
            {item.description}
          </p>
        )}
        <TechBadges tech={item.tech} />
      </BoxCardContent>
    </BoxCard>
  );
}

export function Timeline({
  items,
  density = "comfortable",
  accentClassName,
  showYearHeaders = true,
  locale,
  labels,
}: TimelineProps) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const railRef = React.useRef<HTMLDivElement>(null);
  useGsapReveal(sectionRef, { y: 28, duration: 0.65 });

  React.useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      const rail = railRef.current;
      const line = rail?.querySelector<HTMLElement>(".timeline-line");
      const segmentsGroup = rail?.querySelector<SVGGElement>(
        "[data-timeline-segments]"
      );
      const svg = segmentsGroup?.ownerSVGElement;

      const updateLine = () => {
        if (!rail || !line || !segmentsGroup || !svg) return;

        const railRect = rail.getBoundingClientRect();
        const lineWidth = Math.max(line.clientWidth, 1);
        const lineHeight = Math.max(railRect.height, 1);
        const dots = Array.from(
          rail.querySelectorAll<HTMLElement>("[data-timeline-dot]")
        );
        const points = dots.map((dot) => {
          const rect = dot.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2 - railRect.left,
            y: rect.top + rect.height / 2 - railRect.top,
          };
        });

        svg.setAttribute("viewBox", `0 0 ${lineWidth} ${lineHeight}`);
        if (!points.length) return;

        const lastPoint = points[points.length - 1];
        const segmentPoints = [
          { from: { x: points[0].x, y: 0 }, to: points[0] },
          ...points.slice(1).map((point, index) => ({
            from: points[index],
            to: point,
          })),
          { from: lastPoint, to: { x: lastPoint.x, y: lineHeight } },
        ];
        const existingSegments = Array.from(
          segmentsGroup.querySelectorAll<SVGPathElement>(
            "[data-timeline-segment]"
          )
        );
        segmentPoints.forEach((segment, index) => {
          const segmentPath =
            existingSegments[index] ??
            document.createElementNS("http://www.w3.org/2000/svg", "path");

          segmentPath.setAttribute("data-timeline-segment", String(index));
          segmentPath.setAttribute(
            "d",
            `M ${segment.from.x} ${segment.from.y} L ${segment.to.x} ${segment.to.y}`
          );
          segmentPath.setAttribute("fill", "none");
          segmentPath.setAttribute("stroke", "currentColor");
          segmentPath.setAttribute("stroke-linecap", "round");
          segmentPath.setAttribute("stroke-linejoin", "miter");
          segmentPath.setAttribute("stroke-width", "2");
          segmentPath.setAttribute("vector-effect", "non-scaling-stroke");

          if (!existingSegments[index]) {
            segmentPath.style.opacity = "0";
            segmentsGroup.append(segmentPath);
          }
        });

        while (segmentsGroup.children.length > segmentPoints.length) {
          segmentsGroup.lastElementChild?.remove();
        }

      };

      updateLine();
      const updateTimer = window.setTimeout(() => {
        updateLine();
        ScrollTrigger.refresh();
      }, 0);
      const handleResize = () => {
        updateLine();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", handleResize);

      media.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          noPreference: "(prefers-reduced-motion: no-preference)",
        },
        (mediaContext) => {
          const cards = Array.from(
            section.querySelectorAll<HTMLElement>("[data-timeline-item]")
          );
          const dots = Array.from(
            section.querySelectorAll<HTMLElement>("[data-timeline-dot]")
          );
          const segments = Array.from(
            section.querySelectorAll<SVGPathElement>(
              "[data-timeline-segment]"
            )
          );

          if (mediaContext.conditions?.reduceMotion) {
            gsap.set([...cards, ...dots], { autoAlpha: 1, scale: 1, y: 0 });
            segments.forEach((segment) => {
              segment.style.opacity = "1";
            });
            return;
          }

          cards.forEach((card, index) => {
            const dot = dots[index];
            if (!dot) return;
            const segment = segments[index];

            const reveal = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                // Reveal every point as soon as its card enters the viewport;
                // the final cards otherwise cannot reach the old 84% trigger.
                start: "top 72%",
                toggleActions: "play none none none",
              },
            });

            if (segment) {
              reveal.to(
                segment,
                {
                  opacity: 1,
                  duration: 0.08,
                  ease: "steps(1)",
                },
                0
              );
            }

            if (index === cards.length - 1) {
              const tail = segments[segments.length - 1];
              if (tail && tail !== segment) {
                reveal.to(
                  tail,
                  { opacity: 1, duration: 0.08, ease: "steps(1)" },
                  0
                );
              }
            }

            reveal
              .fromTo(
                dot,
                { autoAlpha: 0, scale: 0.35 },
                {
                  autoAlpha: 1,
                  scale: 1.16,
                  duration: 0.12,
                  ease: "steps(2)",
                },
                0
              )
              .to(
                dot,
                {
                  scale: 1,
                  duration: 0.05,
                  ease: "steps(1)",
                },
                0.12
              )
              .fromTo(
                card,
                {
                  autoAlpha: 0,
                  scale: 0.78,
                  y: 14,
                  rotation: -1,
                  transformOrigin: "center bottom",
                },
                {
                  autoAlpha: 1,
                  scale: 1.06,
                  y: 0,
                  rotation: 0,
                  duration: 0.16,
                  ease: "steps(2)",
                },
                0.04
              )
              .to(
                card,
                {
                  scale: 1,
                  duration: 0.06,
                  ease: "steps(1)",
                },
                0.2
              );
          });
        }
      );

      return () => {
        window.clearTimeout(updateTimer);
        window.removeEventListener("resize", handleResize);
        media.revert();
      };
    }, section);

    return () => context.revert();
  }, []);

  const sorted = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const da =
        typeof a.start === "string"
          ? Date.parse(a.start)
          : new Date(a.start).getTime();
      const db =
        typeof b.start === "string"
          ? Date.parse(b.start)
          : new Date(b.start).getTime();
      return db - da;
    });
  }, [items]);

  const groups = React.useMemo(
    () =>
      showYearHeaders ? groupByYear(sorted) : [{ year: "", nodes: sorted }],
    [sorted, showYearHeaders]
  );

  const archiveLabel = labels?.archiveLabel ?? "Where I've worked";
  const titleEmphasis = labels?.titleEmphasis ?? "Career";
  const titleRest = labels?.titleRest ?? "Timeline";
  const visitSiteLabel = labels?.visitSite ?? "Visit site";
  const presentLabel = labels?.present ?? "Present";

  return (
    <section
      ref={sectionRef}
      className="flex flex-col gap-6 sm:gap-8 text-center"
    >
      <div className="text-center">
        <div className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {"//"} {archiveLabel}
        </div>
        <h2 className="self-center text-xl font-bold tracking-tight text-center sm:text-2xl">
          <span className="text-primary">{titleEmphasis}</span>{" "}
          {titleRest}
        </h2>
      </div>

      <div ref={railRef} className="relative">
        <TimelineLine accentClassName={accentClassName} />

        <div className="space-y-3 sm:space-y-5">
          {groups.map((g, gi) => {
            const groupOffset = groups
              .slice(0, gi)
              .reduce((total, group) => total + group.nodes.length, 0);

            return (
              <div key={gi} className="relative">
                {showYearHeaders && g.year && (
                  <div className="mb-2 sm:mb-3 ml-8 sm:ml-7 select-none text-[0.65rem] sm:text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                    {g.year}
                  </div>
                )}
                <ul className="space-y-3 sm:space-y-5">
                  {g.nodes.map((item, i) => {
                    const timelineIndex = groupOffset + i;

                    return (
                      <li
                        key={`${g.year}-${i}`}
                        className="relative grid grid-cols-[1.25rem_1fr] gap-x-4 sm:grid-cols-[0.9rem_1fr] sm:gap-x-3"
                        data-timeline-side={
                          timelineIndex % 2 === 0 ? "left" : "right"
                        }
                      >
                        {/* Dot */}
                        <div
                          data-timeline-dot
                          className="timeline-dot-cell flex items-start justify-center"
                        >
                          <Dot accentClassName={accentClassName} />
                        </div>

                        {/* Content */}
                        <div className="-mt-1">
                          <ItemCard
                            item={item}
                            density={density}
                            visitSiteLabel={visitSiteLabel}
                            presentLabel={presentLabel}
                            locale={locale}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
