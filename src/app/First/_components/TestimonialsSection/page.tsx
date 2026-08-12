import TestimonialCard, {
  TestimonialCardProps,
} from "@/shared/TestimonialCard/testimonialCard";

export interface TestimonialsStat {
  value: string; // e.g. "4.9", "99%"
  label: string; // e.g. "App Store Rating"
}

export interface TestimonialsSectionProps {
  eyebrow?: string;
  heading: string;
  stats?: TestimonialsStat[];
  testimonials: (TestimonialCardProps & { id: string | number })[]; // اتأكد إن الـ id موجود في الـ TestimonialCardProps الأصلي كمان
  className?: string;
}

export default function TestimonialsSection({
  eyebrow = "Social Proof",
  heading,
  stats = [],
  testimonials,
  className = "",
}: TestimonialsSectionProps) {
  return (
    <section className={`bg-slate-50 py-16 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              {eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {heading}
            </h2>
          </div>

          {stats.length > 0 && (
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 mt-4 sm:mt-0">
              {stats.map((stat) => (
                <div key={stat.label} className="text-left sm:text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cards grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
