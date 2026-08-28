import { useContent } from "../content/ContentContext";
import { Eyebrow } from "./SectionHeading";
import { Media } from "./Media";
import { useSectionStyle } from "../theme/useSectionStyle";

export function FirstChapter() {
  const { content } = useContent();
  const { firstChapter } = content;
  const style = useSectionStyle("firstChapter");
  return (
    <section id="first-chapter" style={style} className="section-spacing bg-sand-50">
      <div className="section-container">
        <div className="grid gap-8 md:gap-10 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-16">
          <div className="flex flex-col gap-4 md:gap-5">
            <Eyebrow>{firstChapter.eyebrow}</Eyebrow>
            <h2 className="heading-display italic text-ink-900">{firstChapter.title}</h2>
            <div className="mt-2 flex flex-col gap-4 text-[14px] font-light leading-[1.8] text-ink-900/70 md:gap-5 md:text-[15px]">
              {firstChapter.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <Media value={firstChapter.image} className="aspect-[4/3] shadow-xl shadow-black/10 md:aspect-[16/12] lg:aspect-[4/3]" />
        </div>
      </div>
    </section>
  );
}
