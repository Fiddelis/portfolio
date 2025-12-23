import FreelancerCard from "./FreelancerCard";
import type { Dictionary } from "@/app/i18n/dictionaries";

type ProjectsProps = {
  copy: Dictionary["projects"];
  contactHref: string;
};

export default function Projects({ copy, contactHref }: ProjectsProps) {
  return (
    <section
      id="projects"
      className="flex flex-col items-center gap-6 text-center"
    >
      <div>
        <h2 className="section-heading text-foreground">
          {copy.titlePrefix}{" "}
          <span className="text-primary">{copy.titleAccent}</span>
        </h2>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground">
          {copy.subtitle}
        </p>
      </div>

      <div className="freelancer-grid w-full">
        {copy.cards.map((card) => (
          <FreelancerCard
            key={card.title}
            title={card.title}
            description={card.description}
            ctaText={card.ctaText}
            ctaHref={contactHref}
          />
        ))}
      </div>
    </section>
  );
}
