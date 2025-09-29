"use client";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import TargetCursor from "@/components/TargetCursor";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <section id="home" className="font-mono max-w-9/10 sm:max-w-3/4 mx-auto">
      <TargetCursor spinDuration={4} hideDefaultCursor={true} />
      <Nav />
      <Hero />
      <Projects />
      <Contact />

      <footer className="mb-4 text-center text-sm text-accent">
        <p>© {new Date().getFullYear()} Fiddelis. All rights reserved.</p>
      </footer>
    </section>
  );
}
