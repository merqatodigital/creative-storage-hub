export type FontPair = {
  id: string;
  name: string;
  serif: string;
  sans: string;
};

/** Curated font pairings — serif for display + sans for UI/body. */
export const FONT_PAIRS: FontPair[] = [
  { id: "amuma", name: "AMUMA (default)", serif: "Cormorant Garamond", sans: "Jost" },
  { id: "modernist", name: "Modernist", serif: "Playfair Display", sans: "Inter" },
  { id: "editorial", name: "Editorial", serif: "DM Serif Display", sans: "DM Sans" },
  { id: "quiet-luxe", name: "Quiet Luxe", serif: "Cormorant", sans: "Manrope" },
  { id: "hospitality", name: "Hospitality", serif: "Prata", sans: "Poppins" },
  { id: "coastal", name: "Coastal", serif: "Libre Baskerville", sans: "Work Sans" },
  { id: "florence", name: "Florence", serif: "EB Garamond", sans: "Montserrat" },
  { id: "monastic", name: "Monastic", serif: "Lora", sans: "Lato" },
];

/** Sans font options (independent selection). */
export const SANS_FAMILIES = [
  "Jost", "Inter", "Manrope", "Poppins", "Montserrat",
  "DM Sans", "Work Sans", "Lato", "Nunito Sans", "Karla",
  "Barlow", "Archivo", "Public Sans", "Outfit",
];

/** Serif font options (independent selection). */
export const SERIF_FAMILIES = [
  "Cormorant Garamond", "Cormorant", "Playfair Display", "DM Serif Display",
  "Prata", "Libre Baskerville", "EB Garamond", "Lora",
  "Fraunces", "Bodoni Moda", "Italiana", "Marcellus", "Tenor Sans", "Crimson Pro",
];

export type Palette = {
  id: string;
  name: string;
  light: string;      // primary light background (was sand-50)
  lightAlt: string;   // alt light background   (was sand-100)
  lightMuted: string; // muted section          (was sand-200)
  dark: string;       // primary dark background (was ink-900)
  darkAlt: string;    // alt dark              (was ink-700)
  accent: string;     // accent light         (was bronze-400)
  accentDeep: string; // accent deep          (was bronze-600)
  onLight: string;    // text on light bg     (~ink-900)
  onDark: string;     // text on dark bg      (~sand-50)
};

