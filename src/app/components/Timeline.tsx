"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ExternalLink, MapPin, Briefcase, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type TimelineItem = {
  company: string;
  role: string;
  start: string | Date;
  end?: string | Date;
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
  labels?: {
    titleEmphasis: string;
    titleRest: string;
    visitSite: string;
    present: string;
  };
};

// ===================== Helpers =====================
function toLabel(d: string | Date | undefined) {
  if (!d) return undefined;
  if (typeof d === "string") return d;
  try {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      year: "numeric",
    }).format(d);
  } catch {
    return String(d);
  }
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
        className={`h-3 w-3 sm:h-2 sm:w-2 rounded-full border bg-background ${
          accentClassName ?? "border-primary"
        }`}
      />
      <div
        className={`absolute -inset-2 sm:-inset-1 rounded-full opacity-25 ${
          accentClassName ?? "bg-primary"
        }`}
      />
    </div>
  );
}

function TimelineLine({ accentClassName }: { accentClassName?: string }) {
  return (
    <div
      className={`absolute left-[0.62rem] sm:left-[0.45rem] top-0 h-full w-px ${
        accentClassName ?? "bg-primary"
      }`}
    />
  );
}

function HeaderRow({
  item,
  density,
  presentLabel,
}: {
  item: TimelineItem;
  density: TimelineProps["density"];
  presentLabel: string;
}) {
  const start = toLabel(item.start);
  const end = toLabel(item.end) ?? presentLabel;
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
        {start} — {end}
      </span>
      <span className="hidden sm:block">•</span>
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
}: {
  item: TimelineItem;
  density: TimelineProps["density"];
  visitSiteLabel: string;
  presentLabel: string;
}) {
  const headerClass =
    density === "compact" ? "px-4 pt-3 pb-2" : "px-6 pt-6 pb-2";
  const contentClass =
    density === "compact" ? "px-4 pb-3 pt-0" : "px-6 pb-6 pt-0";

  return (
    <Card className={density === "compact" ? "shadow-sm" : "shadow-md"}>
      <CardHeader className={headerClass}>
        <CardTitle className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:text-[0.9rem]">
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
        </CardTitle>
        <HeaderRow
          item={item}
          density={density}
          presentLabel={presentLabel}
        />
      </CardHeader>
      <CardContent className={contentClass}>
        {item.description && (
          <p className="text-left mb-2 text-[0.9rem] sm:text-sm leading-relaxed">
            {item.description}
          </p>
        )}
        <TechBadges tech={item.tech} />
      </CardContent>
    </Card>
  );
}

export function Timeline({
  items,
  density = "comfortable",
  accentClassName,
  showYearHeaders = true,
  labels,
}: TimelineProps) {
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

  const titleEmphasis = labels?.titleEmphasis ?? "Career";
  const titleRest = labels?.titleRest ?? "Timeline";
  const visitSiteLabel = labels?.visitSite ?? "Visit site";
  const presentLabel = labels?.present ?? "Present";

  return (
    <motion.section
      className="flex flex-col gap-6 sm:gap-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="self-center text-xl font-bold tracking-tight text-center sm:text-2xl">
        <span className="text-primary">{titleEmphasis}</span>{" "}
        {titleRest}
      </h1>

      <div className="relative">
        <TimelineLine accentClassName={accentClassName} />

        <div className="space-y-3 sm:space-y-5">
          {groups.map((g, gi) => (
            <div key={gi} className="relative">
              {showYearHeaders && g.year && (
                <div className="mb-2 sm:mb-3 ml-8 sm:ml-7 select-none text-[0.65rem] sm:text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                  {g.year}
                </div>
              )}
              <ul className="space-y-3 sm:space-y-5">
                {g.nodes.map((item, i) => (
                  <li
                    key={`${g.year}-${i}`}
                    className="relative grid grid-cols-[1.25rem_1fr] sm:grid-cols-[0.9rem_1fr] gap-x-4 sm:gap-x-3"
                  >
                    {/* Dot */}
                    <div className="flex items-start justify-center">
                      <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 160,
                          damping: 18,
                        }}
                      >
                        <Dot accentClassName={accentClassName} />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <motion.div
                      initial={{ y: 8, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="-mt-1"
                    >
                      <ItemCard
                        item={item}
                        density={density}
                        visitSiteLabel={visitSiteLabel}
                        presentLabel={presentLabel}
                      />
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
