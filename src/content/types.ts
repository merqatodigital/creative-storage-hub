export type MediaValue = {
  type: "image" | "video" | "none";
  src: string; // data URL or empty
  alt: string;
};

export type NavLink = { label: string; href: string };
export type SocialLink = { label: string; url: string };

export type Tier = {
  id: string;
  numeral: string;
  name: string;
  price: string;
  priceValue: number;
  tagline: string;
  units: string;
  unitsValue: number;
  pebbles: string;
  pebblesValue: number;
  returnTarget: string;
  note: string;
  cta: string;
  featured: boolean;
};

export type RoadmapItem = { year: string; title: string; description: string };
export type FaqItem = { q: string; a: string };
export type TeamItem = { name: string; role: string; bio: string; image: MediaValue };
export type UsageItem = { title: string; description: string };
export type PricingRow = { label: string; value: string };
export type PricingTable = { title: string; note: string; rows: PricingRow[] };
export type DestinationGroup = { title: string; items: string[] };
export type FlywheelStep = { n: string; title: string };
export type StatItem = { value: string; label: string; note: string };
export type RateRow = { type: string; low: string; high: string; peak: string };
export type ExperienceItem = { title: string; description: string };

export type VisualStyle = {
  headingFont: string;
  bodyFont: string;
  background: string;
  text: string;
  accent: string;
  surface: string;
};

export type ThemeConfig = {
  fonts: {
    serifFamily: string;
    sansFamily: string;
    baseSize: number; // px, default 16
    headingScale: number; // multiplier, default 1
  };
  palette: {
    id: string; // preset id or "custom"
    light: string;
    lightAlt: string;
    lightMuted: string;
    dark: string;
    darkAlt: string;
    accent: string;
    accentDeep: string;
    onLight: string;
    onDark: string;
  };
  /** Per-section background overrides. Empty string = use default. */
  sectionBg: Record<string, string>;
  /** Per-section text color overrides. Empty string = use default. */
  sectionText: Record<string, string>;
  /** Background behind the entire website. */
  websiteBackground: string;
  /** Complete typography and color overrides for individual sections. */
  sectionStyles: Record<string, VisualStyle>;
  /** Complete typography and color overrides for tables and data groups. */
  tableStyles: Record<string, VisualStyle>;
};

export type Content = {
  theme: ThemeConfig;
  header: {
    logo: string;
    logoSize: number;
    logoImage: MediaValue; // uploaded logo image
    nav: NavLink[];
    socialLinks: SocialLink[];
    cta: string;
    ctaHref: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    tagline: string;
    cta: string;
    ctaHref: string;
    media: MediaValue;
    showLogo: boolean;
    logoSize: number;
    logoImage: MediaValue;
    logoPosition: string; // e.g. "above-title" | "top-left" | "top-center" | "top-right" | "center-left" | "center" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right"
    logoOffsetX: number;
    logoOffsetY: number;
  };
  manifesto: {
    eyebrow1: string;
    heading1: string;
    paragraphs1: string[];
    eyebrow2: string;
    quote: string;
    paragraphs2: string[];
    image1: MediaValue;
    image2: MediaValue;
  };
  circle: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    unitTitle: string;
    unitSubtitle: string;
    unitBody: string;
    renewalTitle: string;
    renewalSubtitle: string;
    renewalBody: string;
    backgroundMedia: MediaValue;
  };
  pebbles: {
    eyebrow: string;
    title: string;
    description: string;
    usages: UsageItem[];
    tables: PricingTable[];
  };
  destinations: {
    eyebrow: string;
    title: string;
    description: string;
    body: string;
    image: MediaValue;
    groups: DestinationGroup[];
  };
  tiersSection: {
    eyebrow: string;
    title: string;
    description: string;
    tiers: Tier[];
  };
  revenue: {
    eyebrow: string;
    title: string;
    description: string;
    tableNote: string;
    rateRows: RateRow[];
    stats: StatItem[];
  };
  flywheel: {
    eyebrow: string;
    title: string;
    steps: FlywheelStep[];
  };
  experience: {
    eyebrow: string;
    title: string;
    image: MediaValue;
    items: ExperienceItem[];
  };
  firstChapter: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    image: MediaValue;
  };
  retreat: {
    eyebrow: string;
    title: string;
    description: string;
    suites: string;
    villas: string;
    suiteImage: MediaValue;
    villaImage: MediaValue;
    suiteLabel: string;
    suiteUnlock: string;
    villaLabel: string;
    villaUnlock: string;
    footnote: string;
    stats: { value: string; label: string }[];
  };
  roadmap: {
    eyebrow: string;
    title: string;
    items: RoadmapItem[];
  };
  calculator: {
    eyebrow: string;
    title: string;
  };
  memberPortal: {
    eyebrow: string;
    title: string;
    description: string;
    bookingTitle: string;
    booking: string[];
    financeTitle: string;
    finance: string[];
  };
  team: {
    eyebrow: string;
    title: string;
    members: TeamItem[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: FaqItem[];
  };
  join: {
    eyebrow: string;
    title: string;
    description: string;
    perks: string[];
    contactEmail: string;
    formTitle: string;
    formNote: string;
    submit: string;
  };
  footer: {
    tagline: string;
    logoSize: number;
    logoImage: MediaValue;
    socialLinks: SocialLink[];
    linkCols: { title: string; links: NavLink[] }[];
    contactTitle: string;
    contactEmails: string[];
    contactAddress: string;
    legal: { label: string; body: string }[];
    bottomLeft: string;
    bottomRight: string;
  };
};
