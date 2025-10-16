import { motion } from "framer-motion";
import { SiDiscord, SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import { Card } from "@/components/ui/card";

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="flex flex-col font-bold h-100 justify-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h1 className="self-center text-4xl text-shadow-lg cursor-target mb-20">
        Let’s <span className="text-primary">Connect</span>
      </h1>
      <Card className="flex gap-6 justify-center max-w-min p-2 self-center bg-secondary text-background transition-all duration-500 hover:bg-accent">
        <a
          href="https://www.linkedin.com/in/lucas-ruan-fidelis"
          className="cursor-none cursor-target transition-all duration-500 hover:text-secondary"
        >
          <SiLinkedin className="cursor-none w-10 h-10 drop-shadow-lg/30" />
        </a>

        <a
          href="https://github.com/Fiddelis"
          className="cursor-target transition-all duration-500 hover:text-secondary"
        >
          <SiGithub className="cursor-none w-10 h-10 drop-shadow-lg/30" />
        </a>
        <a
          href="https://discord.com/users/210895480429871104"
          className="cursor-target transition-all duration-500 hover:text-secondary"
        >
          <SiDiscord className="cursor-none w-10 h-10 drop-shadow-lg/30" />
        </a>
        <a
          href="https://www.instagram.com/lucasruan.ff"
          className="cursor-target transition-all duration-500 hover:text-secondary"
        >
          <SiInstagram className="cursor-none w-10 h-10 drop-shadow-lg/30" />
        </a>
      </Card>
      <a
        href="mailto:contact@fiddelis.dev"
        className="cursor-none self-center mt-2 hover:underline"
      >
        contact@fiddelis.dev
      </a>
    </motion.section>
  );
}
