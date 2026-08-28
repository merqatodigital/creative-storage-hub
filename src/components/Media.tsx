import type { MediaValue } from "../content/types";
import { cn } from "../utils/cn";

export function Media({
  value,
  className,
  imgClassName,
  ratio,
  rounded = true,
}: {
  value: MediaValue;
  className?: string;
  imgClassName?: string;
  ratio?: string;
  rounded?: boolean;
}) {
  const wrapperClass = cn(
    "relative overflow-hidden bg-sand-100",
    rounded && "rounded-[20px]",
    ratio,
    className
  );

  if (value.type === "image" && value.src) {
    return (
      <div className={wrapperClass}>
        <img src={value.src} alt={value.alt} className={cn("h-full w-full object-cover", imgClassName)} loading="lazy" />
      </div>
    );
  }
  if (value.type === "video" && value.src) {
    return (
      <div className={wrapperClass}>
        <video src={value.src} autoPlay muted loop playsInline className={cn("h-full w-full object-cover", imgClassName)} aria-label={value.alt} />
      </div>
    );
  }

  return (
    <div className={cn(wrapperClass, "flex min-h-[200px] items-center justify-center border border-dashed border-ink-900/10 bg-white md:min-h-[260px]")}>
      <div className="flex flex-col items-center gap-2.5 p-6 text-center text-ink-900/30">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand-100">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}>
            <rect x="3" y="4" width="18" height="16" rx="3" />
            <circle cx="9" cy="10" r="1.2" />
            <path d="m21 16-5-4-4 3-3-2-6 5" />
          </svg>
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em]">Add image or video</span>
        {value.alt && <span className="max-w-[200px] text-[11px] font-light italic leading-snug text-ink-900/40">{value.alt}</span>}
      </div>
    </div>
  );
}
