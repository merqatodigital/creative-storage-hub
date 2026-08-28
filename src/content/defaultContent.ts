import type { Content, MediaValue } from "./types";
import { PALETTES } from "../theme/presets";

const noMedia = (alt: string): MediaValue => ({ type: "none", src: "", alt });
const amuma = PALETTES[0];

export const defaultContent: Content = {
  theme: {
    fonts: {
      serifFamily: "Cormorant Garamond",
      sansFamily: "Jost",
      baseSize: 16,
      headingScale: 1,
    },
    palette: {
      id: amuma.id,
      light: amuma.light,
      lightAlt: amuma.lightAlt,
      lightMuted: amuma.lightMuted,
      dark: amuma.dark,
      darkAlt: amuma.darkAlt,
      accent: amuma.accent,
      accentDeep: amuma.accentDeep,
      onLight: amuma.onLight,
      onDark: amuma.onDark,
    },
    sectionBg: {},
    sectionText: {},
    websiteBackground: amuma.light,
    sectionStyles: {},
    tableStyles: {},
  },
  header: {
    logo: "AMUMA",
    logoSize: 24,
    logoImage: noMedia("Header logo"),
    nav: [
      { label: "Vision", href: "#vision" },
      { label: "The Circle", href: "#circle" },
      { label: "Model", href: "#model" },
      { label: "Destinations", href: "#destinations" },
      { label: "Calculator", href: "#calculator" },
    ],
    socialLinks: [],
    cta: "Join the Circle",
    ctaHref: "#join",
  },
  hero: {
    eyebrow: "A New Way of Traveling",
    title: "Meaningful places in hidden destinations.",
    tagline:
      "AMUMA — Barefoot Boutique Resorts. A circle of travelers and a constellation of intimate retreats across the Philippines and Southeast Asia.",
    cta: "Join the Circle",
    ctaHref: "#join",
    media: noMedia(
      "Aerial view of an untouched turquoise cove framed by palms in the Philippines"
    ),
    showLogo: false,
    logoSize: 96,
    logoImage: noMedia("Hero logo"),
    logoPosition: "above-title",
    logoOffsetX: 0,
    logoOffsetY: 0,
  },
  manifesto: {
    eyebrow1: "The Manifesto",
    heading1: "Tourism is changing.",
    paragraphs1: [
      "Travelers are moving away from crowded destinations and standardized resorts. They are searching for something more rare. Not bigger places but more meaningful ones.",
      "Hidden coastlines. Untouched islands. Villages where hospitality still feels personal. Places where beauty is not manufactured, but discovered.",
      "AMUMA was created to reveal these hidden treasures — a network of intimate retreats designed for explorers who seek beauty, silence, and discovery.",
    ],
    eyebrow2: "The Meaning",
    quote: "Amuma: to nurture, to care for, and to tend with attention.",
    paragraphs2: [
      "An ancestral Filipino word, more precisely a native Visayan term from pre-colonial Austronesian roots. It expresses the act of looking after someone or something so it can grow and flourish — whether a person, a place, a community, or an idea.",
      "It reflects the philosophy behind the project: creating destinations with care, respect for nature, and thoughtful attention to the places and people that surround them.",
    ],
    image1: noMedia("Smooth pale sea pebbles resting on linen beside woven palm"),
    image2: noMedia("Mist and morning light over an untouched rainforest canopy"),
  },
  circle: {
    eyebrow: "The AMUMA Circle",
    heading:
      "Not simply a collection of boutique resorts, but a circle of travelers who share a way of exploring the world.",
    paragraphs: [
      "AMUMA develops intimate boutique destinations composed of suites and villas, set in exceptional natural locations across the Philippines and Southeast Asia.",
      "Members return not only as guests but as part of a living community — discovering new places, hosting friends and family, and traveling across a growing network of destinations connected by the same spirit of hospitality.",
      "With a single entry into the Circle, members gain access to a constellation of places to return to again and again. Each AMUMA is both a sanctuary in nature and a meeting point for the community.",
    ],
    unitTitle: "Circle Units",
    unitSubtitle: "Ownership and lifestyle investment",
    unitBody:
      "Members purchase Circle Units, representing membership shares in the AMUMA Circle and entitlement to a portion of the retreat's rental profit pool. Unit holders become co-creators of the destinations and participants in the shared rental revenues.",
    renewalTitle: "The Annual Renewal",
    renewalSubtitle: "9 July → 10 July",
    renewalBody:
      "Pebbles expire every year on 9 July, and a new batch is released on 10 July. This rhythm encourages members to return regularly while maintaining availability for external guests.",
    backgroundMedia: noMedia("Ambient background"),
  },
  pebbles: {
    eyebrow: "Lifestyle Currency",
    title: "Pebbles.",
    description:
      "The internal currency of the AMUMA ecosystem. Circle Members receive new pebbles every year and use them to access the experiences of the retreats — turning each destination into a living hospitality ecosystem.",
    usages: [
      {
        title: "Suite & Villa Nights",
        description:
          "Reserve your stay across the destinations using your annual pebble allocation.",
      },
      {
        title: "Dining & Spa",
        description:
          "From seasonal shared dinners and private tables to massages and spa treatments.",
      },
      {
        title: "Excursions & Boat Trips",
        description:
          "Island hopping, snorkeling, and coastline exploration curated by each destination.",
      },
    ],
    tables: [
      {
        title: "Suites",
        note: "Pebbles per night",
        rows: [
          { label: "Low Season", value: "150" },
          { label: "High Season", value: "250" },
          { label: "Peak Season", value: "300" },
        ],
      },
      {
        title: "Villas",
        note: "Pebbles per night",
        rows: [
          { label: "Low Season", value: "275" },
          { label: "High Season", value: "420" },
          { label: "Peak Season", value: "500" },
        ],
      },
    ],
  },
  destinations: {
    eyebrow: "Hidden Destinations",
    title:
      "Only where nature, culture, and simplicity still define the landscape.",
    description:
      "AMUMA escapes are created only in places that still feel undiscovered — not where tourism already dominates, but where a boutique hideaway can coexist with the environment while preserving the beauty that makes the destination special.",
    body: "From the remote islands of Balabac to the mountains of Bukidnon, from Siquijor and Sibuyan Island to Luang Prabang in Laos and the Togean Islands of Indonesia. Each new place becomes another quiet chapter in the journey of the Circle.",
    image: noMedia(
      "Long Beach in San Vicente, Palawan seen from the air with palms meeting the sand"
    ),
    groups: [
      {
        title: "Philippines",
        items: ["Sagada", "Siquijor", "Sibuyan Island", "Bukidnon", "Batanes"],
      },
      {
        title: "Southeast Asia",
        items: ["Laos", "Indonesia", "Timor"],
      },
    ],
  },
  tiersSection: {
    eyebrow: "Circle Participation",
    title: "Investment Tiers",
    description:
      "By holding Circle Units, members benefit from two complementary yearly rewards: passive income from the rental profit pool, and Pebbles to spend across the destinations.",
    tiers: [
      {
        id: "nova",
        numeral: "Tier I",
        name: "Nova",
        price: "₱500,000",
        priceValue: 500000,
        tagline: "Founding Circle Entry",
        units: "50",
        unitsValue: 50,
        pebbles: "1,000",
        pebblesValue: 1000,
        returnTarget: "17–20%",
        note: "Only 20 places available",
        cta: "Apply for Nova",
        featured: false,
      },
      {
        id: "aurora",
        numeral: "Tier II",
        name: "Aurora",
        price: "₱1,200,000",
        priceValue: 1200000,
        tagline: "Membership Share",
        units: "120",
        unitsValue: 120,
        pebbles: "2,200",
        pebblesValue: 2200,
        returnTarget: "17–20%",
        note: "",
        cta: "Select Tier",
        featured: false,
      },
      {
        id: "orion",
        numeral: "Tier III",
        name: "Orion",
        price: "₱2,000,000",
        priceValue: 2000000,
        tagline: "Advanced Portfolio",
        units: "210",
        unitsValue: 210,
        pebbles: "4,000",
        pebblesValue: 4000,
        returnTarget: "17–20%",
        note: "",
        cta: "Select Tier",
        featured: true,
      },
      {
        id: "polaris",
        numeral: "Tier IV",
        name: "Polaris",
        price: "₱4,000,000",
        priceValue: 4000000,
        tagline: "Master Membership",
        units: "440",
        unitsValue: 440,
        pebbles: "8,000",
        pebblesValue: 8000,
        returnTarget: "17–20%",
        note: "",
        cta: "Select Tier",
        featured: false,
      },
    ],
  },
  revenue: {
    eyebrow: "Revenue Model",
    title: "How income is distributed.",
    description:
      "AMUMA destinations welcome both members and general travelers, with accommodations offered through our platforms and global booking channels. After operating expenses and taxes, the remaining profits are shared between Members of the Circle and AMUMA as operator.",
    tableNote:
      "Indicative nightly rates for AMUMA San Vicente, per night for 2 guests including breakfast.",
    rateRows: [
      { type: "Suite", low: "₱7,500", high: "₱12,500", peak: "₱15,000" },
      { type: "Villa", low: "₱13,000", high: "₱20,000", peak: "₱25,000" },
    ],
    stats: [
      { value: "60%", label: "Circle Members", note: "Share of distributed profits" },
      { value: "40%", label: "AMUMA Operator", note: "Management and operations" },
      {
        value: "17–20%",
        label: "Projected Annual ROI",
        note: "55% occupancy · TIEZA 5% tourism tax",
      },
    ],
  },
  flywheel: {
    eyebrow: "The AMUMA Flywheel",
    title: "A cycle that continuously expands the ecosystem.",
    steps: [
      { n: "01", title: "Members join" },
      { n: "02", title: "Retreats are built" },
      { n: "03", title: "Experiences generate revenue" },
      { n: "04", title: "Returns fund expansion" },
      { n: "05", title: "New members join" },
      { n: "06", title: "New destinations appear" },
    ],
  },
  experience: {
    eyebrow: "The AMUMA Experience",
    title: "Experiences that shape the rhythm of each stay.",
    image: noMedia("Hand-made pasta with pesto and fresh tomato plated at an AMUMA table"),
    items: [
      {
        title: "Wellness",
        description:
          "Morning yoga, meditation sessions, massages, and slow moments designed to reconnect body and mind.",
      },
      {
        title: "Sea & Adventure",
        description:
          "Boat excursions, snorkeling, island hopping, fishing trips, and exploration of nearby coastlines.",
      },
      {
        title: "Island Exploration",
        description:
          "Hidden beaches, waterfalls, mountain trails, and the local villages surrounding each destination.",
      },
      {
        title: "Culinary Journeys",
        description:
          "Seasonal menus from local ingredients, shared dinners, seafood feasts, and cooking experiences.",
      },
      {
        title: "Community Moments",
        description:
          "Shared tables, sunset gatherings, and spontaneous encounters with fellow members and travelers.",
      },
    ],
  },
  firstChapter: {
    eyebrow: "First Chapter",
    title: "Palawan",
    paragraphs: [
      "The journey begins in Palawan, one of the most extraordinary natural environments in the world. The first retreat will rise along the pristine coastline of San Vicente, Long Beach — an emerging destination of untouched landscapes, crystal waters, vibrant underwater life, and access to some of the most beautiful island hopping in Palawan.",
      "The second retreat will follow in Balabac, where AMUMA already owns beachfront land in one of the most remote and spectacular island regions of the Philippines. Together, these two destinations establish the foundation of the AMUMA ecosystem.",
    ],
    image: noMedia("Thatched-roof villa with lime plaster walls and a pool in a tropical garden"),
  },
  retreat: {
    eyebrow: "The Retreat",
    title: "AMUMA San Vicente",
    description:
      "Open, breathable spaces that dissolve the boundary between indoors and nature. Natural wood, stone textures, warm earth tones, and handcrafted details — private courtyards, plunge pools, and open living rooms where architecture, nature, and lifestyle move in the same rhythm.",
    suites: "4",
    villas: "2",
    suiteImage: noMedia(
      "Suite interior with lime plaster walls opening onto a private planted courtyard"
    ),
    villaImage: noMedia("Villa terrace with daybed, plunge pool, and thatched roof"),
    suiteLabel: "The AMUMA Suite",
    suiteUnlock: "Unlocked at 600 Circle Units",
    villaLabel: "The Private Villa",
    villaUnlock: "Unlocked at 1,000 Circle Units",
    footnote:
      "Each AMUMA accommodation is brought to life through the Circle Units system. When the threshold is reached, construction begins and the unit becomes part of the AMUMA rental pool, generating revenues for the Circle. To initiate the ecosystem, AMUMA Holding will develop the first Suite and the first Villa as the project's first proof of work.",
    stats: [
      { value: "600", label: "Suite" },
      { value: "1,000", label: "Villa" },
      { value: "4,400", label: "Total issued · 4 suites and 2 villas" },
      { value: "1,600 / 2,800", label: "AMUMA Holding / Circle Members" },
    ],
  },
  roadmap: {
    eyebrow: "Roadmap",
    title: "A growing constellation.",
    items: [
      { year: "2026", title: "AMUMA San Vicente", description: "Construction begins and the first Circle Members join." },
      { year: "2028", title: "AMUMA San Vicente opens", description: "First guests welcomed, rental income begins." },
      { year: "2029", title: "AMUMA Balabac groundbreaking", description: "New Circle Units offering." },
      { year: "2030", title: "Philippines expansion", description: "Land acquisition and programming of new destinations." },
      { year: "2031", title: "AMUMA Balabac opens", description: "Beachfront flagship AMUMA." },
      { year: "2032", title: "Indonesia land acquisition", description: "Togean Islands." },
      { year: "2032", title: "Groundbreaking Bukidnon or Sibuyan", description: "Expansion development in new Philippine locations." },
      { year: "2033", title: "Bukidnon or Sibuyan opens", description: "Philippine expansion underway." },
      { year: "2035", title: "AMUMA Togean opens", description: "First international hideaway; expansion into Indonesia begins." },
    ],
  },
  calculator: {
    eyebrow: "Your Returns",
    title: "Select a tier to see your potential.",
  },
  memberPortal: {
    eyebrow: "The Member Portal",
    title: "Your Pebbles. Your access. Your ecosystem.",
    description:
      "More than an investment dashboard — the central hub of the member experience, where Pebbles become currency, connection, and community.",
    bookingTitle: "Booking & Lifestyle",
    booking: [
      "Reserve stays using Pebbles",
      "Book experiences: island hopping, private cars, transfers, scooter rentals",
      "Order food and drinks within the resorts using Pebbles",
      "Book internal services: massages, spa treatments, private dinners",
    ],
    financeTitle: "Finance & Community",
    finance: [
      "Monitor your Pebble balance in real time",
      "Track expected yearly profits",
      "Send or receive Pebbles as gifts",
      "Direct messaging channel with resort staff",
      "Event invitations and club member updates",
      "New development progress tracking",
      "Internal voting system for key decisions",
    ],
  },
  team: {
    eyebrow: "The Team",
    title: "The people behind AMUMA.",
    members: [
      {
        name: "Giacomo Gervasutti",
        role: "Founder & Vision Director",
        bio: "Italian entrepreneur, founder and owner of Baia Boutique Resort, Marina Terrace restaurant and accommodations, and the Pasticci.ph private dining club.",
        image: noMedia("Portrait of Giacomo Gervasutti"),
      },
      {
        name: "Irina Feleo",
        role: "Co-founder & Creative Director",
        bio: "Award-winning Filipino actress and creative producer, bringing artistic vision and storytelling sensibility to the atmosphere and guest experience of AMUMA destinations.",
        image: noMedia("Portrait of Irina Feleo"),
      },
      {
        name: "Joaquin Esquivias",
        role: "Chief Legal & Strategy Officer",
        bio: "Entrepreneur and tax & corporate lawyer with extensive experience building scalable businesses. He oversees the strategic, financial, and legal foundations of the ecosystem.",
        image: noMedia("Portrait of Joaquin Esquivias"),
      },
    ],
  },
  faq: {
    eyebrow: "Questions",
    title: "Frequently asked",
    items: [
      {
        q: "What are the Circle Units?",
        a: "Circle Units are membership shares in the AMUMA Circle. They represent your proportional participation in the rental profit pool of the destinations and make you a co-creator of each retreat. A total of 4,400 units cover the first chapter: 2,800 held by Circle Members and 1,600 by AMUMA Holding.",
      },
      {
        q: "What are the Pebbles?",
        a: "Pebbles are the internal lifestyle currency of the AMUMA ecosystem. Circle Members receive a new allocation every 10 July and use them to book suite and villa nights, dining, spa treatments, and excursions across every AMUMA destination.",
      },
      {
        q: "Can I sell my Units?",
        a: "Circle Units may be transferred or resold to other qualified members subject to AMUMA Holding's transfer policy and applicable securities regulations. A future secondary marketplace within the member portal is planned.",
      },
      {
        q: "How do I receive my revenue?",
        a: "Distributable profits from the rental pool are calculated annually and paid directly to members' registered accounts, with full transparency available through the Member Portal dashboard.",
      },
      {
        q: "What's the minimum investment?",
        a: "The Founding Circle begins at ₱500,000 with the Nova tier, limited to 20 places. Subsequent tiers scale upward through Aurora, Orion, and Polaris.",
      },
      {
        q: "What is the Founding Circle?",
        a: "The Founding Circle is the first cohort of 20 Nova members who join before construction begins at AMUMA San Vicente, receiving permanent recognition and early access privileges across the ecosystem.",
      },
      {
        q: "Can companies invest?",
        a: "Yes. Corporate entities and family offices may hold Circle Units subject to standard KYC and accreditation requirements. Please contact our team for the corporate application process.",
      },
      {
        q: "What returns can I expect?",
        a: "Projected returns range between 17–20% annually, based on a 55% occupancy assumption across the rental pool, after operating expenses and the 5% TIEZA tourism tax.",
      },
    ],
  },
  join: {
    eyebrow: "Join the Founding Circle",
    title: "The journey starts here.",
    description:
      "20 exclusive Nova places at ₱500,000 — 50 membership stakes, 1,000 annual Pebbles, and early access to future AMUMA retreats.",
    perks: [
      "Name on the founding plaque at the San Vicente retreat",
      "Early access to future AMUMA retreats",
      "First access to future share offerings",
      "Annual private video update from the founders",
      "Invitation to the annual Founders' Dinner",
      "Listed as a Founding Circle member on the website",
    ],
    contactEmail: "hello@amuma.ph",
    formTitle: "Apply Now",
    formNote: "20 Nova places remaining · ₱500,000 entry",
    submit: "Submit Application",
  },
  footer: {
    tagline:
      "Barefoot boutique resorts and a circle of travelers exploring hidden destinations across the Philippines and Southeast Asia.",
    logoSize: 30,
    logoImage: noMedia("Footer logo"),
    socialLinks: [],
    linkCols: [
      {
        title: "Links",
        links: [
          { label: "Vision", href: "#vision" },
          { label: "The Circle", href: "#circle" },
          { label: "Model", href: "#model" },
          { label: "Calculator", href: "#calculator" },
          { label: "Join", href: "#join" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Private Placement", href: "#" },
          { label: "Terms", href: "#" },
          { label: "Privacy", href: "#" },
        ],
      },
    ],
    contactTitle: "Contact",
    contactEmails: ["hello@amuma.ph", "legal@amuma.ph"],
    contactAddress: "Makati City, Philippines",
    legal: [
      {
        label: "RESTRICTIONS ON OFFERING",
        body: "The securities offered are not being offered or sold in the United States or to U.S. persons.",
      },
      {
        label: "FORWARD-LOOKING STATEMENTS",
        body: "This website contains forward-looking statements regarding future events, financial projections, and business strategies. Past performance of Baia is not necessarily indicative of future results.",
      },
      {
        label: "RISK FACTORS",
        body: "An investment in AMUMA properties involves significant risks, including construction delays, market conditions, regulatory changes, operational challenges, and liquidity limitations.",
      },
      {
        label: "INTELLECTUAL PROPERTY",
        body: "All content on this website is the property of AMUMA Holding and is protected by Philippine and international copyright laws.",
      },
      {
        label: "",
        body: "This website and its contents shall be governed by the laws of the Republic of the Philippines. Any disputes shall be submitted to the exclusive jurisdiction of the courts of Makati City, Philippines.",
      },
    ],
    bottomLeft: "AMUMA Holding · legal@amuma.ph",
    bottomRight: "© 2026 AMUMA Collection. All rights reserved.",
  },
};
