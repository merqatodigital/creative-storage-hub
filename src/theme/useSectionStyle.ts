import { useContent } from "../content/ContentContext";
import type { CSSProperties } from "react";

/** Returns inline style overrides for a section root element,
 *  based on the admin-configured per-section background/text colors. */
export function useSectionStyle(id: string): CSSProperties {
  const { content } = useContent();
  const style: CSSProperties = {};
  const configured = content.theme?.sectionStyles?.[id];
  const bg = configured?.background || content.theme?.sectionBg?.[id];
  const text = configured?.text || content.theme?.sectionText?.[id];
  if (bg) style.backgroundColor = bg;
  if (text) style.color = text;
  if (configured?.bodyFont) style.fontFamily = configured.bodyFont;
  return style;
}
