import { useContent } from "../content/ContentContext";
import { SectionHeading } from "./SectionHeading";
import { Media } from "./Media";
import { useSectionStyle } from "../theme/useSectionStyle";

export function Team() {
  const { content } = useContent();
  const { team } = content;
  const style = useSectionStyle("team");
  return (
    <section id="team" style={style} className="section-spacing bg-sand-50">
      <div className="section-container">
        <SectionHeading eyebrow={team.eyebrow} title={team.title} />

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-3 md:gap-8 lg:gap-10">
          {team.members.map((member, i) => (
            <div key={i} className="group flex flex-col gap-5">
              <Media value={member.image} className="aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.02]" />
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-[20px] font-light leading-tight md:text-[21px]">{member.name}</h3>
                <span className="text-[10px] uppercase tracking-[0.2em] text-bronze-600">{member.role}</span>
                <p className="mt-2 text-[13px] font-light leading-[1.7] text-ink-900/60 md:text-[14px]">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
