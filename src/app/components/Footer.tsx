import type { Dictionary } from "@/app/i18n/dictionaries";

type FooterProps = {
  copy: Dictionary["footer"];
};

export default function Footer({ copy }: FooterProps) {
  return (
    <footer className="relative mt-auto shrink-0 border-t-2 border-foreground bg-secondary py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 text-center text-sm text-secondary-foreground">
        <p className="text-secondary-foreground">
          @ {new Date().getFullYear()} Fiddelis. {copy.rights}
        </p>
      </div>
    </footer>
  );
}
