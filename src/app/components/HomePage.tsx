"use client";

import Hero from "@/app/components/Hero";
import Nav from "@/app/components/Nav";
import Projects from "@/app/components/Projects";
import { Timeline } from "@/app/components/Timeline";
import Footer from "@/app/components/Footer";
import Contact from "@/app/components/Contact";
import timelineItems from "@/app/data/timeline.json";
import { getDictionary } from "@/app/i18n/dictionaries";
import { useLocale } from "@/app/i18n/LocaleProvider";

export default function HomePage() {
  const { locale, setLocale } = useLocale();
  const copy = getDictionary(locale);
  const localizedTimelineItems = timelineItems.map((item) => ({
    ...item,
    role: copy.timeline.roles[item.role] ?? item.role,
  }));

  return (
    <div
      id="home"
      className="relative isolate flex min-h-[100svh] flex-col overflow-x-clip font-mono"
    >
      <Nav labels={copy.nav} locale={locale} onLocaleChange={setLocale} />

      <div className="flex-1">
        <div className="hero-stage">
          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <Hero
              copy={copy.hero}
              links={{ resume: "/curriculo.pdf", projects: "#projects" }}
            />
          </div>
        </div>

        <div className="site-section site-section--projects">
          <div className="site-section__inner mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Projects copy={copy.projects} cta={copy.cta} />
          </div>
        </div>

        <div className="site-section site-section--timeline">
          <div className="site-section__inner mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Timeline
              items={localizedTimelineItems}
              locale={locale === "pt" ? "pt-BR" : "en-US"}
              density="compact"
              accentClassName="bg-primary border-primary"
              showYearHeaders
              labels={copy.timeline}
            />
          </div>
        </div>

        <div className="site-section site-section--contact">
          <div className="site-section__inner mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Contact copy={copy.contact} />
          </div>
        </div>
      </div>

      <Footer copy={copy.footer} />
    </div>
  );
}
