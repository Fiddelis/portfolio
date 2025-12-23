"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Hero from "@/app/components/Hero";
import Nav from "@/app/components/Nav";
import Projects from "@/app/components/Projects";
import { Timeline } from "@/app/components/Timeline";
import BackgroundBlurs from "@/app/components/BackgroundBlurs";
import Footer from "@/app/components/Footer";
import { Button } from "@/components/ui/button";
import { client } from "../../../sanity/lib/client";
import { defaultLocale, isLocale } from "../i18n/config";
import { getDictionary } from "../i18n/dictionaries";
import Contact from "../components/Contact";

function formatMonthYear(input?: string | null, locale = "en-US") {
  if (!input) return null;
  const d = new Date(input);

  if (typeof input === "string" && /^[A-Za-z]{3}\s\d{4}$/.test(input))
    return input;
  if (isNaN(d.getTime())) return input as any;
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
  }).format(d);
}

const QUERY = `*[_type=="works"]|order(start desc){
  _id, company, role, start, end, location, tech, url
}`;

export default function Home() {
  const params = useParams();
  const localeParam = Array.isArray(params?.locale)
    ? params?.locale[0]
    : params?.locale;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const copy = getDictionary(locale);

  const contactHref = `/${locale}/contact`;
  const projectsHref = `/${locale}#projects`;

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const dateLocale = locale === "pt" ? "pt-BR" : "en-US";

  useEffect(() => {
    client
      .fetch(QUERY)
      .then((data) => {
        const normalized = Array.isArray(data)
          ? data.map((it: any) => ({
              ...it,
              start: formatMonthYear(it.start, dateLocale),
              end: it.end ? formatMonthYear(it.end, dateLocale) : undefined,
            }))
          : [];
        setItems(normalized);
      })
      .catch((err) => console.error("Erro ao buscar dados do Sanity:", err))
      .finally(() => setLoading(false));
  }, [dateLocale]);

  return (
    <div id="home" className="relative isolate font-mono overflow-hidden">
      <BackgroundBlurs className="-z-10" />
      <Nav labels={copy.nav} />

      <div className="section-bleed">
        <div className="section-inner">
          <Hero
            copy={copy.hero}
            links={{ contact: contactHref, projects: projectsHref }}
          />
        </div>
      </div>

      <div className="section-bleed">
        <div className="section-inner">
          <Projects copy={copy.projects} contactHref={contactHref} />
        </div>
      </div>

      <div className="section-bleed">
        <div className="section-inner">
          {loading ? (
            <p className="text-center text-muted-foreground">
              {copy.misc.loading}
            </p>
          ) : (
            <Timeline
              items={items}
              density="compact"
              accentClassName="bg-primary border-primary"
              showYearHeaders
              labels={copy.timeline}
            />
          )}
        </div>
      </div>

      <div className="section-bleed">
        <div className="section-inner">
          <section className="flex flex-col items-center gap-6 rounded-3xl border border-border/60 bg-card/70 px-5 py-8 text-center shadow-lg backdrop-blur sm:px-8 sm:py-12">
            <Contact copy={copy.contact} />
          </section>
        </div>
      </div>

      <Footer copy={copy.footer} />
    </div>
  );
}
