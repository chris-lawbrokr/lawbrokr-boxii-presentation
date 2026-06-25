/**
 * content.ts — the lawbrokr brand: copy, assets, CTAs, and the content TYPES.
 *
 * Ported verbatim from the boxii-mvp widget (src/data/content.ts +
 * src/brands/lawbrokr.ts). The presentation deployment renders a single brand
 * (lawbrokr), so the brand-registry / brand-switching machinery is dropped —
 * the design tokens that differ from the base theme are baked into boxii.css.
 */

export type TabId = "new" | "comparing" | "customer";

export type Chip = {
  id: string;
  icon: string;
  q: string;
  title: string;
  body: string;
  primary: string;
  /** If set, the chip is a new-tab link instead of opening its answer popup. */
  href?: string;
};

export type NavCol = { heading: string; links: string[] };

export type TabContent = {
  label: string;
  headline?: string;
  subhead?: string;
  cta?: string;
  /** Makes the hero CTA a new-tab link instead of its default behaviour. */
  ctaHref?: string;
  chips?: Chip[];
  /** When present, the tab renders a site-nav menu instead of the hero center. */
  nav?: NavCol[];
};

export type Logo = { src: string; alt: string };

export interface Brand {
  id: string;
  name: string;
  logoSrc?: string;
  ctaPrimary: { label: string; href?: string };
  ctaSecondary: { label: string; href?: string };
  tabs: Record<TabId, TabContent>;
  siteNav: NavCol[];
  logos: Logo[];
  testimonial: { quote: string; readMore: string; avatar: string; href?: string };
  infoCards: { label: string; title: string; sub: string; href?: string }[];
  chipFoot: string;
}

// HubSpot discovery-call booking link (reused by the header CTA + the
// "get in touch" card).
const BOOKING_URL =
  "https://meetings.hubspot.com/jgutmann/discovery-call-website?uuid=101a9f7f-fc01-428c-9a8a-8e52df66cd3a";

