import { useContent } from "../content/ContentContext";
import { Media } from "./Media";
import { useSectionStyle } from "../theme/useSectionStyle";

const POSITION_MAP: Record<string, string> = {
  "top-left": "justify-start items-start pt-24 md:pt-28 lg:pt-32 px-6 md:px-8 lg:px-10",
  "top-center": "justify-center items-start pt-24 md:pt-28 lg:pt-32",
  "top-right": "justify-end items-start pt-24 md:pt-28 lg:pt-32 px-6 md:px-8 lg:px-10",
  "center-left": "justify-start items-center px-6 md:px-8 lg:px-10",
  "center": "justify-center items-center",
  "center-right": "justify-end items-center px-6 md:px-8 lg:px-10",
  "bottom-left": "justify-start items-end pb-32 md:pb-36 lg:pb-32 px-6 md:px-8 lg:px-10",
  "bottom-center": "justify-center items-end pb-32 md:pb-36 lg:pb-32",
  "bottom-right": "justify-end items-end pb-32 md:pb-36 lg:pb-32 px-6 md:px-8 lg:px-10",
};

export function Hero() {
  const { content } = useContent();
  const { hero, header } = content;
  const style = useSectionStyle("hero");

  const hasLogo = !!(hero.logoImage.src || header.logoImage.src);
  const isAboveTitle = hero.logoPosition === "above-title" || !hero.logoPosition;

  const renderLogoImg = () => {
    if (hero.logoImage.src) {
      return <img src={hero.logoImage.src} alt={hero.logoImage.alt || header.logo} className="max-w-[75vw] object-contain md:max-w-[40vw] lg:max-w-none" style={{ height: `${hero.logoSize}px`, width: "auto" }} />;
    }
    if (header.logoImage.src) {
      return <img src={header.logoImage.src} alt={header.logoImage.alt || header.logo} className="max-w-[75vw] object-contain brightness-[8] md:max-w-[40vw] lg:max-w-none" style={{ height: `${hero.logoSize}px`, width: "auto" }} />;
    }
    return null;
  };

  return (
    <section id="vision" style={style} className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink-900">
      <div className="absolute inset-0">
        <Media value={hero.media} rounded={false} className="h-full w-full" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-ink-900/30" />

      {/* Desktop/tablet positioned logo */}
      {hero.showLogo && hasLogo && !isAboveTitle && (
        <>
          {/* Mobile: always above title to avoid overlap */}
          <div className="relative z-20 flex w-full px-6 pb-6 md:hidden">
            <div className="mx-auto">{renderLogoImg()}</div>
          </div>
          {/* Tablet/desktop: use chosen position */}
          <div className={`pointer-events-none absolute inset-0 z-20 hidden md:flex ${POSITION_MAP[hero.logoPosition] || POSITION_MAP["top-left"]}`}>
          <div
            style={{ transform: `translate(${hero.logoOffsetX || 0}px, ${hero.logoOffsetY || 0}px)` }}
            className="pointer-events-auto"
          >
            {renderLogoImg()}
          </div>
        </div>
      </>
      )}

      <div className="section-container relative z-10 flex w-full flex-col gap-8 pb-12 pt-28 md:gap-10 md:pb-16 md:pt-32 lg:gap-12 lg:pb-20 lg:pt-40">
        {hero.showLogo && isAboveTitle && hasLogo && <div>{renderLogoImg()}</div>}

        <div className="eyebrow flex items-center gap-2.5 text-sand-100/80 md:gap-3">
          <span className="divider-line" />
          {hero.eyebrow}
        </div>

        <h1 className="heading-display-lg max-w-4xl text-sand-50">{hero.title}</h1>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
          <p className="max-w-md text-[14px] font-light leading-[1.7] text-sand-100/70 md:text-[15px]">{hero.tagline}</p>
          <a href={hero.ctaHref} className="inline-flex shrink-0 items-center justify-center rounded-full bg-bronze-400 px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-ink-900 transition-transform hover:scale-[1.02] md:px-8 md:py-4">
            {hero.cta}
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-10 hidden flex-col items-center gap-3 text-sand-50/50 md:bottom-8 md:right-8 lg:flex">
        <span className="eyebrow rotate-90">Scroll</span>
        <span className="h-12 w-px bg-sand-50/30 md:h-14" />
      </div>
    </section>
  );
}
