import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
};

export default function FreelancerCard({ title, description }: Props) {
  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/70 p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <CardHeader className="relative p-8">
        <CardTitle className="text-xl font-bold text-foreground mb-3">
          {title}
        </CardTitle>
        <CardDescription className="text-base leading-relaxed text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
