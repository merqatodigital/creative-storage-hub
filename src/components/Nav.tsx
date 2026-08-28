import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { useContent } from "../content/ContentContext";
import { SocialLinks } from "./SocialLinks";

export function Nav({ onOpenAdmin }: { onOpenAdmin: () => void }) {
  const { content } = useContent();
  const { header } = content;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="site-header"
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        open ? "bg-ink-900/95 py-3 shadow-lg shadow-black/20 backdrop-blur" : "bg-transparent py-4 md:py-6",
        scrolled && !open && "bg-transparent backdrop-blur-[2px]"
      )}
    >
      <div className="section-container flex items-center justify-between">
        <button onClick={onOpenAdmin} title="Admin" className="flex items-center">
          {header.logoImage.src ? (
            <img src={header.logoImage.src} alt={header.logo} className="max-h-[80px] object-contain" style={{ height: `${header.logoSize}px`, width: "auto" }} />
          ) : (
            <span className="font-serif tracking-[0.2em] text-sand-50" style={{ fontSize: `${header.logoSize}px` }}>
              {header.logo}
            </span>
          )}
        </button>

        <nav className="hidden items-center gap-7 lg:flex">
          {header.nav.map((l) => (
            <a key={l.label + l.href} href={l.href} className="eyebrow text-sand-100/80 transition-colors hover:text-bronze-400">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <SocialLinks
            links={header.socialLinks}
            light
            className="hidden xl:flex"
          />
          <a
            href={header.ctaHref}
            className="hidden rounded-full border border-bronze-400/60 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-sand-50 transition-all hover:border-bronze-400 hover:bg-bronze-400 hover:text-ink-900 md:inline-flex lg:px-6"
          >
            {header.cta}
          </a>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-50/20 text-sand-50 lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3.5 w-4">
              <span className={cn("absolute left-0 top-0 h-px w-full bg-sand-50 transition-all", open && "top-1.5 rotate-45")} />
              <span className={cn("absolute left-0 top-1.5 h-px w-full bg-sand-50 transition-opacity", open && "opacity-0")} />
              <span className={cn("absolute left-0 top-3 h-px w-full bg-sand-50 transition-all", open && "top-1.5 -rotate-45")} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-sand-50/10 bg-ink-900 px-6 py-8">
          <div className="flex flex-col gap-1">
            {header.nav.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm tracking-wide text-sand-100/80 hover:bg-sand-50/5 hover:text-sand-50">
                {l.label}
              </a>
            ))}
            <SocialLinks
              links={header.socialLinks}
              light
              className="mt-4 border-t border-white/10 pt-5"
            />
            <a href={header.ctaHref} onClick={() => setOpen(false)} className="mt-4 rounded-full bg-bronze-400 px-6 py-3.5 text-center text-xs uppercase tracking-[0.2em] text-ink-900">
              {header.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
