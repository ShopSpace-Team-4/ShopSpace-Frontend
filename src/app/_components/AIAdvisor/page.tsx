import { Sparkles, Check, ArrowRight } from "lucide-react";

const points = [
  "Analyzes 50+ location data points in seconds",
  "Compares multiple neighborhoods side-by-side",
  "Estimates ROI and payback period",
  "Generates a full business readiness checklist",
];

export default function AIAdvisor() {
  return (
    <section className="w-full bg-(--bg-inverse)">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 lg:px-0">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: copy */}
          <div className="w-full max-w-[568px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-(--brand-accent)/25 bg-(--brand-accent)/15 px-3.5 py-1.5 text-[13px] font-medium text-(--text-inverse)/90">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              AI Business Advisor
            </span>

            <h2 className="mt-6 max-w-[433px] text-[42px] font-extrabold leading-[50px] tracking-[-0.8px] text-(--text-inverse)">
              Let AI Choose Your Perfect Location
            </h2>

            <p className="mt-5 max-w-[568px] text-base leading-[27px] text-(--text-inverse)/65">
              Tell our AI about your business concept, target customers, and
              budget — it will scan the market and recommend the best spots
              for you to open.
            </p>

            <ul className="mt-8 flex flex-col gap-3.5">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[10px] bg-(--brand-accent-subtle)">
                    <Check
                      className="h-2.5 w-2.5 text-(--brand-accent)"
                      strokeWidth={3}
                    />
                  </span>
                  <span className="text-sm leading-[21px] text-(--text-inverse)/80">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <button className="mt-9 inline-flex items-center gap-2 rounded-full bg-(--brand-accent) px-7 py-3 text-[15px] font-semibold text-(--text-inverse) shadow-[0_1px_3px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)] transition-colors hover:bg-(--brand-accent-hover)">
              Try AI Advisor Free
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>

          {/* Right: chat mockup */}
          <div className="w-full max-w-[420px] rounded-[18px] border border-(--text-inverse)/10 bg-(--text-inverse)/5 p-6">
            <div className="flex items-center gap-2.5 border-b border-(--text-inverse)/10 pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-linear-to-br from-(--brand-accent) to-(--brand-primary)">
                <Sparkles className="h-4 w-4 text-(--text-inverse)" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-semibold leading-5 text-(--text-inverse)">
                  ShopSpace AI Advisor
                </p>
                <p className="text-[11px] leading-4 text-(--text-inverse)/40">
                  Powered by advanced location intelligence
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-(--status-success-subtle) px-2.5 py-1 text-[11px] font-semibold tracking-wide text-(--status-success-text)">
                <span className="h-1.5 w-1.5 rounded-full bg-(--status-success)/80" />
                Live
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <div className="ml-auto max-w-[276px] rounded-[18px_18px_4px_18px] bg-(--brand-primary) px-3.5 py-2.5 text-[13px] leading-5 text-(--text-inverse)">
                I want to open a specialty coffee shop. Budget SAR 15,000/month, targeting young professionals.
              </div>

              <div className="mr-auto max-w-[276px] rounded-[18px_18px_18px_4px] bg-(--text-inverse)/10 px-3.5 py-2.5 text-[13px] leading-5 text-(--text-inverse)/85">
                Great profile! Al Olaya District leads — 78% young professional density with strong daytime foot traffic.
              </div>

              <div className="ml-auto max-w-[276px] rounded-[18px_18px_4px_18px] bg-(--brand-primary) px-3.5 py-2.5 text-[13px] leading-5 text-(--text-inverse)">
                Yes, show me the top recommendation with ROI estimate.
              </div>

              <div className="mr-auto max-w-[276px] rounded-[18px_18px_18px_4px] bg-(--text-inverse)/10 px-3.5 py-2.5 text-[13px] leading-5 text-(--text-inverse)/85">
                Top pick: King Fahd Road corner unit (120m²), SAR 8,500/month. Estimated payback period: 14 months.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}