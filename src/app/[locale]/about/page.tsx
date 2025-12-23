"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Nav from "@/app/components/Nav";
import BackgroundBlurs from "@/app/components/BackgroundBlurs";
import Footer from "@/app/components/Footer";
import { Badge } from "@/components/ui/badge";
import { defaultLocale, isLocale } from "../../i18n/config";
import { getDictionary } from "../../i18n/dictionaries";

export default function AboutPage() {
  const params = useParams();
  const localeParam = Array.isArray(params?.locale)
    ? params?.locale[0]
    : params?.locale;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const copy = getDictionary(locale);

  return (
    <div className="relative isolate overflow-hidden font-mono">
      <BackgroundBlurs className="-z-10" />
      <Nav labels={copy.nav} />

      <div className="section-bleed">
        <div className="section-inner pt-24 sm:pt-32">
          <motion.section
            className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] sm:gap-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="space-y-5 text-left sm:space-y-6">
              <Badge
                variant="secondary"
                className="w-fit uppercase tracking-[0.2em]"
              >
                {copy.about.badge}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                {copy.about.title}
              </h1>
              <p className="text-sm text-muted-foreground sm:text-base lg:text-lg">
                {copy.about.description}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/60 bg-card/70 p-4">
                  <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {copy.about.focusLabel}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-foreground">
                    {copy.about.focusValue}
                  </div>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card/70 p-4">
                  <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {copy.about.locationLabel}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-foreground">
                    {copy.about.locationValue}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mx-auto flex w-full max-w-sm justify-center sm:max-w-md">
              <div className="inset-0 rounded-[2rem]" />
              <Image
                src="/profile.jpg"
                alt={copy.about.imageAlt}
                width={520}
                height={640}
                priority
                sizes="(max-width: 640px) 100vw, 520px"
                className=" w-full max-w-sm rounded-[2rem] border border-border/60 object-cover shadow-2xl sm:h-[520px] sm:w-auto sm:max-w-md"
              />
            </div>
          </motion.section>
        </div>
      </div>

      <Footer copy={copy.footer} />
    </div>
  );
}
