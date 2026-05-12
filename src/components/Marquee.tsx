import { type CSSProperties } from "react";

const logos = [
  { name: "Ozon", src: "https://svgl.app/library/ozon.svg", from: "#1e3a8a", to: "#3b82f6" },
  { name: "DNS", src: "https://svgl.app/library/dns.svg", from: "#1e40af", to: "#60a5fa" },
  { name: "Blender", src: "https://svgl.app/library/blender.svg", from: "#1d4ed8", to: "#38bdf8" },
  { name: "Amazon", src: "https://svgl.app/library/amazon.svg", from: "#6d28d9", to: "#a78bfa" },
  { name: "Shopify", src: "https://svgl.app/library/shopify.svg", from: "#ca8a04", to: "#facc15" },
  { name: "Spotify", src: "https://svgl.app/library/spotify.svg", from: "#be123c", to: "#f472b6" },
  { name: "Google Cloud", src: "https://svgl.app/library/google-cloud.svg", from: "#0ea5e9", to: "#7dd3fc" },
  { name: "Vercel", src: "https://svgl.app/library/vercel.svg", from: "#0f172a", to: "#475569" },
];

const maskStyle: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
  maskImage:
    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
};

export function Marquee() {
  return (
    <div className="marquee-pause overflow-hidden mt-10" style={maskStyle}>
      <div className="flex w-max animate-marquee gap-4">
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="group relative h-24 w-40 shrink-0 flex items-center justify-center rounded-full bg-white border border-slate-200/60 shadow-sm hover:border-slate-300 transition-all overflow-hidden"
          >
            <div
              className="absolute inset-0 scale-150 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500"
              style={{ background: `linear-gradient(135deg, ${logo.from}, ${logo.to})` }}
            />
            <img
              src={logo.src}
              alt={logo.name}
              className="relative z-10 max-h-8 max-w-[60%] object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
            />
          </div>
        ))}
      </div>
    </div>
  );
}