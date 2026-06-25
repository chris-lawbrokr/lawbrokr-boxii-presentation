// "Trusted by" partner-logo marquee, mirroring the band on mycroft.io.
// The track renders the logos twice so the CSS animation (translateX -50%)
// loops seamlessly.

const LOGOS = [
  { src: "/images/partners/spatial-media.webp", alt: "Spatial Media" },
  { src: "/images/partners/cascade.webp", alt: "Cascade" },
  { src: "/images/partners/scrapegraphai.webp", alt: "ScrapeGraphAI" },
  { src: "/images/partners/deeptrust.webp", alt: "deeptrust" },
  { src: "/images/partners/willful.webp", alt: "willful" },
  { src: "/images/partners/zeroclick.webp", alt: "ZeroClick" },
  { src: "/images/partners/covet.webp", alt: "Covet" },
  { src: "/images/partners/superwhisper.webp", alt: "Superwhisper" },
];

export default function Marquee() {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0e2a2a] py-5">
      {/* Edge fades so logos slide in/out softly. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0e2a2a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0e2a2a] to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-16 pr-16">
        {[...LOGOS, ...LOGOS].map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.alt}
            aria-hidden
            className="h-6 w-auto shrink-0 opacity-90 min-[1150px]:h-7"
          />
        ))}
      </div>
    </div>
  );
}
