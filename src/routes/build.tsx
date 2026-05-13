import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Check, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/build")({
  component: BuildPage,
  head: () => ({
    meta: [
      { title: "Build a PC — PCLab" },
      { name: "description", content: "Assemble your custom PC by choosing a CPU, GPU, motherboard, RAM, storage, PSU, and case. Live prices in RUB and USD." },
      { property: "og:title", content: "Build a PC — PCLab" },
      { property: "og:description", content: "Assemble your custom PC and compare prices in rubles and dollars." },
    ],
  }),
});

// Approximate RUB/USD rate used to derive the missing currency.
const USD_RUB = 92;

type Source = "ozon" | "dns";
type Part = {
  id: string;
  name: string;
  rub: number;
  source: Source;
  url: string;
};

type Category = {
  key: string;
  label: string;
  parts: Part[];
};

const sourceLabel: Record<Source, string> = {
  ozon: "ozon.ru",
  dns: "dns-shop.ru",
};

const CATEGORIES: Category[] = [
  {
    key: "cpu",
    label: "Processor (CPU)",
    parts: [
      { id: "cpu-1", name: "AMD Ryzen 5 5600", rub: 11990, source: "ozon", url: "https://www.ozon.ru/search/?text=AMD+Ryzen+5+5600" },
      { id: "cpu-2", name: "AMD Ryzen 7 5800X3D", rub: 28990, source: "wdns", url: "https://dns-shop.ru/search/?q=Ryzen+5800X3D" },
      { id: "cpu-3", name: "Intel Core i5-13400F", rub: 18490, source: "ozon", url: "https://www.ozon.ru/search/?text=Intel+Core+i5-13400F" },
      { id: "cpu-4", name: "Intel Core i7-13700K", rub: 38990, source: "wdns", url: "https://dns-shop.ru/search/?q=i7-13700K" },
    ],
  },
  {
    key: "gpu",
    label: "Graphics Card (GPU)",
    parts: [
      { id: "gpu-1", name: "NVIDIA RTX 4060 8GB", rub: 32990, source: "ozon", url: "https://www.ozon.ru/search/?text=RTX+4060" },
      { id: "gpu-2", name: "NVIDIA RTX 4070 Super 12GB", rub: 64990, source: "wdns", url: "https://dns-shop.ru/search/?q=RTX+4070+Super" },
      { id: "gpu-3", name: "NVIDIA RTX 4080 Super 16GB", rub: 109990, source: "wdns", url: "https://dns-shop.ru/search/?q=RTX+4080+Super" },
      { id: "gpu-4", name: "AMD Radeon RX 7800 XT 16GB", rub: 54990, source: "ozon", url: "https://www.ozon.ru/search/?text=RX+7800+XT" },
    ],
  },
  {
    key: "mobo",
    label: "Motherboard",
    parts: [
      { id: "mb-1", name: "MSI B550 Tomahawk", rub: 14990, source: "ozon", url: "https://www.ozon.ru/search/?text=MSI+B550+Tomahawk" },
      { id: "mb-2", name: "ASUS ROG Strix B650-A", rub: 22990, source: "wdns", url: "https://dns-shop.ru/search/?q=ROG+Strix+B650-A" },
      { id: "mb-3", name: "Gigabyte Z790 Aorus Elite", rub: 27990, source: "wdns", url: "https://dns-shop.ru/search/?q=Z790+Aorus+Elite" },
    ],
  },
  {
    key: "ram",
    label: "Memory (RAM)",
    parts: [
      { id: "ram-1", name: "Kingston Fury 16GB DDR4-3600", rub: 5490, source: "ozon", url: "https://www.ozon.ru/search/?text=Kingston+Fury+16GB+DDR4" },
      { id: "ram-2", name: "Corsair Vengeance 32GB DDR5-6000", rub: 12990, source: "wdns", url: "https://dns-shop.ru/search/?q=Corsair+Vengeance+DDR5+6000" },
      { id: "ram-3", name: "G.Skill Trident Z5 64GB DDR5-6400", rub: 27990, source: "wdns", url: "https://dns-shop.ru/search/?q=Trident+Z5+64GB" },
    ],
  },
  {
    key: "storage",
    label: "Storage (SSD)",
    parts: [
      { id: "ssd-1", name: "Samsung 980 1TB NVMe", rub: 7490, source: "ozon", url: "https://www.ozon.ru/search/?text=Samsung+980+1TB" },
      { id: "ssd-2", name: "Samsung 990 Pro 2TB NVMe", rub: 18990, source: "wdns", url: "https://dns-shop.ru/search/?q=Samsung+990+Pro+2TB" },
      { id: "ssd-3", name: "WD Black SN850X 4TB", rub: 36990, source: "wdns", url: "https://dns-shop.ru/search/?q=WD+Black+SN850X+4TB" },
    ],
  },
  {
    key: "psu",
    label: "Power Supply (PSU)",
    parts: [
      { id: "psu-1", name: "be quiet! Pure Power 12 M 650W", rub: 7990, source: "ozon", url: "https://www.ozon.ru/search/?text=Pure+Power+12+M+650W" },
      { id: "psu-2", name: "Corsair RM850x 850W 80+ Gold", rub: 13990, source: "wdns", url: "https://dns-shop.ru/search/?q=Corsair+RM850x" },
      { id: "psu-3", name: "Seasonic Prime TX-1000 1000W", rub: 28990, source: "wdns", url: "https://dns-shop.ru/search/?q=Seasonic+Prime+TX+1000" },
    ],
  },
  {
    key: "case",
    label: "Case",
    parts: [
      { id: "case-1", name: "DeepCool CC560", rub: 5490, source: "ozon", url: "https://www.ozon.ru/search/?text=DeepCool+CC560" },
      { id: "case-2", name: "Lian Li Lancool 216", rub: 11990, source: "wdns", url: "https://dns-shop.ru/search/?q=Lancool+216" },
      { id: "case-3", name: "Fractal Design North", rub: 14990, source: "wdns", url: "https://dns-shop.ru/search/?q=Fractal+Design+North" },
    ],
  },
];

