import { useContent } from "../content/ContentContext";
import { Eyebrow } from "./SectionHeading";
import { Media } from "./Media";
import { useSectionStyle } from "../theme/useSectionStyle";

export function Retreat() {
  const { content } = useContent();
  const { retreat } = content;
  const style = useSectionStyle("retreat");
  return (
    <section id="retreat" style={style} className="section-spacing bg-sand-50">
      <div className="section-container">
        <div className="flex max-w-2xl flex-col gap-4 md:gap-5">
          <Eyebrow>{retreat.eyebrow}</Eyebrow>
          <h2 className="heading-display text-ink-900">{retreat.title}</h2>
          <p className="text-[14px] font-light leading-[1.8] text-ink-900/70 md:text-[15px]">{retreat.description}</p>
        </div>

        <div className="mt-8 flex gap-10 md:mt-10 md:gap-16">
          <div className="flex flex-col gap-1">
            <span className="font-serif text-[36px] font-light leading-none text-bronze-600 md:text-[44px]">{retreat.suites}</span>
            <span className="text-[11px] uppercase tracking-[0.15em] text-ink-900/60 md:text-xs md:tracking-[0.2em]">Suites</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-serif text-[36px] font-light leading-none text-bronze-600 md:text-[44px]">{retreat.villas}</span>
            <span className="text-[11px] uppercase tracking-[0.15em] text-ink-900/60 md:text-xs md:tracking-[0.2em]">Villas</span>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-6 lg:gap-8">
          <div className="flex flex-col gap-4">
            <Media value={retreat.suiteImage} className="aspect-[4/3] shadow-lg shadow-black/10 md:aspect-[4/3]" />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <h3 className="font-serif text-[19px] font-light text-ink-900 md:text-[20px]">{retreat.suiteLabel}</h3>
              <span className="eyebrow text-bronze-600">{retreat.suiteUnlock}</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Media value={retreat.villaImage} className="aspect-[4/3] shadow-lg shadow-black/10 md:aspect-[4/3]" />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <h3 className="font-serif text-[19px] font-light text-ink-900 md:text-[20px]">{retreat.villaLabel}</h3>
              <span className="eyebrow text-bronze-600">{retreat.villaUnlock}</span>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-[14px] font-light leading-[1.8] text-ink-900/60 md:mt-14 md:text-[15px]">{retreat.footnote}</p>

        <div className="mt-10 grid grid-cols-2 gap-6 border-t border-ink-900/10 pt-8 md:mt-14 md:grid-cols-4 md:gap-8 md:pt-10">
          {retreat.stats.map((s, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="font-serif text-[22px] font-light leading-tight text-ink-900 md:text-[24px]">{s.value}</span>
              <span className="text-[10px] uppercase tracking-[0.1em] text-ink-900/50 md:text-[11px] md:tracking-[0.12em]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