export const brand: Brand = {
  id: "lawbrokr",
  name: "lawbrokr.",
  logoSrc: "/images/lawbrokr-logo.svg",

  ctaPrimary: { label: "Talk to Sales", href: BOOKING_URL },
  ctaSecondary: { label: "Login", href: "https://app.lawbrokr.com/" },

  tabs: {
    new: {
      label: "Home",
      headline:
        "Stop losing leads your<br />marketing <span>already paid for.</span>",
      subhead: "",
      cta: "Book a free demo",
      ctaHref: BOOKING_URL,
      chips: [
        {
          id: "do",
          icon: "🎯",
          q: "See how it works",
          title: "Turn clicks into signed clients",
          body: "Lawbrokr replaces the static contact form with a guided digital intake that qualifies, routes, and follows up with every lead — so the traffic your marketing paid for actually reaches your intake team.",
          primary: "Book a free demo",
        },
        {
          id: "dropoff",
          icon: "🧩",
          q: "Browse Integrations",
          title: "Most drop-off happens after the click",
          body: "Slow forms, manual follow-up, and intake teams buried in email quietly lose the majority of inbound leads. Lawbrokr captures and qualifies them instantly, then hands intake a prioritized queue.",
          primary: "See the platform",
        },
        {
          id: "setup",
          icon: "🤝",
          q: "Vendors & Partners",
          title: "Live on your site in a day",
          body: "Drop in one snippet, pick your intake flow, and start converting the same day — no developers and no website rebuild required.",
          primary: "See the quickstart",
        },
      ],
    },
    comparing: {
      label: "Conversion",
      headline: "Every lead, qualified and routed.",
      subhead: "Capture, score, and hand off new clients without the busywork.",
      cta: "Unlock your conversion rate",
      chips: [
        {
          id: "qualify",
          icon: "✅",
          q: "How do you qualify leads?",
          title: "Smart intake that asks the right questions",
          body: "Branching intake flows ask only what matters for each matter type, score the lead, and flag the ones worth a callback — so your team spends time on clients, not tire-kickers.",
          primary: "See a sample flow",
        },
        {
          id: "route",
          icon: "🔀",
          q: "Where do the leads go?",
          title: "Routed to the right person, instantly",
          body: "Qualified leads land in the right inbox, CRM, or practice group the moment they're submitted, with the full intake attached — no copy-paste and no leads sitting overnight.",
          primary: "See integrations",
        },
        {
          id: "followup",
          icon: "⏱️",
          q: "What about follow-up?",
          title: "Automatic, immediate follow-up",
          body: "The first response goes out in seconds, with reminders and nudges until the lead books — closing the speed-to-lead gap that quietly kills conversion.",
          primary: "See follow-up",
        },
      ],
    },
    customer: {
      label: "Why Lawbrokr",
      headline: "Why firms choose Lawbrokr.",
      subhead: "More signed clients from the marketing spend you already have.",
      cta: "I'm looking for something else",
      chips: [
        {
          id: "roi",
          icon: "📈",
          q: "What's the ROI?",
          title: "More clients, same ad budget",
          body: "By converting more of the leads you already pay for, Lawbrokr lifts signed-client volume without raising spend — most firms see the difference within the first month.",
          primary: "Read the case study",
        },
        {
          id: "fit",
          icon: "🧩",
          q: "Does it fit our stack?",
          title: "Works with the tools you run",
          body: "Native connections to your CRM, calendar, and case-management tools, plus a simple API and webhooks for everything else — so intake data flows where your team already works.",
          primary: "Browse integrations",
        },
        {
          id: "trust",
          icon: "🔒",
          q: "Is client data secure?",
          title: "Built for confidential intake",
          body: "Intake data is encrypted in transit and at rest with role-based access and audit trails, so sensitive client information stays protected from first click to signed engagement.",
          primary: "Book a free demo",
        },
      ],
    },
  },

  siteNav: [
    {
      heading: "Product",
      links: ["Digital intake", "Lead routing", "Follow-up", "Analytics"],
    },
    {
      heading: "Solutions",
      links: ["Law firms", "Agencies", "Multi-location", "Enterprise"],
    },
    {
      heading: "Resources",
      links: ["Blog", "Conversion guides", "Help center", "Case studies"],
    },
    {
      heading: "Company",
      links: ["About", "Pricing", "Customers", "Book a free demo"],
    },
  ],

  // Client law-firm logos from lawbrokr.com's homepage marquee.
  logos: [
    {
      src: "https://cdn.prod.website-files.com/62b1794f8671cb0b4a0087d0/68fa4dd56616a15e86fedd61_image%2066.png",
      alt: "Stringam Law",
    },
    {
      src: "https://cdn.prod.website-files.com/62b1794f8671cb0b4a0087d0/657b58379b8f9894e34280cc_Frame%203738.png",
      alt: "Merel Family Law",
    },
    {
      src: "https://cdn.prod.website-files.com/62b1794f8671cb0b4a0087d0/657b5837fc9f233a183d3155_Frame%203737.png",
      alt: "Freeburg & Granieri",
    },
    {
      src: "https://cdn.prod.website-files.com/62b1794f8671cb0b4a0087d0/690265fe6dee4cf9180f04ec_banalaw.png",
      alt: "Bana Law",
    },
    {
      src: "https://cdn.prod.website-files.com/62b1794f8671cb0b4a0087d0/690265ffae0f7bcec7d42663_pinesfederal.png",
      alt: "Pines Federal",
    },
    {
      src: "https://cdn.prod.website-files.com/62b1794f8671cb0b4a0087d0/657b5838522aa9029a6b03a7_Frame%203742.png",
      alt: "Atticus Family Law",
    },
    {
      src: "https://cdn.prod.website-files.com/62b1794f8671cb0b4a0087d0/69a74d063179e1d093a5defb_a13d0c61a647fd446e6e91d80db58b26_ALHLawGroup.png",
      alt: "ALH Law Group",
    },
    {
      src: "https://cdn.prod.website-files.com/62b1794f8671cb0b4a0087d0/690265febad51c20c9e68aa6_ramlaw.png",
      alt: "Ram Law",
    },
  ],

  testimonial: {
    quote: "Discover how Lawbrokr can support you and your firm.",
    readMore: "Book a call",
    avatar: "/images/lawbrokr-face.webp",
    href: BOOKING_URL,
  },

  infoCards: [
    {
      label: "Explore",
      title: "Platform overview",
      sub: "See the intake flow end to end in 3 minutes.",
      href: "https://www.lawbrokr.com/storefront",
    },
    {
      label: "Read",
      title: "Guides & playbooks",
      sub: "Convert more of the leads you already get.",
      href: "https://www.lawbrokr.com/guides-and-resources",
    },
  ],

  chipFoot: "Answer curated by Lawbrokr — last reviewed Jun 2026.",
};

/** All chips across every tab, used to resolve an open chip popup by id. */
export function allChips(): Chip[] {
  return Object.values(brand.tabs).flatMap((t) => t.chips ?? []);
}

// One gesture = one step. The strong part of a flick holds the lock; the
// momentum tail (sub-floor ticks) is ignored so the lock releases promptly.
export const NEW_GESTURE = 6;
export const MOMENTUM_FLOOR = 4;
export const QUIET_MS = 80;
