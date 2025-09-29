import SpotlightCard from "@/components/SpotlightCard";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <motion.section
      id="projects"
      className="flex flex-col h-[800px] font-bold"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h1 className="self-center text-4xl text-shadow-lg cursor-target mb-20">
        My Featured <span className="text-primary">Projects</span>
      </h1>

      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 w-full gap-12">
        <ProjectCard
          title="Kindle2Anki"
          link="https://www.kindle2anki.app/"
          description={
            <>
              <span className="underline">Web application</span> that helps you
              transform the vocabulary collected by your{" "}
              <span className="text-secondary">Kindle</span> into ready-to-study{" "}
              <span className="text-secondary">Anki flashcards</span>.
            </>
          }
          imageSrc="/kindle2anki.png"
          imageAlt="kindle2anki"
          badges={["TS", "NextJs"]}
        />

        <ProjectCard
          title="Sher-Lock"
          link="https://github.com/Fiddelis/sher-lock"
          description={
            <>
              A <span className="text-secondary">smart locker</span> service
              distributed across the city to simplify package delivery.
              Logistics companies drop off orders, and customers pick them up
              securely with a QR code, anytime, without waiting in lines.
            </>
          }
          imageSrc="/sherlock.png"
          imageAlt="Sherlock"
          badges={["Java", "Spring", "RabbitMQ", "Postgres"]}
        />

        <ProjectCard
          title="LLM-Based Strategies for Efficient SOC Alert Triage"
          link="https://github.com/Fiddelis/AI-Security-Labs"
          description={
            <>
              <span className="underline">Research</span> on a self-hosted LLM
              ensemble architecture for{" "}
              <span className="text-secondary">SOC alert triage</span>,
              combining lightweight models for{" "}
              <span className="text-secondary">log filtering</span> with robust
              models for <span className="text-secondary">classification</span>.
            </>
          }
          imageSrc="/aisecuritylab.png"
          imageAlt="kindle2anki"
          badges={["Python", "AI"]}
        />
      </div>
    </motion.section>
  );
}
