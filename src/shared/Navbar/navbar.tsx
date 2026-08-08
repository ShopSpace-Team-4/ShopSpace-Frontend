import Link from "next/link";
import Image from "next/image";
import { Globe, Moon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-(--bg-inverse) text-(--text-inverse) border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/favicon.ico"
            alt="ShopSpace Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="font-bold text-xl tracking-wide">ShopSpace</span>
        </Link>

        <div className="flex items-center gap-3">
          <a
            href="./Signup"
            className="px-5 py-1.5 text-sm font-medium border border-gray-500 rounded-full hover:bg-gray-800 transition-colors cursor-pointer">
            Sign In
          </a>

          <button className="cursor-pointer px-4 py-1.5 text-sm font-medium text-gray-300 border border-gray-600 rounded-md flex items-center gap-2 hover:bg-gray-800 transition-colors font-arabic">
            <Globe size={18} />
            العربية
          </button>

          <button className="cursor-pointer px-4 py-1.5 text-sm font-medium text-gray-400 border border-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-800 transition-colors">
            <Moon size={18} />
            Dark
          </button>
        </div>
      </div>
    </nav>
  );
}
