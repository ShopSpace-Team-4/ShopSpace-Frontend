import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/heroImg.jpg"
          alt="Commercial Real Estate Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-(--bg-inverse)/85"></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-(--bg-base) to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-start mt-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-(--brand-accent) shadow-[0_0_8px_var(--brand-accent)]"></span>
          <span className="text-xs font-medium text-gray-300 tracking-wide">
            AI-Powered Commercial Real Estate Platform
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 max-w-4xl tracking-tight">
          Find Your Perfect <br />
          <span className="bg-linear-to-r from-(--brand-accent) to-indigo-400 bg-clip-text text-transparent">
            Commercial Space
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed">
          Connect with verified landlords, get AI-powered location insights, and
          find the ideal shop for your business — all in one platform.
        </p>

        <div className="w-full max-w-4xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 mb-16 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="flex-1 flex items-center bg-(--bg-inverse)/50 border border-white/10 rounded-xl px-4 py-3">
              <Search color="white" />
              <input
                type="text"
                placeholder="City, district, or landmark..."
                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm ps-3"
              />
            </div>

            <div className="w-full md:w-48 flex items-center bg-(--bg-inverse)/50 border border-white/10 rounded-xl px-4 py-3 cursor-pointer">
              <select className="w-full bg-transparent text-gray-300 focus:outline-none text-sm appearance-none cursor-pointer">
                <option value="all" className="bg-[#0F172A]">
                  All
                </option>
                <option value="retail" className="bg-[#0F172A]">
                  Retail
                </option>
                <option value="office" className="bg-[#0F172A]">
                  Office
                </option>
              </select>
              <ChevronDown color="white" size={22} />
            </div>

            <button className="bg-(--brand-primary) hover:bg-(--brand-primary-hover) text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer">
              <Search />
              Search
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              "Coffee Shop",
              "Boutique",
              "Restaurant",
              "Office",
              "Pharmacy",
            ].map((tag) => (
              <button
                key={tag}
                className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-white/10 transition-colors cursor-pointer">
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full max-w-4xl">
          {[
            { value: "12,400+", label: "Active Listings" },
            { value: "18", label: "Cities Covered" },
            { value: "8,900+", label: "Successful Rentals" },
            { value: "3,200+", label: "Verified Landlords" },
          ].map((stat, index) => (
            <div key={index} className="flex flex-col gap-1">
              <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-gray-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
