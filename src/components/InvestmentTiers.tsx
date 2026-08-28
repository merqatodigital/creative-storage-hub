import { cn } from "../utils/cn";
import { useContent } from "../content/ContentContext";
import { SectionHeading } from "./SectionHeading";
import { useSectionStyle } from "../theme/useSectionStyle";

export function InvestmentTiers() {
  const { content } = useContent();
  const { tiersSection } = content;
  const style = useSectionStyle("tiers");
  return (
    <section id="model" style={style} className="section-spacing bg-ink-900 text-sand-50">
      <div className="section-container">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
          <SectionHeading light eyebrow={tiersSection.eyebrow} title={tiersSection.title} description={tiersSection.description} />
          <p className="hidden max-w-[280px] text-[12px] font-light leading-[1.6] text-sand-100/40 md:block">Compare the membership tiers. All include annual Pebbles and profit share.</p>
        </div>

        <div data-theme-table="investmentTiers" className="mt-10 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {tiersSection.tiers.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                "group flex flex-col rounded-[20px] p-6 transition-all duration-500 md:p-7",
                tier.featured
                  ? "bg-sand-50 text-ink-900 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]"
                  : "bg-white/[0.04] text-sand-50 backdrop-blur hover:bg-white/[0.06]"
              )}
            >
              <div className="flex items-start justify-between">
                <span className={cn("rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.15em]", tier.featured ? "bg-ink-900/10 text-ink-900/60" : "bg-white/10 text-sand-100/50")}>
                  {tier.numeral}
                </span>
                {tier.featured && <span className="h-1.5 w-1.5 rounded-full bg-bronze-500" />}
              </div>

              <h3 className="mt-6 font-serif text-[28px] font-light leading-none tracking-tight">{tier.name}</h3>
              <p className="mt-2 font-serif text-[22px] font-light leading-none">{tier.price}</p>
              <p className={cn("mt-2 text-[11px] font-light", tier.featured ? "text-ink-900/50" : "text-sand-100/40")}>{tier.tagline}</p>

              <div className="mt-8 flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-ink-900/10 py-3 text-[12px] last:border-0 group-[.bg-white\/\[0\.04\]]:border-white/10">
                  <span className={cn(tier.featured ? "text-ink-900/50" : "text-sand-100/40")}>Units</span>
                  <span className="font-medium">{tier.units}</span>
                </div>
                <div className="flex items-center justify-between border-b border-ink-900/10 py-3 text-[12px] last:border-0 group-[.bg-white\/\[0\.04\]]:border-white/10">
                  <span className={cn(tier.featured ? "text-ink-900/50" : "text-sand-100/40")}>Pebbles</span>
                  <span className="font-medium">{tier.pebbles}</span>
                </div>
                <div className="flex items-center justify-between py-3 text-[12px]">
                  <span className={cn(tier.featured ? "text-ink-900/50" : "text-sand-100/40")}>Return</span>
                  <span className="font-medium">{tier.returnTarget}</span>
                </div>
              </div>

              <div className="mt-auto pt-6">
                {tier.note && <p className={cn("mb-3 text-[11px] italic", tier.featured ? "text-bronze-600" : "text-bronze-400")}>{tier.note}</p>}
                <a
                  href="#join"
                  className={cn(
                    "flex w-full items-center justify-center rounded-full py-3 text-[11px] uppercase tracking-[0.15em] transition-colors",
                    tier.featured ? "bg-ink-900 text-white hover:bg-ink-800" : "bg-white text-ink-900 hover:bg-sand-50"
                  )}
                >
                  {tier.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
