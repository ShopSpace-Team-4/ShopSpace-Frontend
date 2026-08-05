import TestimonialCard, {
  TestimonialCardProps,
} from "../../../shared/TestimonialCard/testimonialCard";

export interface TestimonialsStat {
  value: string; // e.g. "4.9", "99%"
  label: string; // e.g. "App Store Rating"
}

export interface TestimonialsSectionProps {
  eyebrow?: string;
  heading: string;
  stats?: TestimonialsStat[];
  testimonials: TestimonialCardProps[];
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
    <section className={`bg-slate-50 px-6 py-12 ${className}`}>
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            {eyebrow}
          </p>
          <h2 className="mt-1 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
            {heading}
          </h2>
        </div>

        {stats.length > 0 && (
          <div className="flex items-center gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-right">
                <p className="text-xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cards grid */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <TestimonialCard key={i} {...testimonial} />
        ))}
      </div>
    </section>
  );
}