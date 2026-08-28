import { useContent } from "../content/ContentContext";
import { SectionHeading } from "./SectionHeading";
import { Media } from "./Media";
import { useSectionStyle } from "../theme/useSectionStyle";

export function Destinations() {
  const { content } = useContent();
  const { destinations } = content;
  const style = useSectionStyle("destinations");
  return (
    <section id="destinations" style={style} className="section-spacing bg-sand-50">
      <div className="section-container">
        <SectionHeading eyebrow={destinations.eyebrow} title={destinations.title} description={destinations.description} />

        <div className="mt-10 grid gap-8 md:mt-14 md:gap-10 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-16">
          <Media value={destinations.image} className="aspect-[16/10] shadow-xl shadow-black/10 md:aspect-[16/10] lg:aspect-[4/3]" />

          <div className="flex flex-col gap-8 md:gap-10">
            <p className="text-[14px] font-light leading-[1.8] text-ink-900/70 md:text-[15px]">{destinations.body}</p>

            <div className="grid gap-8 sm:grid-cols-2 md:gap-10">
              {destinations.groups.map((g, i) => (
                <div key={i}>
                  <span className="eyebrow text-bronze-600">{g.title}</span>
                  <ul className="mt-4 flex flex-col gap-2.5 md:mt-5 md:gap-3">
                    {g.items.map((d) => (
                      <li key={d} className="font-serif text-[18px] font-light leading-tight text-ink-900 md:text-[19px]">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
