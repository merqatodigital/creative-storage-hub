import { useContent } from "../content/ContentContext";
import { Eyebrow } from "./SectionHeading";
import { Media } from "./Media";
import { useSectionStyle } from "../theme/useSectionStyle";

export function CircleIntro() {
  const { content } = useContent();
  const { circle } = content;
  const style = useSectionStyle("circle");
  return (
    <section id="circle" style={style} className="section-spacing relative overflow-hidden bg-ink-900 text-sand-50">
      <div className="absolute inset-0 opacity-20">
        <Media value={circle.backgroundMedia} rounded={false} className="h-full w-full" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900/95 to-ink-900" />

      <div className="section-container relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Eyebrow light>{circle.eyebrow}</Eyebrow>
          </div>
          <h2 className="heading-display mt-5 md:mt-6 text-sand-50">{circle.heading}</h2>
          <div className="mt-6 flex flex-col gap-4 md:mt-8 md:gap-5">
            {circle.paragraphs.map((p, i) => (
              <p key={i} className="text-[14px] font-light leading-[1.8] text-sand-100/70 md:text-[15px]">{p}</p>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-sand-50/10 bg-sand-50/10 md:mt-20 md:grid-cols-2 lg:mt-24">
          <div className="flex flex-col gap-3 bg-ink-900 p-7 md:gap-4 md:p-10 lg:p-12">
            <span className="eyebrow text-bronze-400">{circle.unitTitle}</span>
            <h3 className="font-serif text-[20px] font-light leading-tight text-sand-50 md:text-[22px]">{circle.unitSubtitle}</h3>
            <p className="text-[13px] font-light leading-[1.7] text-sand-100/60 md:text-[14px]">{circle.unitBody}</p>
          </div>
          <div className="flex flex-col gap-3 bg-ink-900 p-7 md:gap-4 md:p-10 lg:p-12">
            <span className="eyebrow text-bronze-400">{circle.renewalTitle}</span>
            <h3 className="font-serif text-[20px] font-light leading-tight text-sand-50 md:text-[22px]">{circle.renewalSubtitle}</h3>
            <p className="text-[13px] font-light leading-[1.7] text-sand-100/60 md:text-[14px]">{circle.renewalBody}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
