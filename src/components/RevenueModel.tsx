import { useContent } from "../content/ContentContext";
import { SectionHeading } from "./SectionHeading";
import { useSectionStyle } from "../theme/useSectionStyle";

export function RevenueModel() {
  const { content } = useContent();
  const { revenue } = content;
  const style = useSectionStyle("revenue");
  return (
    <section id="revenue" style={style} className="section-spacing bg-sand-50">
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.9fr] lg:items-start lg:gap-16">
          <SectionHeading eyebrow={revenue.eyebrow} title={revenue.title} description={revenue.description} />

          <div data-theme-table="revenueRates" className="flex flex-col gap-10">
            <div>
              <p className="text-[11px] font-light italic text-ink-900/40 md:text-xs">{revenue.tableNote}</p>
              <div className="mt-6 flex flex-col gap-8 md:gap-10">
                {revenue.rateRows.map((r, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <h3 className="font-serif text-[24px] font-light md:text-[26px]">{r.type}</h3>
                    <div className="grid grid-cols-3 gap-6 border-t border-ink-900/10 pt-5">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-[0.15em] text-ink-900/40">Low</span>
                        <span className="font-serif text-[18px] font-light md:text-[20px]">{r.low}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-[0.15em] text-ink-900/40">High</span>
                        <span className="font-serif text-[18px] font-light md:text-[20px]">{r.high}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-[0.15em] text-ink-900/40">Peak</span>
                        <span className="font-serif text-[18px] font-light md:text-[20px]">{r.peak}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-8 border-t border-ink-900/10 pt-10 md:grid-cols-3 md:pt-12">
              {revenue.stats.map((s, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <span className="font-serif text-[40px] font-light leading-none tracking-tight md:text-[44px]">{s.value}</span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-ink-900">{s.label}</span>
                  <span className="text-[11px] font-light leading-[1.5] text-ink-900/50">{s.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
