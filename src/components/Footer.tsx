import { useContent } from "../content/ContentContext";
import { useSectionStyle } from "../theme/useSectionStyle";
import { SocialLinks } from "./SocialLinks";

export function Footer({ onOpenAdmin }: { onOpenAdmin: () => void }) {
  const { content } = useContent();
  const { footer, header } = content;
  const style = useSectionStyle("footer");

  return (
    <footer id="footer" style={style} className="bg-ink-900 pt-12 text-sand-100/60 md:pt-16 lg:pt-20">
      <div className="section-container">
        {/* Uniform grid: mobile 1 col (logo full, links 2-col, contact full), tablet 2-col, desktop 4-col */}
        <div className="grid gap-8 border-b border-sand-50/10 pb-10 md:grid-cols-2 md:gap-8 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10 lg:pb-14">
          {/* Logo — full width on mobile & tablet, 1.5fr on desktop */}
          <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-1">
            {footer.logoImage.src || header.logoImage.src ? (
              <img
                src={footer.logoImage.src || header.logoImage.src}
                alt={header.logo}
                className="max-h-[96px] w-auto max-w-[200px] object-contain brightness-0 invert md:max-h-[110px]"
                style={{ height: `${footer.logoSize}px` }}
              />
            ) : (
              <span className="font-serif tracking-[0.2em] text-sand-50" style={{ fontSize: `${footer.logoSize}px` }}>
                {header.logo}
              </span>
            )}
            <p className="max-w-[320px] text-[13px] font-light leading-[1.7] text-sand-100/60">{footer.tagline}</p>
          </div>

          {/* Links — 2-col on mobile & tablet, 2 cols on desktop */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2 lg:col-span-2 lg:grid-cols-2 lg:gap-10">
            {footer.linkCols.map((col, i) => (
              <div key={i} className="flex flex-col gap-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-bronze-400">{col.title}</span>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l, j) => (
                    <li key={j}>
                      <a href={l.href} className="text-[13px] font-light leading-[1.5] text-sand-100/60 transition-colors hover:text-sand-50">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact — full width on mobile & tablet, 1 col on desktop */}
          <div className="flex flex-col gap-3 md:col-span-2 lg:col-span-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-bronze-400">{footer.contactTitle}</span>
            <div className="flex flex-col gap-2">
              {footer.contactEmails.map((e) => (
                <a key={e} href={`mailto:${e}`} className="text-[13px] font-light text-sand-100/60 transition-colors hover:text-sand-50">
                  {e}
                </a>
              ))}
              <span className="mt-1 text-[12px] font-light text-sand-100/35">{footer.contactAddress}</span>
            </div>
            <SocialLinks links={footer.socialLinks} light className="mt-2" />
          </div>
        </div>

        {/* Legal — uniform stacked */}
        <div className="flex flex-col gap-3 py-6 text-[11px] font-light leading-[1.6] text-sand-100/30 md:py-8 md:text-[11px] lg:py-8">
          {footer.legal.map((l, i) => (
            <p key={i} className="max-w-4xl">
              {l.label && <strong className="font-medium text-sand-100/45">{l.label}: </strong>}
              {l.body}
            </p>
          ))}
        </div>

        {/* Bottom bar — uniform: stacked on mobile, row on tablet/desktop */}
        <div className="flex flex-col items-start gap-4 border-t border-sand-50/10 py-5 md:flex-row md:items-center md:justify-between md:py-6">
          <div className="flex flex-col gap-1 text-[11px] font-light leading-[1.4] text-sand-100/30">
            <span>{footer.bottomLeft}</span>
            <span className="md:hidden">{footer.bottomRight}</span>
          </div>
          <div className="flex w-full items-center justify-between gap-4 md:w-auto md:justify-end">
            <span className="hidden text-[11px] font-light text-sand-100/30 md:block">{footer.bottomRight}</span>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-2 rounded-full border border-sand-50/10 bg-white/[0.03] px-3.5 py-2 text-[10px] uppercase tracking-[0.15em] text-sand-100/40 backdrop-blur transition-colors hover:border-sand-50/20 hover:bg-white/[0.06] hover:text-sand-50"
            >
              <span className="h-1 w-1 rounded-full bg-sand-50/30" />
              Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
