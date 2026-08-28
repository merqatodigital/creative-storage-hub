import { useContent } from "../content/ContentContext";
import { SectionHeading } from "./SectionHeading";
import { useSectionStyle } from "../theme/useSectionStyle";

export function Pebbles() {
  const { content } = useContent();
  const { pebbles } = content;
  const style = useSectionStyle("pebbles");
  return (
    <section id="pebbles" style={style} className="section-spacing bg-sand-50">
      <div className="section-container">
        <SectionHeading eyebrow={pebbles.eyebrow} title={pebbles.title} description={pebbles.description} />

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8 lg:gap-12">
          {pebbles.usages.map((u, i) => (
            <div key={i} className="group flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink-900/10 text-[11px] font-light text-ink-900/60 group-hover:border-bronze-400 group-hover:text-bronze-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 bg-ink-900/10" />
              </div>
              <h3 className="font-serif text-[20px] font-light leading-tight text-ink-900 md:text-[22px]">{u.title}</h3>
              <p className="text-[13px] font-light leading-[1.7] text-ink-900/60 md:text-[14px]">{u.description}</p>
            </div>
          ))}
        </div>

        <div data-theme-table="pebbleRates" className="mt-16 md:mt-24">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-ink-900/15" />
            <span className="eyebrow text-ink-900/40">Pebbles per night</span>
          </div>

          <div className="mt-8 grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            {pebbles.tables.map((p, i) => (
              <div key={i} className="flex flex-col">
                <h3 className="font-serif text-[28px] font-light leading-none text-ink-900 md:text-[32px]">{p.title}</h3>
                <div className="mt-8 flex flex-col">
                  {p.rows.map((row, j) => (
                    <div key={j} className="group flex items-baseline justify-between gap-4 border-b border-ink-900/10 py-5 last:border-0 md:py-6">
                      <span className="text-[13px] font-light tracking-wide text-ink-900/50 md:text-[14px]">{row.label}</span>
                      <span className="font-serif text-[36px] font-light leading-none text-ink-900 transition-colors group-hover:text-bronze-600 md:text-[42px]">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
