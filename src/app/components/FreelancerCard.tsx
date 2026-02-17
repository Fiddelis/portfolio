import {
  BoxCard,
  BoxCardHeader,
  BoxCardTitle,
  BoxCardDescription,
} from "@/components/ui/box-card";

type Props = {
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
};

export default function FreelancerCard({ title, description }: Props) {
  return (
    <BoxCard className="p-0">
      <BoxCardHeader className="p-8">
        <BoxCardTitle className="text-xl font-bold text-foreground mb-3">
          {title}
        </BoxCardTitle>
        <BoxCardDescription className="text-base leading-relaxed text-muted-foreground">
          {description}
        </BoxCardDescription>
      </BoxCardHeader>
    </BoxCard>
  );
}
