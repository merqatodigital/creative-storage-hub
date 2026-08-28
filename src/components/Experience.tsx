import { useContent } from "../content/ContentContext";
import { SectionHeading } from "./SectionHeading";
import { Media } from "./Media";
import { useSectionStyle } from "../theme/useSectionStyle";

export function Experience() {
  const { content } = useContent();
  const { experience } = content;
  const style = useSectionStyle("experience");
  return (
    <section id="experience" style={style} className="section-spacing bg-sand-50">
      <div className="section-container">
        <div className="grid gap-8 md:gap-10 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
          <Media value={experience.image} className="aspect-[4/3] shadow-xl shadow-black/10 md:aspect-[4/3] lg:order-2 lg:aspect-[4/3]" />
          <div className="lg:order-1">
            <SectionHeading eyebrow={experience.eyebrow} title={experience.title} />
          </div>
        </div>

        <div className="mt-10 grid gap-8 border-t border-ink-900/10 pt-8 md:mt-14 md:grid-cols-2 md:gap-8 md:pt-10 lg:mt-16 lg:grid-cols-5 lg:gap-6 xl:gap-8">
          {experience.items.map((e, i) => (
            <div key={i} className="flex flex-col gap-2 md:gap-2.5">
              <h3 className="font-serif text-[17px] font-light text-ink-900 md:text-[18px]">{e.title}</h3>
              <p className="text-[13px] font-light leading-[1.7] text-ink-900/60 md:text-[14px]">{e.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
