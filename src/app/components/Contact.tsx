import { motion } from "framer-motion";
import { SiDiscord, SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/app/i18n/dictionaries";

type ContactProps = {
  copy: Dictionary["contact"];
};

export default function Contact({ copy }: ContactProps) {
  return (
    <motion.section
      id="contact"
      className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] sm:gap-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="space-y-6 text-left">
        <Badge
          variant="secondary"
          className="w-fit uppercase tracking-[0.2em]"
        >
          {copy.badge}
        </Badge>
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
          {copy.title}
        </h2>
        <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
          {copy.description}
        </p>
        <a
          href="mailto:contact@fiddelis.dev"
          className="inline-flex flex-wrap items-center gap-2 text-base font-semibold text-primary transition-colors hover:text-secondary cursor-target sm:text-lg break-all"
        >
          contact@fiddelis.dev
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {copy.responseTag}
          </span>
        </a>
      </div>

      <Card className="border border-border/60 bg-card/70 shadow-lg backdrop-blur">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span>{copy.socialTitle}</span>
            <span>{copy.socialSubtitle}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href="https://www.linkedin.com/in/lucas-ruan-fidelis"
              className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/60 p-3 text-sm font-semibold text-foreground transition-all hover:border-primary/60 hover:text-primary cursor-target"
            >
              <SiLinkedin className="h-5 w-5" />
              LinkedIn
            </a>
            <a
              href="https://github.com/Fiddelis"
              className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/60 p-3 text-sm font-semibold text-foreground transition-all hover:border-primary/60 hover:text-primary cursor-target"
            >
              <SiGithub className="h-5 w-5" />
              GitHub
            </a>
            <a
              href="https://discord.com/users/210895480429871104"
              className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/60 p-3 text-sm font-semibold text-foreground transition-all hover:border-primary/60 hover:text-primary cursor-target"
            >
              <SiDiscord className="h-5 w-5" />
              Discord
            </a>
            <a
              href="https://www.instagram.com/lucasruan.ff"
              className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/60 p-3 text-sm font-semibold text-foreground transition-all hover:border-primary/60 hover:text-primary cursor-target"
            >
              <SiInstagram className="h-5 w-5" />
              Instagram
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
