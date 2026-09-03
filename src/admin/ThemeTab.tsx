import { useState } from "react";
import type { Content, VisualStyle } from "../content/types";
import {
  FONT_PAIRS,
  PALETTES,
  SANS_FAMILIES,
  SERIF_FAMILIES,
} from "../theme/presets";
import { ColorPicker } from "./ColorPicker";
import { Label, Panel, Slider } from "./fields";

type Props = {
  c: Content;
  update: (fn: (content: Content) => Content) => void;
};

const EMPTY_STYLE: VisualStyle = {
  headingFont: "",
  bodyFont: "",
  background: "",
  text: "",
  accent: "",
  surface: "",
};

const SECTIONS = [
  ["header", "Header"],
  ["hero", "Hero"],
  ["manifesto", "Manifesto"],
  ["circle", "The Circle"],
  ["pebbles", "Pebbles"],
  ["destinations", "Destinations"],
  ["tiers", "Investment Tiers"],
  ["revenue", "Revenue Model"],
  ["flywheel", "Flywheel"],
  ["experience", "Experience"],
  ["firstChapter", "First Chapter"],
  ["retreat", "Retreat"],
  ["roadmap", "Roadmap"],
  ["calculator", "Calculator"],
  ["memberPortal", "Member Portal"],
  ["team", "Team"],
  ["faq", "FAQ"],
  ["join", "Join"],
  ["footer", "Footer"],
] as const;

const TABLES = [
  ["pebbleRates", "Pebble Rates"],
  ["investmentTiers", "Investment Tier Data"],
  ["revenueRates", "Revenue Rates"],
  ["calculator", "Return Calculator"],
  ["roadmap", "Roadmap Rows"],
  ["memberPortal", "Member Portal Lists"],
  ["joinForm", "Application Form"],
] as const;

