"use client";
import DecryptedText from "@/components/DecryptedText";
import LogoLoop from "@/components/LogoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiPython,
  SiSpring,
  SiMysql,
} from "react-icons/si";
import { FaArrowDown } from "react-icons/fa";
import { motion } from "framer-motion";
export default function Hero() {
  const techLogos = [
    {
      node: <SiReact className="cursor-target" />,
      title: "React",
      href: "https://react.dev",
    },
    {
      node: <SiNextdotjs className="cursor-target" />,
      title: "Next.js",
      href: "https://nextjs.org",
    },
    {
      node: <SiTypescript className="cursor-target" />,
      title: "TypeScript",
      href: "https://www.typescriptlang.org",
    },
    {
      node: <SiPython className="cursor-target" />,
      title: "Python",
      href: "https://www.python.org/",
    },
    {
      node: <SiSpring className="cursor-target" />,
      title: "Spring",
      href: "https://spring.io/",
    },
    {
      node: <SiMysql className="cursor-target" />,
      title: "MySQL",
      href: "https://www.mysql.com/",
    },
  ];

  return (
    <div className="w-100% mt-28 h-screen flex flex-col">
      <motion.div
        className="flex flex-col justify-center align-middle text-center gap-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div>
          <div className="text-2xl text-secondary">Hi, I'm</div>
          <div className="text-6xl sm:text-8xl text-primary font-bold text-shadow-lg">
            <span className="cursor-target">Fiddelis.</span>
          </div>
          <DecryptedText
            parentClassName="text-4xl text-foreground"
            speed={60}
            maxIterations={10}
            text="Software Engineering"
            sequential={true}
            animateOn="view"
            revealDirection="center"
          />
        </div>

        <p className="text-xl text-foreground text-center">
          <span className="cursor-target text-primary">
            Software Engineering Student
          </span>{" "}
          at Instituto Nacional de Telecomunicações (INATEL) and I have been
          dedicated to the study and application of technologies involving{" "}
          <span className="cursor-target text-primary">
            information security
          </span>
          ,{" "}
          <span className="cursor-target text-primary">
            artificial intelligence
          </span>
          , and{" "}
          <span className="cursor-target text-primary">
            software development.
          </span>
        </p>
        <LogoLoop
          logos={techLogos}
          className="text-foreground"
          speed={120}
          direction="left"
          logoHeight={48}
          gap={40}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#ede9ee"
          ariaLabel="Technology partners"
        />
      </motion.div>
    </div>
  );
}
