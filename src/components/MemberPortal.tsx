import { useContent } from "../content/ContentContext";
import { Eyebrow } from "./SectionHeading";
import { useSectionStyle } from "../theme/useSectionStyle";

export function MemberPortal() {
  const { content } = useContent();
  const { memberPortal } = content;
  const style = useSectionStyle("memberPortal");
  return (
    <section id="portal" style={style} className="section-spacing bg-ink-900 text-sand-50">
      <div className="section-container">
        <div className="flex max-w-2xl flex-col gap-4 md:gap-5">
          <Eyebrow light>{memberPortal.eyebrow}</Eyebrow>
          <h2 className="heading-display text-sand-50">{memberPortal.title}</h2>
          <p className="text-[14px] font-light leading-[1.8] text-sand-100/70 md:text-[15px]">{memberPortal.description}</p>
        </div>

        <div data-theme-table="memberPortal" className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:gap-12 lg:gap-16 xl:gap-20">
          <div>
            <span className="eyebrow text-bronze-400">{memberPortal.bookingTitle}</span>
            <ul className="mt-5 flex flex-col divide-y divide-sand-50/10 border-t border-sand-50/10 md:mt-6">
              {memberPortal.booking.map((item, i) => (
                <li key={i} className="flex gap-3 py-4 text-[13px] font-light leading-[1.6] text-sand-100/70 md:gap-4 md:py-5 md:text-[14px]">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-bronze-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="eyebrow text-bronze-400">{memberPortal.financeTitle}</span>
            <ul className="mt-5 flex flex-col divide-y divide-sand-50/10 border-t border-sand-50/10 md:mt-6">
              {memberPortal.finance.map((item, i) => (
                <li key={i} className="flex gap-3 py-4 text-[13px] font-light leading-[1.6] text-sand-100/70 md:gap-4 md:py-5 md:text-[14px]">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-bronze-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