export function ThemeTab({ c, update }: Props) {
  const theme = c.theme;

  const setGlobalFonts = (patch: Partial<Content["theme"]["fonts"]>) =>
    update((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        fonts: { ...prev.theme.fonts, ...patch },
      },
    }));

  const applyPreset = (id: string) => {
    const palette = PALETTES.find((item) => item.id === id);
    const pair = FONT_PAIRS.find((item) => item.id === id) ?? FONT_PAIRS[0]!;
    if (!palette) return;
    update((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        websiteBackground: palette.light,
        palette: {
          id: palette.id,
          light: palette.light,
          lightAlt: palette.lightAlt,
          lightMuted: palette.lightMuted,
          dark: palette.dark,
          darkAlt: palette.darkAlt,
          accent: palette.accent,
          accentDeep: palette.accentDeep,
          onLight: palette.onLight,
          onDark: palette.onDark,
        },
        fonts: {
          ...prev.theme.fonts,
          serifFamily: pair.serif,
          sansFamily: pair.sans,
        },
      },
    }));
  };

  const setSectionStyle = (id: string, style: VisualStyle) =>
    update((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        sectionStyles: { ...prev.theme.sectionStyles, [id]: style },
      },
    }));

  const clearSectionStyle = (id: string) =>
    update((prev) => {
      const sectionStyles = { ...prev.theme.sectionStyles };
      delete sectionStyles[id];
      return { ...prev, theme: { ...prev.theme, sectionStyles } };
    });

  const setTableStyle = (id: string, style: VisualStyle) =>
    update((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        tableStyles: { ...prev.theme.tableStyles, [id]: style },
      },
    }));

  const clearTableStyle = (id: string) =>
    update((prev) => {
      const tableStyles = { ...prev.theme.tableStyles };
      delete tableStyles[id];
      return { ...prev, theme: { ...prev.theme, tableStyles } };
    });

  return (
    <>
      <Panel title="Website Design">
        <p className="text-xs leading-relaxed text-ink-900/55">
          This is the single destination for fonts, colors, section backgrounds,
          and data-table styling. Changes appear immediately on every device.
        </p>

        <label className="flex flex-col gap-2">
          <Label>Quick Design Preset</Label>
          <select
            value={theme.palette.id}
            onChange={(event) => applyPreset(event.target.value)}
            className="rounded-lg border border-ink-900/10 bg-white px-3 py-3 text-sm outline-none focus:border-ink-900"
          >
            {PALETTES.map((palette) => (
              <option key={palette.id} value={palette.id}>
                {palette.name}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-col gap-2">
          <Label>Website Background</Label>
          <ColorPicker
            value={theme.websiteBackground}
            onChange={(websiteBackground) =>
              update((prev) => ({
                ...prev,
                theme: { ...prev.theme, websiteBackground },
              }))
            }
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FontSelect
            label="Global Heading Font"
            value={theme.fonts.serifFamily}
            options={SERIF_FAMILIES}
            onChange={(serifFamily) => setGlobalFonts({ serifFamily })}
          />
          <FontSelect
            label="Global Body Font"
            value={theme.fonts.sansFamily}
            options={SANS_FAMILIES}
            onChange={(sansFamily) => setGlobalFonts({ sansFamily })}
          />
        </div>

        <Slider
          label="Global Type Size"
          value={theme.fonts.baseSize}
          min={13}
          max={20}
          onChange={(baseSize) => setGlobalFonts({ baseSize })}
        />
      </Panel>

      <Panel title="Section Design">
        <p className="text-xs leading-relaxed text-ink-900/55">
          Open a section to choose its heading font, body font, background,
          text, accent, and content surface. Empty settings inherit the global design.
        </p>
        <div className="flex flex-col gap-2">
          {SECTIONS.map(([id, label]) => (
            <StyleEditor
              key={id}
              label={label}
              value={theme.sectionStyles[id] ?? EMPTY_STYLE}
              onChange={(style) => setSectionStyle(id, style)}
              onReset={() => clearSectionStyle(id)}
            />
          ))}
        </div>
      </Panel>

      <Panel title="Tables & Data">
        <p className="text-xs leading-relaxed text-ink-900/55">
          Control fonts and colors for pricing, returns, roadmap rows, lists,
          and the application form independently from their section.
        </p>
        <div className="flex flex-col gap-2">
          {TABLES.map(([id, label]) => (
            <StyleEditor
              key={id}
              label={label}
              value={theme.tableStyles[id] ?? EMPTY_STYLE}
              onChange={(style) => setTableStyle(id, style)}
              onReset={() => clearTableStyle(id)}
            />
          ))}
        </div>
      </Panel>
    </>
  );
}

function StyleEditor({
  label,
  value,
  onChange,
  onReset,
}: {
  label: string;
  value: VisualStyle;
  onChange: (value: VisualStyle) => void;
  onReset: () => void;
}) {
  const [open, setOpen] = useState(false);
  const hasChanges = Object.values(value).some(Boolean);
  const set = (patch: Partial<VisualStyle>) => onChange({ ...value, ...patch });

  return (
    <div className="overflow-visible rounded-xl border border-ink-900/10 bg-white">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
      >
        <div className="flex items-center gap-1">
          <span
            className="h-5 w-5 rounded-full border border-ink-900/10"
            style={{ background: value.background || "transparent" }}
          />
          <span
            className="h-5 w-3 rounded-full border border-ink-900/10"
            style={{ background: value.accent || "transparent" }}
          />
        </div>
        <span className="flex-1 text-xs font-medium text-ink-900">{label}</span>
        <span className="text-[10px] uppercase tracking-[0.15em] text-ink-900/35">
          {hasChanges ? "Custom" : "Global"}
        </span>
        <span className="text-lg font-light text-ink-900/40">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="flex flex-col gap-4 border-t border-ink-900/10 p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FontSelect
              label="Heading Font"
              value={value.headingFont}
              options={SERIF_FAMILIES}
              inheritLabel="Use global heading font"
              onChange={(headingFont) => set({ headingFont })}
            />
            <FontSelect
              label="Body Font"
              value={value.bodyFont}
              options={SANS_FAMILIES}
              inheritLabel="Use global body font"
              onChange={(bodyFont) => set({ bodyFont })}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ColorControl label="Background" value={value.background} onChange={(background) => set({ background })} />
            <ColorControl label="Text" value={value.text} onChange={(text) => set({ text })} />
            <ColorControl label="Accent" value={value.accent} onChange={(accent) => set({ accent })} />
            <ColorControl label="Cards / Surface" value={value.surface} onChange={(surface) => set({ surface })} />
          </div>

          {hasChanges && (
            <button
              type="button"
              onClick={onReset}
              className="self-start text-[10px] uppercase tracking-[0.15em] text-red-500 hover:text-red-700"
            >
              Reset to global design
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function FontSelect({
  label,
  value,
  options,
  onChange,
  inheritLabel,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  inheritLabel?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-ink-900/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-ink-900"
      >
        {inheritLabel && <option value="">{inheritLabel}</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function ColorControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <ColorPicker
        value={value}
        onChange={onChange}
        allowClear
        onClear={() => onChange("")}
      />
    </div>
  );
}