import type { Dictionary } from "@/app/i18n/dictionaries";
import Image from "next/image";

type FooterProps = {
  copy: Dictionary["footer"];
};

export default function Footer({ copy }: FooterProps) {
  return (
    <footer className="relative mt-12 pb-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Fiddelis. {copy.rights}
        </p>
      </div>
    </footer>
  );
}
