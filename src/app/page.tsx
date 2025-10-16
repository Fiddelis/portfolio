"use client";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import TargetCursor from "@/components/TargetCursor";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { Timeline, TimelineItem } from "./components/Timeline";
import { Separator } from "@radix-ui/react-separator";

const demoItems: TimelineItem[] = [
  {
    company: "Instituto Nacional de Telecomunicações (Inatel)",
    role: "Teaching Assistant | Numerical Calculation & Statistics",
    start: "Feb 2025",
    end: "Present",
    location: "Santa Rita do Sapucaí, MG, Brazil",
    tech: ["Statistics", "Python", "Data Analysis"],
    url: "https://inatel.br/",
  },
  {
    company: "CS&I Lab – Instituto Nacional de Telecomunicações (Inatel)",
    role: "Research Intern | Cybersecurity & AI",
    start: "Sep 2024",
    end: "Oct 2025",
    location: "Santa Rita do Sapucaí, MG, Brazil",
    tech: ["Cybersecurity", "SOC", "Machine Learning", "Python", "LLM"],
    url: "https://inatel.br/",
  },
  {
    company: "Instituto Nacional de Telecomunicações (Inatel)",
    role: "Teaching Assistant | Microcontrollers & Microprocessors",
    start: "Feb 2025",
    end: "Jul 2025",
    location: "Santa Rita do Sapucaí, MG, Brazil",
    tech: ["C++", "Embedded Systems", "Communication"],
    url: "https://inatel.br/",
  },
  {
    company: "CIDC – Inatel & Huawei",
    role: "Intern | Telecommunications",
    start: "May 2024",
    end: "Sep 2024",
    location: "Santa Rita do Sapucaí, MG, Brazil",
    tech: ["Telecommunications", "Microsoft Office", "Signal Analysis"],
    url: "https://inatel.br/",
  },
  {
    company: "SSIC – Inatel & Ericsson",
    role: "Intern | Software Automation",
    start: "Sep 2023",
    end: "Apr 2024",
    location: "Santa Rita do Sapucaí, MG, Brazil",
    tech: [
      "Java",
      "Python",
      "Documentation",
      "Automation",
      "Process Optimization",
    ],
    url: "https://inatel.br/",
  },
];

export default function Home() {
  return (
    <section
      id="home"
      className="font-mono max-w-9/10 sm:max-w-3/4 mx-auto flex flex-col"
    >
      <div className="hidden md:block">
        <TargetCursor spinDuration={4} hideDefaultCursor={true} />
      </div>
      <Nav />
      <div className="flex flex-col gap-30">
        <Hero />
        <Separator className="w-full h-0.5 bg-gradient-to-r from-background via-accent to-background" />
        <Projects />
        <Separator className="w-full h-0.5 bg-gradient-to-r from-background via-accent to-background" />
        <Timeline
          items={demoItems}
          density="compact"
          accentClassName="bg-primary border-primary"
          showYearHeaders
        />
        <Separator className="w-full h-0.5 bg-gradient-to-r from-background via-accent to-background" />
        <Contact />
      </div>
      <footer className="mb-4 text-center text-sm text-primary">
        <p>© {new Date().getFullYear()} Fiddelis. All rights reserved.</p>
      </footer>
    </section>
  );
}
