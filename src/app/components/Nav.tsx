"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { localeLabels, locales, type Locale } from "@/app/i18n/config";
import type { Dictionary } from "@/app/i18n/dictionaries";

type NavProps = {
  labels: Dictionary["nav"];
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
};

export default function Nav({ labels, locale, onLocaleChange }: NavProps) {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const nav = navRef.current;

    if (!nav) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          noPreference: "(prefers-reduced-motion: no-preference)",
        },
        (mediaContext) => {
          if (mediaContext.conditions?.reduceMotion) {
            gsap.set(nav, { autoAlpha: 1, y: 0, scaleY: 1 });
            return;
          }

          gsap.timeline()
            .fromTo(
              nav,
              {
                autoAlpha: 0,
                y: -16,
                scaleY: 0.72,
                transformOrigin: "top center",
              },
              {
                autoAlpha: 1,
                y: 0,
                scaleY: 1.05,
                duration: 0.14,
                ease: "steps(2)",
              }
            )
            .to(nav, {
              scaleY: 1,
              duration: 0.06,
              ease: "steps(1)",
            });
        }
      );

      return () => media.revert();
    }, nav);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const nav = navRef.current;

    if (!nav) return;

    let lastScrollY = window.scrollY;
    let animationFrame: number | null = null;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const updateNav = () => {
      const currentScrollY = window.scrollY;
      const shouldHide =
        !menuOpen && currentScrollY > lastScrollY && currentScrollY > 56;

      gsap.to(nav, {
        autoAlpha: shouldHide ? 0 : 1,
        y: shouldHide ? -(nav.offsetHeight + 12) : 0,
        duration: reduceMotion ? 0 : 0.24,
        ease: "power2.out",
        overwrite: "auto",
      });

      lastScrollY = currentScrollY;
      animationFrame = null;
    };

    const handleScroll = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(updateNav);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen || !navRef.current) return;

    gsap.to(navRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [menuOpen]);

  const renderLocaleButtons = (textSize: string) =>
    locales.map((nextLocale) => {
      const isActive = nextLocale === locale;

      return (
        <button
          key={nextLocale}
          type="button"
          className={`${textSize} px-3 py-1 font-semibold transition-colors ${
            isActive
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-pressed={isActive}
          onClick={() => onLocaleChange(nextLocale)}
        >
          {localeLabels[nextLocale]}
        </button>
      );
    });

  return (
    <nav
      ref={navRef}
      className="fixed left-0 top-0 z-50 w-full border-b-2 border-foreground/80 bg-background/95 font-sans shadow-sm backdrop-blur-lg"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-2 sm:px-6 sm:py-2.5">
        <div className="flex items-center justify-between sm:hidden">
          <div
            className="flex flex-wrap items-center justify-center gap-1 border border-foreground/70 bg-card p-1 text-[0.65rem] tracking-[0.2em]"
            role="group"
            aria-label="Language selector"
          >
            {renderLocaleButtons("text-[0.65rem]")}
          </div>
          <button
            type="button"
            className="relative flex h-8 w-8 items-center justify-center bg-card text-foreground transition-colors hover:text-primary"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-nav-links"
            onClick={() => setMenuOpen((previous) => !previous)}
          >
            <span className="sr-only">Toggle menu</span>
            <span
              className={`absolute h-0.5 w-5 bg-current transition-transform duration-200 ${
                menuOpen ? "translate-y-0 rotate-45" : "-translate-y-2"
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-current transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-current transition-transform duration-200 ${
                menuOpen ? "translate-y-0 -rotate-45" : "translate-y-2"
              }`}
            />
          </button>
        </div>

        <ul className="hidden items-center justify-center gap-6 text-sm font-medium uppercase tracking-[0.2em] text-foreground sm:flex">
          <li>
            <Link href="/#home" className="cursor-target transition-colors hover:text-primary">
              {labels.home}
            </Link>
          </li>
          <li>
            <Link href="/#projects" className="cursor-target transition-colors hover:text-primary">
              {labels.projects}
            </Link>
          </li>
          <li>
            <Link href="/#contact" className="cursor-target transition-colors hover:text-primary">
              {labels.contact}
            </Link>
          </li>
          <li>
            <Link
              href="/posts"
              className="cursor-target font-semibold text-primary transition-colors hover:text-secondary"
            >
              {labels.posts}
            </Link>
          </li>
          <li>
            <div
              className="flex items-center gap-1 border border-foreground/70 bg-card p-1 text-xs tracking-[0.2em]"
              role="group"
              aria-label="Language selector"
            >
              {renderLocaleButtons("text-xs")}
            </div>
          </li>
        </ul>

        <div
          id="primary-nav-links"
          className={`mt-3 border-2 border-foreground/80 bg-card p-4 text-center text-[0.7rem] uppercase tracking-[0.16em] text-foreground shadow-lg backdrop-blur sm:hidden ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col gap-4">
            <Link
              href="/#home"
              className="cursor-target transition-colors hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              {labels.home}
            </Link>
            <Link
              href="/#projects"
              className="cursor-target transition-colors hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              {labels.projects}
            </Link>
            <Link
              href="/#contact"
              className="cursor-target transition-colors hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              {labels.contact}
            </Link>
            <Link
              href="/posts"
              className="cursor-target transition-colors hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              {labels.posts}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
