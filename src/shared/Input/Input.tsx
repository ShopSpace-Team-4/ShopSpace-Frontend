import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className="bg-(--bg-inverse) pt-16 pb-8 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-16">
            <div className="md:col-span-5 lg:col-span-5">
              <Link
                href="/"
                className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                <Image
                  src="/favicon.ico"
                  alt="ShopSpace Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded"
                />
                <span className="font-bold text-xl tracking-wide text-white">
                  ShopSpace
                </span>
              </Link>
              <p className="text-(--text-tertiary) text-sm leading-relaxed max-w-sm">
                The leading platform connecting commercial property owners with
                ambitious tenants across Alexandria Governorate.
              </p>
            </div>
            <div className="md:col-span-7 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-5">
                  Platform
                </h3>
                <ul className="space-y-4">
                  {["Marketplace", "AI Advisor", "How It Works", "Pricing"].map(
                    (item) => (
                      <li key={item}>
                        <Link
                          href="#"
                          className="text-sm text-(--text-tertiary) hover:text-white transition-colors">
                          {item}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-5">
                  Landlords
                </h3>
                <ul className="space-y-4">
                  {["List a Space", "Dashboard", "Analytics", "Support"].map(
                    (item) => (
                      <li key={item}>
                        <Link
                          href="#"
                          className="text-sm text-(--text-tertiary) hover:text-white transition-colors">
                          {item}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              {/* عمود: COMPANY */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-5">
                  Company
                </h3>
                <ul className="space-y-4">
                  {["About Us", "Blog", "Careers", "Contact"].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-sm text-(--text-tertiary) hover:text-white transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-(--text-tertiary)">
              © 2025 ShopSpace Technologies. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <Link
                    href="#"
                    key={item}
                    className="text-xs text-(--text-tertiary) hover:text-white transition-colors">
                    {item}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