/** Curated luxury palettes. Click a swatch to apply site-wide. */
export const PALETTES: Palette[] = [
  {
    id: "amuma",
    name: "AMUMA (default)",
    light: "#faf6ef",
    lightAlt: "#f4ecdd",
    lightMuted: "#e9dcc3",
    dark: "#14140f",
    darkAlt: "#24241b",
    accent: "#b99a63",
    accentDeep: "#8c6b3c",
    onLight: "#14140f",
    onDark: "#faf6ef",
  },
  {
    id: "onyx",
    name: "Onyx & Champagne",
    light: "#f5f2ec",
    lightAlt: "#eae4d7",
    lightMuted: "#d9d0bc",
    dark: "#0a0a0a",
    darkAlt: "#1a1a1a",
    accent: "#d4b988",
    accentDeep: "#a08753",
    onLight: "#0a0a0a",
    onDark: "#f5f2ec",
  },
  {
    id: "coastal",
    name: "Coastal Navy",
    light: "#f7f5f0",
    lightAlt: "#ece7dc",
    lightMuted: "#d8d0bd",
    dark: "#111e2c",
    darkAlt: "#1c2d3f",
    accent: "#c8a76a",
    accentDeep: "#9c7f42",
    onLight: "#111e2c",
    onDark: "#f7f5f0",
  },
  {
    id: "forest",
    name: "Deep Forest",
    light: "#f6f2e9",
    lightAlt: "#eae2ce",
    lightMuted: "#d5c7a5",
    dark: "#1a2620",
    darkAlt: "#2a3830",
    accent: "#b8955a",
    accentDeep: "#8c6a37",
    onLight: "#1a2620",
    onDark: "#f6f2e9",
  },
  {
    id: "terracotta",
    name: "Terracotta",
    light: "#faf3e9",
    lightAlt: "#f0e2cb",
    lightMuted: "#e0c8a0",
    dark: "#2a1a12",
    darkAlt: "#3c2a1e",
    accent: "#c67856",
    accentDeep: "#9a5535",
    onLight: "#2a1a12",
    onDark: "#faf3e9",
  },
  {
    id: "nordic",
    name: "Nordic Fog",
    light: "#f4f4f2",
    lightAlt: "#e7e6e2",
    lightMuted: "#cfcecb",
    dark: "#1f2124",
    darkAlt: "#2d3034",
    accent: "#9ba9a9",
    accentDeep: "#67787a",
    onLight: "#1f2124",
    onDark: "#f4f4f2",
  },
  {
    id: "rose",
    name: "Rose & Burgundy",
    light: "#faf1ec",
    lightAlt: "#f0dcd0",
    lightMuted: "#e2bfad",
    dark: "#2a1013",
    darkAlt: "#3d1a20",
    accent: "#c6837a",
    accentDeep: "#9a534a",
    onLight: "#2a1013",
    onDark: "#faf1ec",
  },
  {
    id: "desert",
    name: "Desert Sage",
    light: "#f5efe4",
    lightAlt: "#e8dcc4",
    lightMuted: "#d2c19c",
    dark: "#2e2a20",
    darkAlt: "#3f3a2d",
    accent: "#8b9673",
    accentDeep: "#5e6a4a",
    onLight: "#2e2a20",
    onDark: "#f5efe4",
  },
  {
    id: "ivory",
    name: "Ivory & Ink",
    light: "#ffffff",
    lightAlt: "#f2f1ee",
    lightMuted: "#dedcd6",
    dark: "#0d0d0d",
    darkAlt: "#1e1e1e",
    accent: "#a68a5a",
    accentDeep: "#7a6238",
    onLight: "#0d0d0d",
    onDark: "#ffffff",
  },
  {
    id: "midnight",
    name: "Midnight Bloom",
    light: "#f2eef4",
    lightAlt: "#e4dceb",
    lightMuted: "#c9bdd4",
    dark: "#151022",
    darkAlt: "#231a37",
    accent: "#b394d1",
    accentDeep: "#7d5aa3",
    onLight: "#151022",
    onDark: "#f2eef4",
  },
];

/** Common section IDs used for per-section background overrides. */
export const SECTION_IDS = [
  "hero",
  "manifesto",
  "circle",
  "pebbles",
  "destinations",
  "tiers",
  "revenue",
  "flywheel",
  "experience",
  "firstChapter",
  "retreat",
  "roadmap",
  "calculator",
  "memberPortal",
  "team",
  "faq",
  "join",
  "footer",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/** Curated swatch grid — click a color to assign it as a background. */
export const SWATCH_GRID: string[] = [
  // Neutrals / lights
  "#ffffff", "#faf6ef", "#f5f2ec", "#f2eee5", "#ede4d1",
  "#e9dcc3", "#dccfb0", "#c9bfa4", "#a89c82", "#807560",
  // Darks
  "#0a0a0a", "#111e2c", "#14140f", "#1a2620", "#1f2124",
  "#2a1a12", "#2a1013", "#151022", "#24241b", "#3d1a20",
  // Accents warm
  "#c8a76a", "#b99a63", "#8c6b3c", "#c67856", "#9a5535",
  "#b8955a", "#a68a5a", "#d4b988", "#c6837a", "#9a534a",
  // Accents cool
  "#8b9673", "#5e6a4a", "#3f4a35", "#9ba9a9", "#67787a",
  "#b394d1", "#7d5aa3", "#6b8ba0", "#4d7086", "#375368",
];
