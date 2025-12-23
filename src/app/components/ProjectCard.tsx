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
    <a
      href={link}
      target="_blank"
      className="group flex items-center gap-2"
    >
      <Card className="h-full card border-secondary border-dashed border-2 flex flex-col transition-all duration-500 hover:scale-102 hover:shadow-xl hover:border-primary">
        {/* Header fixo no topo */}
        <CardHeader>
          <CardTitle className="text-primary">{title}</CardTitle>
          <CardDescription className="text-foreground text-justify">
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
              className="drop-shadow-2xl max-md:w-9/10"
            />
          </CardContent>
        </div>

        {/* Sempre no final */}
        <CardFooter className="mt-auto">
          <div className="flex justify-between w-full">
            <div>
              {badges.map((badge, i) => (
                <Badge key={i} className="m-1">
                  {badge}
                </Badge>
              ))}
            </div>
            <div>
              <ArrowUpRight className="w-6 h-6 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </CardFooter>
      </Card>
    </a>
  );
}
