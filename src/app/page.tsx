"use client";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import TargetCursor from "@/components/TargetCursor";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { Timeline } from "./components/Timeline";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import { useEffect, useState } from "react";

import { client } from "../../sanity/lib/client";

function formatMonthYear(input?: string | null) {
  if (!input) return null;
  const d = new Date(input);

  if (typeof input === "string" && /^[A-Za-z]{3}\s\d{4}$/.test(input))
    return input;
  if (isNaN(d.getTime())) return input as any;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(d);
}

const QUERY = `*[_type=="works"]|order(start desc){
  _id, company, role, start, end, location, tech, url
}`;

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(QUERY)
      .then((data) => {
        const normalized = Array.isArray(data)
          ? data.map((it: any) => ({
              ...it,
              start: formatMonthYear(it.start),
              end: it.end ? formatMonthYear(it.end) : "Present",
            }))
          : [];
        setItems(normalized);
      })
      .catch((err) => console.error("Erro ao buscar dados do Sanity:", err))
      .finally(() => setLoading(false));
  }, []);

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
        {loading ? (
          <p className="text-center text-primary">Loading..</p>
        ) : (
          <Timeline
            items={items}
            density="compact"
            accentClassName="bg-primary border-primary"
            showYearHeaders
          />
        )}

        <Separator className="w-full h-0.5 bg-gradient-to-r from-background via-accent to-background" />
        <Contact />
      </div>
      <footer className="mb-4 text-center text-sm text-primary flex flex-col">
        <Image
          src="/cat.png"
          alt="cat"
          width={100}
          height={100}
          className="drop-shadow-2xl max-md:w-24 self-end"
        />
        <p className="align-text-bottom">
          © {new Date().getFullYear()} Fiddelis. All rights reserved.
        </p>
      </footer>
    </section>
  );
}
