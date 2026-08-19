"use client";

type ScrollTopLinkProps = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollTopLink({ children, className }: ScrollTopLinkProps) {
  return (
    <a
      href="#top"
      className={className}
      onClick={(event) => {
        event.preventDefault();
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }}
    >
      {children}
    </a>
  );
}
