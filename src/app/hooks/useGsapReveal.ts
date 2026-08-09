"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealOptions = {
  y?: number;
  duration?: number;
  start?: string;
};

export function useGsapReveal<T extends Element>(
  ref: RefObject<T | null>,
  { y = 24, duration = 0.6, start = "top 82%" }: RevealOptions = {}
) {
  useLayoutEffect(() => {
    const target = ref.current;

    if (!target) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          noPreference: "(prefers-reduced-motion: no-preference)",
        },
        (mediaContext) => {
          if (mediaContext.conditions?.reduceMotion) {
            gsap.set(target, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotation: 0,
            });
            return;
          }

          const pop = gsap.timeline({
            scrollTrigger: {
              trigger: target,
              start,
              toggleActions: "play none none none",
            },
          });

          pop
            .fromTo(
              target,
              {
                autoAlpha: 0,
                y,
                scale: 0.78,
                rotation: -1,
              },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1.06,
                rotation: 0,
                duration: Math.min(duration, 0.2),
                ease: "steps(2)",
              }
            )
            .to(target, {
              scale: 1,
              duration: Math.min(duration * 0.2, 0.06),
              ease: "steps(1)",
            });
        }
      );

      return () => media.revert();
    }, target);

    return () => context.revert();
  }, [duration, ref, start, y]);
}
