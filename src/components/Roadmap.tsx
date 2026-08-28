import { useContent } from "../content/ContentContext";
import { SectionHeading } from "./SectionHeading";
import { useSectionStyle } from "../theme/useSectionStyle";

export function Roadmap() {
  const { content } = useContent();
  const { roadmap } = content;
  const style = useSectionStyle("roadmap");
  return (
    <section id="roadmap" style={style} className="section-spacing bg-ink-900 text-sand-50">
      <div className="section-container">
        <div className="mx-auto max-w-4xl">
          <SectionHeading light align="center" eyebrow={roadmap.eyebrow} title={roadmap.title} className="mx-auto" />

          <div data-theme-table="roadmap" className="mt-10 flex flex-col md:mt-16">
            {roadmap.items.map((r, i) => (
              <div key={i} className="group flex flex-col gap-2 border-t border-sand-50/10 py-6 md:flex-row md:items-center md:gap-6 md:py-6 lg:gap-10">
                <span className="font-serif text-[20px] font-light leading-none text-bronze-400 md:w-20 md:shrink-0 md:text-[22px] lg:w-24">{r.year}</span>
                <h3 className="font-serif text-[16px] font-light leading-tight text-sand-50 md:w-[260px] md:shrink-0 md:text-[17px] lg:w-80">{r.title}</h3>
                <p className="text-[13px] font-light leading-[1.7] text-sand-100/60 md:text-[14px]">{r.description}</p>
              </div>
            ))}
            <div className="border-t border-sand-50/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
