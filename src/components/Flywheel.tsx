import { useContent } from "../content/ContentContext";
import { SectionHeading } from "./SectionHeading";
import { useSectionStyle } from "../theme/useSectionStyle";

export function Flywheel() {
  const { content } = useContent();
  const { flywheel } = content;
  const style = useSectionStyle("flywheel");
  return (
    <section id="flywheel" style={style} className="section-spacing bg-ink-900 text-sand-50">
      <div className="section-container">
        <SectionHeading light align="left" eyebrow={flywheel.eyebrow} title={flywheel.title} className="max-w-2xl" />

        <div className="relative mt-12 md:mt-20">
          <div className="hidden h-px w-full bg-gradient-to-r from-transparent via-sand-50/20 to-transparent md:block" />
          <div className="grid gap-8 md:mt-10 md:grid-cols-3 md:gap-8 lg:grid-cols-6 lg:gap-6">
            {flywheel.steps.map((s, i) => (
              <div key={i} className="group relative flex flex-col gap-3 md:gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-[14px] tracking-wide text-bronze-400">{s.n}</span>
                  <span className="hidden h-px w-8 bg-sand-50/20 md:block lg:hidden" />
                  <span className="flex h-1.5 w-1.5 rounded-full bg-sand-50/20 group-hover:bg-bronze-400" />
                </div>
                <h3 className="font-serif text-[16px] font-light leading-[1.3] text-sand-50 md:text-[17px]">{s.title}</h3>
                <div className="h-px w-12 bg-sand-50/10 md:w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
