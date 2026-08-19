import { cn } from "@/shared/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-[min(1280px,calc(100%-48px))] max-[600px]:w-[min(calc(100%-30px),1280px)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
