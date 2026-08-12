import React from "react";
import Image from "next/image";
import { Globe, Moon, Bell } from "lucide-react";
import SpaceShopLogo from "../../../public/space-shop.png"; // تأكد من مسار الصورة

export default function TopNav() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-[#0f172a] text-white border-b border-slate-800">
      <div className="flex items-center gap-2 cursor-pointer">
        <Image
          src={SpaceShopLogo}
          alt="ShopSpace Logo"
          width={32}
          height={32}
          className="object-contain filter brightness-0 invert"
        />
        <span className="text-xl font-bold tracking-tight">ShopSpace</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 mr-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700 rounded-lg text-sm font-medium text-slate-200 transition-colors">
            <Globe size={16} />
            <span>العربية</span>
          </button>

          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700 rounded-lg text-sm font-medium text-slate-200 transition-colors">
            <Moon size={16} />
            <span>Dark</span>
          </button>
        </div>

        <button className="relative flex items-center justify-center w-10 h-10 bg-white rounded-full hover:bg-slate-100 transition-colors">
          <Bell size={20} className="text-slate-800" />
          <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full translate-x-[-2px] translate-y-[2px]"></span>
        </button>

        <button className="w-10 h-10 overflow-hidden rounded-full border border-slate-700 hover:opacity-80 transition-opacity">
          <img
            src="https://i.pravatar.cc/150?img=11"
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </nav>
  );
}
