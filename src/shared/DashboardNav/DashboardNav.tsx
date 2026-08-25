import Image from "next/image";
import Link from "next/link";
import { Globe, Moon } from "lucide-react";

export default function DashboardNav() {
  return (
    <header className="flex w-full items-center gap-6 border-b border-white/[0.06] bg-(--bg-inverse) px-3 py-3">
      <Link href="/" className="flex items-center gap-2.5">
        <Image
          src="/favicon.ico"
          alt="ShopSpace"
          width={40}
          height={40}
          className="h-10 w-10 rounded-2xl"
        />
        <span className="text-lg font-extrabold tracking-[-0.3px] text-(--text-inverse)">
          ShopSpace
        </span>
      </Link>

      <div className="ml-auto flex items-center gap-1.5">
        <button className="flex h-[27px] items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.06] px-2.5 text-[11px] font-semibold tracking-wide text-white/75 transition-colors hover:bg-white/10 cursor-pointer">
          <Globe className="h-3 w-3" strokeWidth={1.75} />
          العربية
        </button>

        <button className="flex h-[27px] items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.06] px-2.5 text-[11px] font-normal text-white/60 transition-colors hover:bg-white/10 cursor-pointer">
          <Moon className="h-3 w-3" strokeWidth={1.75} />
          Dark
        </button>
      </div>
    </header>
  );
}