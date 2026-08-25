import { Search, LayoutGrid, ShieldCheck, MessageSquare, LineChart, FileSignature } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Search & Filters",
    description:
      "Filter by area, price, category, foot traffic data, and more to find exactly what you need.",
  },
  {
    icon: LayoutGrid,
    title: "AI Business Advisor",
    description:
      "Our AI analyzes your business model, target customers, and budget to recommend the best spots.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    description:
      "Every property is manually verified — ownership documents, photos, and details are all confirmed.",
  },
  {
    icon: MessageSquare,
    title: "Direct Messaging",
    description:
      "Chat with landlords, schedule visits, negotiate terms, all inside the platform.",
  },
  {
    icon: LineChart,
    title: "Market Analytics",
    description:
      "Access live foot traffic data, competitor density, and pricing trends for every neighborhood.",
  },
  {
    icon: FileSignature,
    title: "Secure Contracts",
    description:
      "Digital leases with e-signature, escrow payment protection, and dispute resolution built in.",
  },
];

interface HeroStatsProps {
  // Real count fetched from the backend (GET /listings meta.total).
  // The other three stats aren't backed by any API yet, so they stay
  // as placeholder marketing copy until the backend exposes them.
  activeListingsCount?: number;
}

export default function HeroStats({ activeListingsCount }: HeroStatsProps) {
  const stats = [
    {
      value: activeListingsCount != null ? `${activeListingsCount.toLocaleString()}+` : "—",
      label: "Active Listings",
    },
    { value: "18", label: "Cities Covered" },
    { value: "8,900+", label: "Successful Rentals" },
    { value: "3,200+", label: "Verified Landlords" },
  ];

  return (
    <section className="w-full bg-(--bg-elevated)">
      <div className="mx-auto w-full max-w-300 px-5 py-16 sm:px-8 sm:py-20 lg:px-0 lg:py-24">
        {/* Top: heading + stats grid */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Left: heading */}
          <div className="max-w-95">
            <span className="inline-flex items-center rounded-full bg-(--brand-accent-subtle) px-2.25 py-0.75 text-[11px] font-semibold tracking-wide text-(--brand-accent-hover)">
              Platform Features
            </span>
            <h2 className="mt-4 text-[42px] font-extrabold leading-12 tracking-[-0.8px] text-(--text-primary)">
              Everything to Find or Fill a Space
            </h2>
            <p className="mt-4 text-base leading-6.75 text-(--text-secondary)">
              AI-powered intelligence meets verified listings and secure
              tools, everything you need in one platform.
            </p>
          </div>

          {/* Right: stats grid */}
          <div className="grid w-full grid-cols-2 gap-0 border border-(--border-base) sm:max-w-189.5">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={[
                  "flex flex-col justify-center px-6 py-5",
                  i % 2 === 0 ? "border-r border-(--border-base)" : "",
                  i < 2 ? "border-b border-(--border-base)" : "",
                ].join(" ")}
              >
                <span className="text-[28px] font-extrabold leading-10.5 tracking-[-0.5px] text-(--text-primary)">
                  {stat.value}
                </span>
                <span className="text-[13px] leading-5 text-(--text-tertiary)">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature cards grid */}
        <div className="mt-16 overflow-hidden rounded-[18px] bg-(--border-base) shadow-[0_4px_12px_rgba(15,23,42,0.07),0_2px_6px_rgba(15,23,42,0.04)]">
          <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex flex-col bg-(--bg-elevated) px-7 py-8"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-(--bg-sunken)">
                    <Icon
                      className="h-5 w-5 text-(--text-secondary)"
                      strokeWidth={1.75}
                    />
                  </div>
                  <h3 className="mt-5 text-base font-bold leading-5.5 text-(--text-primary)">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-5.5 text-(--text-secondary)">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}