import { useState } from "react";
import { useContent } from "../content/ContentContext";
import { cn } from "../utils/cn";
import { SectionHeading } from "./SectionHeading";
import { useSectionStyle } from "../theme/useSectionStyle";

export function FAQ() {
  const { content } = useContent();
  const { faq } = content;
  const [open, setOpen] = useState<number | null>(0);
  const style = useSectionStyle("faq");

  return (
    <section id="faq" style={style} className="section-spacing bg-ink-900 text-sand-50">
      <div className="section-container">
        <div className="mx-auto max-w-3xl">
          <SectionHeading light eyebrow={faq.eyebrow} title={faq.title} />

          <div className="mt-10 flex flex-col md:mt-14">
            {faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="border-t border-sand-50/10">
                  <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left md:gap-6 md:py-6">
                    <span className="font-serif text-[17px] font-light leading-tight text-sand-50 md:text-[19px] lg:text-[20px]">{item.q}</span>
                    <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sand-50/15 text-[18px] font-light text-bronze-400 transition-all md:h-9 md:w-9", isOpen && "rotate-45 border-bronze-400/50")}>+</span>
                  </button>
                  <div className={cn("grid overflow-hidden transition-all duration-300", isOpen ? "grid-rows-[1fr] pb-6 opacity-100 md:pb-7" : "grid-rows-[0fr] opacity-0")}>
                    <p className="overflow-hidden pr-12 text-[13px] font-light leading-[1.7] text-sand-100/60 md:pr-16 md:text-[14px]">{item.a}</p>
                  </div>
                </div>
              );
            })}
            <div className="border-t border-sand-50/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
