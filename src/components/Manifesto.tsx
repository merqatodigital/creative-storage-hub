import { useContent } from "../content/ContentContext";
import { Eyebrow } from "./SectionHeading";
import { Media } from "./Media";
import { useSectionStyle } from "../theme/useSectionStyle";

export function Manifesto() {
  const { content } = useContent();
  const { manifesto } = content;
  const style = useSectionStyle("manifesto");
  return (
    <section id="manifesto" style={style} className="section-spacing bg-sand-50">
      <div className="section-container">
        <div className="grid gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div className="flex flex-col gap-4 md:gap-6">
            <Eyebrow>{manifesto.eyebrow1}</Eyebrow>
            <h2 className="heading-display text-ink-900">{manifesto.heading1}</h2>
          </div>
          <div className="flex flex-col gap-5 text-[14px] font-light leading-[1.8] text-ink-900/70 md:text-[15px]">
            {manifesto.paragraphs1.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-10 md:mt-20 md:gap-12 lg:mt-28 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div className="flex flex-col gap-6 md:gap-8">
            <Eyebrow>{manifesto.eyebrow2}</Eyebrow>
            <p className="font-serif text-[22px] font-light italic leading-[1.3] text-ink-900 md:text-[26px] lg:text-[28px]">{manifesto.quote}</p>
            <div className="flex flex-col gap-5 text-[14px] font-light leading-[1.8] text-ink-900/70 md:text-[15px]">
              {manifesto.paragraphs2.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 self-start sm:gap-4 md:gap-5">
            <Media value={manifesto.image1} className="mt-8 aspect-[3/4] shadow-lg shadow-black/10 md:mt-10 md:aspect-[4/5]" />
            <Media value={manifesto.image2} className="aspect-[3/4] shadow-lg shadow-black/10 md:aspect-[4/5]" />
          </div>
        </div>
      </div>
    </section>
  );
}
