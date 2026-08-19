import { site } from "@/shared/config";
import type { Dictionary } from "@/shared/i18n";

type FooterProps = {
  note: Dictionary["footer"]["note"];
};

export function Footer({ note }: FooterProps) {
  return (
    <footer className="flex justify-between pt-6 pb-[34px] text-[11px] text-muted max-[600px]:flex-col max-[600px]:gap-3">
      <span>{site.copyright}</span>
      <span>{note}</span>
    </footer>
  );
}
