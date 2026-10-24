import { cn } from "@/shared/lib/cn";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "a";
  href?: string;
  style?: React.CSSProperties;
  tabIndex?: number;
};

export function GlassCard({
  children,
  className,
  as = "div",
  href,
  style,
  tabIndex,
}: GlassCardProps) {
  const classes = cn(
    "glass rounded-3xl transition-transform duration-300",
    className,
  );

  if (as === "a" && href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        style={style}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  const Tag = as === "article" ? "article" : "div";
  return (
    <Tag className={classes} style={style} tabIndex={tabIndex}>
      {children}
    </Tag>
  );
}
