"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Hero from "@/app/components/Hero";
import Nav from "@/app/components/Nav";
import Projects from "@/app/components/Projects";
import { Timeline } from "@/app/components/Timeline";
import Footer from "@/app/components/Footer";
import { BoxCard } from "@/components/ui/box-card";
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

  const contactHref = `/${locale}/#contact`;
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
      <Nav labels={copy.nav} />

      <section className="mx-auto w-full max-w-[1200px] px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        <Hero
          copy={copy.hero}
          links={{ contact: contactHref, projects: projectsHref }}
        />
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Projects copy={copy.projects} contactHref={contactHref} />
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {loading ? (
          <p className="text-center text-muted-foreground">{copy.misc.loading}</p>
        ) : (
          <Timeline
            items={items}
            density="compact"
            accentClassName="bg-primary border-primary"
            showYearHeaders
            labels={copy.timeline}
          />
        )}
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <BoxCard className="flex flex-col items-center gap-6 px-5 py-8 text-center sm:px-8 sm:py-12">
          <Contact copy={copy.contact} />
        </BoxCard>
      </section>
      <Footer copy={copy.footer} />
    </div>
  );
}
