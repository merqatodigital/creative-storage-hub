import type { SocialLink } from "../content/types";
import { cn } from "../utils/cn";

type IconName =
  | "instagram"
  | "facebook"
  | "youtube"
  | "linkedin"
  | "tiktok"
  | "x"
  | "website";

function identifyLink(link: SocialLink): IconName {
  const value = `${link.label} ${link.url}`.toLowerCase();
  if (value.includes("instagram")) return "instagram";
  if (value.includes("facebook") || value.includes("fb.com")) return "facebook";
  if (value.includes("youtube") || value.includes("youtu.be")) return "youtube";
  if (value.includes("linkedin")) return "linkedin";
  if (value.includes("tiktok")) return "tiktok";
  if (value.includes("twitter") || value.includes("x.com")) return "x";
  return "website";
}

function normalizeUrl(url: string) {
  const value = url.trim();
  if (!value) return "#";
  if (/^(https?:|mailto:|tel:)/i.test(value)) return value;
  return `https://${value}`;
}

export function SocialLinks({
  links,
  light = false,
  className,
}: {
  links: SocialLink[];
  light?: boolean;
  className?: string;
}) {
  const visibleLinks = links.filter((link) => link.url.trim());
  if (!visibleLinks.length) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {visibleLinks.map((link, index) => (
        <a
          key={`${link.url}-${index}`}
          href={normalizeUrl(link.url)}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label || "Website link"}
          title={link.label || link.url}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
            light
              ? "border-white/15 text-white/60 hover:border-white/35 hover:text-white"
              : "border-ink-900/10 text-ink-900/50 hover:border-ink-900/30 hover:text-ink-900"
          )}
        >
          <SocialIcon name={identifyLink(link)} />
        </a>
      ))}
    </div>
  );
}

function SocialIcon({ name }: { name: IconName }) {
  const common = {
    width: 14,
    height: 14,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "instagram") {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "facebook") {
    return (
      <svg {...common}>
        <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1Z" />
      </svg>
    );
  }
  if (name === "youtube") {
    return (
      <svg {...common}>
        <path d="M21 12c0 3.5-.4 5.5-1.1 6.2-.8.8-3.2 1-7.9 1s-7.1-.2-7.9-1C3.4 17.5 3 15.5 3 12s.4-5.5 1.1-6.2c.8-.8 3.2-1 7.9-1s7.1.2 7.9 1C20.6 6.5 21 8.5 21 12Z" />
        <path d="m10 9 5 3-5 3Z" />
      </svg>
    );
  }
  if (name === "linkedin") {
    return (
      <svg {...common}>
        <path d="M6 9v10M6 5v.1M10 19v-6c0-2 1.2-4 3.8-4 2.2 0 4.2 1.3 4.2 4.5V19M10 10v9" />
      </svg>
    );
  }
  if (name === "tiktok") {
    return (
      <svg {...common}>
        <path d="M15 4v10.5a4.5 4.5 0 1 1-4-4.47" />
        <path d="M15 4c.5 2.5 2 4 4.5 4.5" />
      </svg>
    );
  }
  if (name === "x") {
    return (
      <svg {...common}>
        <path d="M5 4 19 20M19 4 5 20" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9S14.5 18.5 12 21M12 3C9.5 5.5 8.5 8.5 8.5 12S9.5 18.5 12 21" />
    </svg>
  );
}