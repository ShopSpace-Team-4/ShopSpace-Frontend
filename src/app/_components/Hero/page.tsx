import Image from "next/image";
import SearchForm from "./SearchForm";

export interface StatItem {
  value: string;
  label: string;
}

export interface HeroProps {
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
  backgroundImage?: string;
  stats?: StatItem[];
}

export default function Hero({
  titleLine1 = "Find Your Perfect",
  titleLine2 = "Commercial Space",
  description = "Connect with verified landlords...",
  backgroundImage = "/heroImg.jpg",
  stats = [
    { value: "12,400+", label: "Active Listings" },
    { value: "18", label: "Cities Covered" },
    { value: "8,900+", label: "Successful Rentals" },
    { value: "3,200+", label: "Verified Landlords" },
  ],
}: HeroProps) {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-(--bg-inverse)/85"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-start mt-12">
        {/* استخدمنا الـ Props هنا */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
          {titleLine1} <br /> {titleLine2}
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mb-12">{description}</p>

        <SearchForm />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full max-w-4xl">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-white">
                {stat.value}
              </span>
              <span className="text-xs text-gray-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
