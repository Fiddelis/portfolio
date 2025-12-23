"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  defaultLocale,
  isLocale,
  localeLabels,
  locales,
  type Locale,
} from "@/app/i18n/config";
import type { Dictionary } from "@/app/i18n/dictionaries";

type NavProps = {
  labels: Dictionary["nav"];
};

export default function Nav({ labels }: NavProps) {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const segments = pathname.split("/");
  const localeFromPath = segments[1];
  const currentLocale = isLocale(localeFromPath)
    ? localeFromPath
    : defaultLocale;
  const pathWithoutLocale = isLocale(localeFromPath)
    ? `/${segments.slice(2).join("/")}`
    : pathname;
  const normalizedPath = pathWithoutLocale === "/" ? "" : pathWithoutLocale;
  const localePrefix = `/${currentLocale}`;
  const buildLocaleHref = (locale: Locale) => `/${locale}${normalizedPath}`;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // descendo -> esconde
        setShow(false);
      } else {
        // subindo -> mostra
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      className="fixed top-0 left-0 z-50 w-full border-b border-border/60 bg-gradient-to-b from-background/80 to-background/20 backdrop-blur-lg"
      initial={{ opacity: 0, y: -40 }}
      animate={{
        opacity: show ? 1 : 0,
        y: show ? 0 : -80,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between sm:hidden">
          <div
            className="flex flex-wrap items-center justify-center gap-1 rounded-full border border-border/60 bg-background/70 p-1 text-[0.65rem] tracking-[0.2em]"
            aria-label="Language switcher"
          >
            {locales.map((locale) => {
              const isActive = locale === currentLocale;
              return (
                <Link
                  key={locale}
                  href={buildLocaleHref(locale)}
                  className={`rounded-full px-3 py-1 transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {localeLabels[locale]}
                </Link>
              );
            })}
          </div>
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center bg-background/70 text-foreground/80 transition-colors hover:text-primary"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-nav-links"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">Toggle menu</span>
            <span
              className={`absolute h-0.5 w-5 rounded bg-current transition-transform duration-200 ${
                menuOpen ? "translate-y-0 rotate-45" : "-translate-y-2"
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 rounded bg-current transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 rounded bg-current transition-transform duration-200 ${
                menuOpen ? "translate-y-0 -rotate-45" : "translate-y-2"
              }`}
            />
          </button>
        </div>

        <ul className="hidden items-center justify-center gap-6 text-sm font-medium uppercase tracking-[0.2em] text-foreground/80 sm:flex">
          <li>
            <Link
              href={localePrefix}
              className="cursor-target hover:text-primary transition-colors"
            >
              {labels.home}
            </Link>
          </li>
          <li>
            <Link
              href={`${localePrefix}#projects`}
              className="cursor-target hover:text-primary transition-colors"
            >
              {labels.projects}
            </Link>
          </li>
          <li>
            <Link
              href={`${localePrefix}/#contact`}
              className="cursor-target hover:text-primary transition-colors"
            >
              {labels.contact}
            </Link>
          </li>
          <li>
            <Link
              href={`${localePrefix}/about`}
              className="cursor-target hover:text-primary transition-colors"
            >
              {labels.about}
            </Link>
          </li>
          <li>
            <div
              className="flex items-center gap-1 rounded-full border border-border/60 bg-background/70 p-1 text-xs tracking-[0.2em]"
              aria-label="Language switcher"
            >
              {locales.map((locale) => {
                const isActive = locale === currentLocale;
                return (
                  <Link
                    key={locale}
                    href={buildLocaleHref(locale)}
                    className={`rounded-full px-3 py-1 transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {localeLabels[locale]}
                  </Link>
                );
              })}
            </div>
          </li>
        </ul>

        <div
          id="primary-nav-links"
          className={`mt-3 rounded-2xl border border-border/60 bg-background/80 p-4 text-center text-[0.7rem] uppercase tracking-[0.16em] text-foreground/80 shadow-lg backdrop-blur sm:hidden ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col gap-4">
            <Link
              href={localePrefix}
              className="cursor-target hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {labels.home}
            </Link>
            <Link
              href={`${localePrefix}#projects`}
              className="cursor-target hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {labels.projects}
            </Link>
            <Link
              href={`${localePrefix}/#contact`}
              className="cursor-target hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {labels.contact}
            </Link>
            <Link
              href={`${localePrefix}/about`}
              className="cursor-target hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {labels.about}
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