function fmtRub(v: number) {
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(v);
}
function fmtUsd(v: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);
}

function BuildPage() {
  const [selected, setSelected] = useState<Record<string, string>>({});

  const totals = useMemo(() => {
    let rub = 0;
    for (const cat of CATEGORIES) {
      const id = selected[cat.key];
      const part = cat.parts.find((p) => p.id === id);
      if (part) rub += part.rub;
    }
    return { rub, usd: rub / USD_RUB };
  }, [selected]);

  return (
    <main className="min-h-screen px-4 py-10 bg-background">
      <SiteHeader />

      <section className="w-full max-w-[1100px] mx-auto">
        <div className="mb-8 px-2">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Build your PC
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Pick a part for each category. Prices are sourced from{" "}
            <a href="https://www.ozon.ru" className="underline">ozon.ru</a> and{" "}
            <a href="https://dns-shop.ru" className="underline">dns-shop.ru</a>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 px-2">
          <div className="space-y-6">
            {CATEGORIES.map((cat) => (
              <div key={cat.key} className="rounded-2xl border border-border bg-card p-5">
                <h2 className="font-display text-lg font-semibold text-card-foreground mb-3">
                  {cat.label}
                </h2>
                <div className="grid gap-2">
                  {cat.parts.map((part) => {
                    const isSelected = selected[cat.key] === part.id;
                    return (
                      <button
                        key={part.id}
                        onClick={() =>
                          setSelected((s) => ({
                            ...s,
                            [cat.key]: isSelected ? "" : part.id,
                          }))
                        }
                        className={`w-full text-left flex items-center justify-between gap-4 rounded-xl border px-4 py-3 transition-colors ${
                          isSelected
                            ? "border-primary bg-accent"
                            : "border-border hover:bg-accent/50"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? "bg-primary border-primary text-primary-foreground" : "border-border"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </span>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-foreground truncate">{part.name}</div>
                            <a
                              href={part.url}
                              target="_blank"
                              rel="noreferrer noopener"
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                            >
                              {sourceLabel[part.source]} <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-sm font-semibold text-foreground">{fmtRub(part.rub)}</div>
                          <div className="text-xs text-muted-foreground">{fmtUsd(part.rub / USD_RUB)}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-6 h-fit rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-lg font-semibold text-card-foreground mb-4">Your build</h2>
            <ul className="space-y-2 mb-4">
              {CATEGORIES.map((cat) => {
                const part = cat.parts.find((p) => p.id === selected[cat.key]);
                return (
                  <li key={cat.key} className="flex justify-between gap-2 text-sm">
                    <span className="text-muted-foreground">{cat.label}</span>
                    <span className="text-foreground text-right truncate max-w-[55%]">
                      {part ? part.name : "—"}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">Total</span>
                <div className="text-right">
                  <div className="text-xl font-semibold text-foreground">{fmtRub(totals.rub)}</div>
                  <div className="text-xs text-muted-foreground">≈ {fmtUsd(totals.usd)}</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
