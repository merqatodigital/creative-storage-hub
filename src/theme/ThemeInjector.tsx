import { useEffect, useMemo } from "react";
import { useContent } from "../content/ContentContext";
import type { VisualStyle } from "../content/types";

const SECTION_SELECTORS: Record<string, string> = {
  header: "#site-header",
  hero: "#vision",
  manifesto: "#manifesto",
  circle: "#circle",
  pebbles: "#pebbles",
  destinations: "#destinations",
  tiers: "#model",
  revenue: "#revenue",
  flywheel: "#flywheel",
  experience: "#experience",
  firstChapter: "#first-chapter",
  retreat: "#retreat",
  roadmap: "#roadmap",
  calculator: "#calculator",
  memberPortal: "#portal",
  team: "#team",
  faq: "#faq",
  join: "#join",
  footer: "#footer",
};

const color = (value: string) =>
  /^#[0-9a-f]{6}$/i.test(value || "") ? value : "";

const font = (value: string) =>
  (value || "").replace(/["'{};]/g, "").trim();

function styleRules(selector: string, style: VisualStyle) {
  const background = color(style.background);
  const text = color(style.text);
  const accent = color(style.accent);
  const surface = color(style.surface);
  const headingFont = font(style.headingFont);
  const bodyFont = font(style.bodyFont);
  const declarations: string[] = [];

  if (background) declarations.push(`background-color:${background}!important`);
  if (text) {
    declarations.push(
      `color:${text}!important`,
      `--color-ink-900:${text}`,
      `--color-ink-800:${text}`,
      `--color-ink-700:${text}`,
      `--color-sand-50:${text}`,
      `--color-sand-100:${text}`
    );
  }
  if (accent) {
    declarations.push(
      `--color-bronze-400:${accent}`,
      `--color-bronze-500:${accent}`,
      `--color-bronze-600:${accent}`
    );
  }
  if (surface) declarations.push(`--section-surface:${surface}`);
  if (headingFont) declarations.push(`--font-serif:"${headingFont}",serif`);
  if (bodyFont) declarations.push(`--font-sans:"${bodyFont}",sans-serif;font-family:var(--font-sans)`);

  const rules = [`${selector}{${declarations.join(";")}}`];
  if (headingFont) {
    rules.push(`${selector} :is(h1,h2,h3,h4,h5,h6,.font-serif){font-family:var(--font-serif)!important}`);
  }
  if (bodyFont) {
    rules.push(`${selector} :is(p,li,a,button,input,textarea,select,label,table){font-family:var(--font-sans)!important}`);
  }
  if (surface) {
    rules.push(`${selector} :is([class*="bg-white"],[class*="bg-sand-100"],[class*="bg-sand-50"],[class*="bg-ink-900"]){background-color:var(--section-surface)!important}`);
  }
  return rules.join("\n");
}

/** Applies global, section, and data-table design settings and dynamically
 * loads every selected Google font family. */
export function ThemeInjector() {
  const { content } = useContent();
  const theme = content.theme;

  const fontFamilies = useMemo(() => {
    const families = new Set([theme.fonts.serifFamily, theme.fonts.sansFamily]);
    Object.values(theme.sectionStyles || {}).forEach((style) => {
      if (style.headingFont) families.add(style.headingFont);
      if (style.bodyFont) families.add(style.bodyFont);
    });
    Object.values(theme.tableStyles || {}).forEach((style) => {
      if (style.headingFont) families.add(style.headingFont);
      if (style.bodyFont) families.add(style.bodyFont);
    });
    return Array.from(families).filter(Boolean);
  }, [theme]);

  const googleFontsHref = useMemo(() => {
    const families = fontFamilies
      .map((family) => `family=${encodeURIComponent(family)}:ital,wght@0,300;0,400;0,500;0,600;1,400`)
      .join("&");
    return `https://fonts.googleapis.com/css2?${families}&display=swap`;
  }, [fontFamilies]);

  useEffect(() => {
    const id = "amuma-fonts";
    let element = document.getElementById(id) as HTMLLinkElement | null;
    if (!element) {
      element = document.createElement("link");
      element.id = id;
      element.rel = "stylesheet";
      document.head.appendChild(element);
    }
    element.href = googleFontsHref;
  }, [googleFontsHref]);

  const css = useMemo(() => {
    const palette = theme.palette;
    const websiteBackground = color(theme.websiteBackground) || palette.light;
    const sectionRules = Object.entries(theme.sectionStyles || {})
      .map(([id, configuredStyle]) => {
        const selector = SECTION_SELECTORS[id];
        return selector ? styleRules(selector, configuredStyle) : "";
      })
      .join("\n");
    const tableRules = Object.entries(theme.tableStyles || {})
      .map(([id, configuredStyle]) => styleRules(`[data-theme-table="${id}"]`, configuredStyle))
      .join("\n");

    return `:root{
  --font-serif:"${font(theme.fonts.serifFamily)}","Cormorant Garamond",Georgia,serif;
  --font-sans:"${font(theme.fonts.sansFamily)}","Jost","Helvetica Neue",Arial,sans-serif;
  --color-sand-50:${palette.light};
  --color-sand-100:${palette.lightAlt};
  --color-sand-200:${palette.lightMuted};
  --color-sand-300:${palette.lightMuted};
  --color-ink-900:${palette.dark};
  --color-ink-800:${palette.darkAlt};
  --color-ink-700:${palette.darkAlt};
  --color-bronze-400:${palette.accent};
  --color-bronze-500:${palette.accentDeep};
  --color-bronze-600:${palette.accentDeep};
}
html{font-size:${theme.fonts.baseSize}px;background:${websiteBackground}}
body,.site-root{font-family:var(--font-sans);background-color:${websiteBackground};color:${palette.onLight}}
.font-serif{font-family:var(--font-serif)}
${sectionRules}
${tableRules}`;
  }, [theme]);

  return <style>{css}</style>;
}