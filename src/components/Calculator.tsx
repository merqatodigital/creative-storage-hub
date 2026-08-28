import { useMemo, useState } from "react";
import { useContent } from "../content/ContentContext";
import { cn } from "../utils/cn";
import { SectionHeading } from "./SectionHeading";
import { useSectionStyle } from "../theme/useSectionStyle";

const MEMBER_POOL_UNITS = 2800;
const TOTAL_UNITS = 4400;
const OCCUPANCY = 55;
const PEBBLE_TO_NIGHT = 1000 / 6;

const currency = (n: number) => `₱${Math.round(n).toLocaleString("en-US")}`;

export function Calculator() {
  const { content } = useContent();
  const { calculator, tiersSection } = content;
  const tiers = tiersSection.tiers;
  const [activeId, setActiveId] = useState(tiers[0]?.id ?? "");
  const tier = useMemo(() => tiers.find((t) => t.id === activeId) ?? tiers[0], [activeId, tiers]);
  const style = useSectionStyle("calculator");

  if (!tier) return null;

  const poolShare = ((tier.unitsValue / MEMBER_POOL_UNITS) * 100).toFixed(1);
  const returnLow = tier.priceValue * 0.17;
  const returnHigh = tier.priceValue * 0.2;
  const nights = Math.round(tier.pebblesValue / PEBBLE_TO_NIGHT);

  return (
    <section id="calculator" style={style} className="section-spacing bg-sand-50">
      <div className="section-container">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
          <SectionHeading eyebrow={calculator.eyebrow} title={calculator.title} />
          <div className="flex flex-wrap gap-2">
            {tiers.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.15em] transition-all",
                  t.id === tier.id ? "bg-ink-900 text-white shadow" : "bg-white text-ink-900/50 hover:bg-ink-900/5 hover:text-ink-900"
                )}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div data-theme-table="calculator" className="mt-10 grid gap-6 rounded-[24px] bg-white p-6 shadow-[0_8px_40px_-16px_rgba(0,0,0,0.12)] md:mt-14 md:grid-cols-3 md:p-8 lg:p-10">
          <div className="flex flex-col gap-8 md:col-span-2 md:grid md:grid-cols-3 md:gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-ink-900/40">Investment</span>
              <span className="font-serif text-[28px] font-light leading-none">{tier.price}</span>
              <span className="text-[11px] text-ink-900/40">{tier.numeral} · {tier.tagline}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-ink-900/40">Your share</span>
              <span className="font-serif text-[28px] font-light leading-none">{poolShare}%</span>
              <span className="text-[11px] text-ink-900/40">{tier.units} units · {tier.pebbles} pebbles</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-ink-900/40">Projected return</span>
              <span className="font-serif text-[28px] font-light leading-none">{currency(returnLow)} – {currency(returnHigh)}</span>
              <span className="text-[11px] text-ink-900/40">17–20% ROI · {OCCUPANCY}% occupancy</span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 rounded-2xl bg-ink-900 p-6 text-sand-50 md:p-7">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-sand-100/50">Experience</span>
              <p className="mt-3 font-serif text-[22px] font-light leading-[1.2]">~{nights} suite nights per year</p>
            </div>
            <p className="text-[11px] leading-[1.6] text-sand-100/50">Or shorter stays + dining, spa, boat trips. Pebbles renewed every 10 July.</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-6 text-[11px] uppercase tracking-wide text-ink-900/40 md:gap-10">
          <span>{TOTAL_UNITS.toLocaleString()} total units</span>
          <span>{MEMBER_POOL_UNITS.toLocaleString()} member units</span>
          <span>60% member profit share</span>
          <span>{OCCUPANCY}% occupancy</span>
        </div>
      </div>
    </section>
  );
}
