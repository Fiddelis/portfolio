"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function Nav() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // descendo -> esconde
        setShow(false);
      } else {
        // subindo -> mostra
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-background/40 to-background/10 backdrop-blur-lg border-b border-accent"
      initial={{ opacity: 0, y: -40 }}
      animate={{
        opacity: show ? 1 : 0,
        y: show ? 0 : -80,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-center items-center">
        <ul className="flex gap-12">
          <li>
            <a href="#" className="cursor-none">
              Home
            </a>
          </li>
          <li>
            <a href="#projects" className="cursor-none">
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="cursor-none">
              Contact
            </a>
          </li>
          <li>
            <AnimatedThemeToggler />
          </li>
        </ul>
      </div>
    </motion.nav>
  );
}
