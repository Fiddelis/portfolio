"use client";
import DotGrid from "@/components/DotGrid";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import TargetCursor from "@/components/TargetCursor";

export default function Home() {
  return (
    <section className="font-mono max-w-9/10 sm:max-w-3/4 mx-auto">
      <TargetCursor spinDuration={4} hideDefaultCursor={true} />
      <div>
        <div className="absolute inset-0 -z-10 bg-background">
          <DotGrid
            dotSize={3}
            gap={10}
            baseColor="#EDE9EE"
            activeColor="#2E033E"
            proximity={180}
            shockRadius={250}
            shockStrength={10}
            resistance={800}
            returnDuration={0.5}
          />
        </div>
        <Nav />
        <Hero />
      </div>
    </section>
  );
}
