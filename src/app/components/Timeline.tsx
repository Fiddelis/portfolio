"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ExternalLink, MapPin, Briefcase, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
        ? it.start.match(/\d{4}/)?.[0] ?? ""
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
        className={`h-4 w-4 sm:h-3 sm:w-3 rounded-full border bg-background ${
          accentClassName ?? "border-primary"
        }`}
      />
      <div
        className={`absolute -inset-3 sm:-inset-2 rounded-full opacity-25 ${
          accentClassName ?? "bg-primary"
        }`}
      />
    </div>
  );
}

function TimelineLine({ accentClassName }: { accentClassName?: string }) {
  return (
    <div
      className={`absolute left-[0.75rem] sm:left-[0.5625rem] top-0 h-full w-[2px] ${
        accentClassName ?? "bg-primary"
      }`}
    />
  );
}

function HeaderRow({
  item,
  density,
}: {
  item: TimelineItem;
  density: TimelineProps["density"];
}) {
  const start = toLabel(item.start);
  const end = toLabel(item.end) ?? "Present";
  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${
        density === "compact" ? "text-sm sm:text-sm" : "text-base sm:text-base"
      }`}
    >
      <span className="inline-flex items-center gap-1 text-muted-foreground">
        <Calendar className="h-5 w-5 sm:h-4 sm:w-4" />
        {start} — {end}
      </span>
      <span className="hidden sm:block">•</span>
      {item.location && (
        <span className="inline-flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-5 w-5 sm:h-4 sm:w-4" />
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
        <Badge key={i} className="px-2 py-1 text-xs sm:text-xs">
          {t}
        </Badge>
      ))}
    </div>
  );
}

function ItemCard({
  item,
  density,
}: {
  item: TimelineItem;
  density: TimelineProps["density"];
}) {
  return (
    <Card className={density === "compact" ? "shadow-sm" : "shadow-md"}>
      <CardHeader className="pb-2">
        <CardTitle className="flex flex-wrap items-center gap-x-2 gap-y-1 text-lg sm:text-base">
          <span className="inline-flex items-center gap-1">
            {/* maior no mobile */}
            <Briefcase className="h-6 w-6 sm:h-5 sm:w-5 max-md:hidden" />
            <span className="leading-none">{item.role}</span>
          </span>
          <span className="text-muted-foreground">@ {item.company}</span>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="max-md:hidden ml-auto inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-5 w-5 sm:h-4 sm:w-4" /> Visit Site
            </a>
          )}
        </CardTitle>
        <HeaderRow item={item} density={density} />
      </CardHeader>
      <CardContent className="pt-0">
        {item.description && (
          <p className="text-left mb-3 text-[0.95rem] sm:text-sm leading-relaxed">
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

  return (
    <motion.section
      className="flex flex-col gap-12 sm:gap-20 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="self-center text-3xl sm:text-4xl font-bold mb-6 sm:mb-20 text-center">
        <span className="text-primary">Career</span> Timeline
      </h1>

      <div className="relative">
        <TimelineLine accentClassName={accentClassName} />

        <div className="space-y-8 sm:space-y-10">
          {groups.map((g, gi) => (
            <div key={gi} className="relative">
              {showYearHeaders && g.year && (
                <div className="mb-4 sm:mb-6 ml-10 sm:ml-8 select-none text-xs sm:text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  {g.year}
                </div>
              )}
              <ul className="space-y-6 sm:space-y-8">
                {g.nodes.map((item, i) => (
                  <li
                    key={`${g.year}-${i}`}
                    className="relative grid grid-cols-[1.75rem_1fr] sm:grid-cols-[1.125rem_1fr] gap-x-5 sm:gap-x-4"
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
                      <ItemCard item={item} density={density} />
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
