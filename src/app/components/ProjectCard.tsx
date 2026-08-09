import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BoxCard } from "@/components/ui/box-card";

type ProjectCardProps = {
  number: string;
  title: string;
  link: string;
  imageSrc: string;
  width: number;
  height: number;
  projectLabel: string;
  liveLabel: string;
  openLabel: string;
  description: string;
  tags: string[];
};

export default function ProjectCard({
  number,
  title,
  link,
  imageSrc,
  width,
  height,
  projectLabel,
  liveLabel,
  openLabel,
  description,
  tags,
}: ProjectCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="project-link group block cursor-target focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      aria-label={title}
      data-project-card
    >
      <BoxCard className="project-card border-2 border-foreground bg-card">
        <div className="flex items-center justify-between border-b-2 border-dashed border-foreground/70 bg-muted/35 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-foreground sm:text-xs">
          <span>
            {projectLabel}_{number}
          </span>
          <span className="bg-primary px-2 py-0.5 text-primary-foreground">[{liveLabel}]</span>
        </div>
        <Image
          src={imageSrc}
          alt={`${title} project banner`}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="h-auto w-full border-b-2 border-foreground/70 transition-opacity duration-300 group-hover:opacity-95"
        />
        <div className="space-y-4 px-4 py-4 sm:px-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="m-0 text-base font-bold uppercase tracking-[0.14em] text-foreground sm:text-lg">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
            <ArrowUpRight
              className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
              aria-hidden="true"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-foreground/50 pt-3">
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-foreground/60 bg-muted/35 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
              {openLabel} →
            </span>
          </div>
        </div>
      </BoxCard>
    </a>
  );
}
