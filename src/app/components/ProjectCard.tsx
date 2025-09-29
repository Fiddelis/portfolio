import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

type ProjectCardProps = {
  title: string;
  link: string;
  description: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  badges: string[];
};

export default function ProjectCard({
  title,
  link,
  description,
  imageSrc,
  imageAlt,
  badges,
}: ProjectCardProps) {
  return (
    <Card className="bg-background border-2 flex flex-col transition-all duration-500 hover:scale-105 hover:shadow-xl">
      {/* Header fixo no topo */}
      <CardHeader>
        <CardTitle className="text-primary cursor-target">
          <a
            href={link}
            target="_blank"
            className="group cursor-none hover:underline flex items-center gap-2"
          >
            {title}
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </CardTitle>
        <CardDescription className="text-foreground">
          {description}
        </CardDescription>
      </CardHeader>

      {/* Wrapper flex-1 mantém o conteúdo colado acima do footer */}
      <div className="flex-1 flex items-end justify-center">
        <CardContent className="flex justify-center align-bottom">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={400}
            height={400}
            className="drop-shadow-2xl"
          />
        </CardContent>
      </div>

      {/* Sempre no final */}
      <CardFooter className="mt-auto flex gap-2">
        {badges.map((badge, i) => (
          <Badge key={i}>{badge}</Badge>
        ))}
      </CardFooter>
    </Card>
  );
}
