import { cn } from "../utils/cn";

export function Eyebrow({
  children,
  className,
  light,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "eyebrow flex items-center gap-2.5 md:gap-3",
        light ? "text-sand-100/70" : "text-bronze-600",
        className
      )}
    >
      <span className="divider-line" />
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  light?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && <Eyebrow light={light ?? false}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "heading-display max-w-3xl",
          light ? "text-sand-50" : "text-ink-900"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-xl text-[14px] font-light leading-[1.7] md:text-[15px] lg:text-base",
            light ? "text-sand-100/70" : "text-ink-900/60"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
