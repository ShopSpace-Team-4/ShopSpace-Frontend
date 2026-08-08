"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  LayoutList,
  LayoutDashboard,
  BarChart3,
  User,
  Store,
  LogOut,
  Home,
  Search,
} from "lucide-react";

export type SidebarMode = "landlord" | "tenant";

export type SidebarActiveItem =
  | "add-listing"
  | "my-listings"
  | "overview"
  | "analytics"
  | "PersonalDetails";

export interface SidebarProps {
  userName?: string;
  userAvatarUrl?: string;
  mode?: SidebarMode;
  active?: SidebarActiveItem;
}

const navItems: {
  key: SidebarActiveItem;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}[] = [
  {
    key: "add-listing",
    label: "Add Listing",
    href: "/dashboard/add-listing",
    icon: Plus,
  },
  {
    key: "my-listings",
    label: "My Listings",
    href: "/dashboard/my-listing",
    icon: LayoutList,
  },
  {
    key: "overview",
    label: "Overview",
    href: "/dashboard/overview",
    icon: LayoutDashboard,
  },
  {
    key: "analytics",
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    key: "PersonalDetails",
    label: "Personal Details",
    href: "/dashboard/PersonalDetails",
    icon: User,
  },
];

export default function Sidebar({
  userName = "Abdullah Al-Rashid",
  userAvatarUrl = "/images/agent-1.jpg",
  mode = "landlord",
  active = "add-listing",
}: SidebarProps) {
  const [houseIconFailed, setHouseIconFailed] = useState(false);
  const [searchIconFailed, setSearchIconFailed] = useState(false);

  return (
    <aside className="flex w-[220px] shrink-0 flex-col bg-(--bg-inverse)">
      {/* Profile + mode switch */}
      <div className="flex flex-col items-center border-b border-white/[0.08]">
        <div className="flex w-full items-center gap-2.5 border-b border-white/[0.08] px-3 py-3.5">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-(--brand-primary-subtle)">
            <Image
              src={userAvatarUrl}
              alt={userName}
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold leading-[18px] text-(--text-inverse)">
              {userName}
            </span>
            <span className="text-[10px] leading-[15px] text-white/40">
              Landlord ✓
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-2 px-3 py-3">
          <span className="text-[9px] font-bold uppercase tracking-[0.9px] text-white/30">
            Active Mode
          </span>

          <div className="flex w-full gap-1.5">
            <button
              className={[
                "flex flex-1 flex-col items-center gap-0.5 rounded-[10px] border px-1.5 py-2.5",
                mode === "landlord" ?
                  "border-indigo-400/70 bg-indigo-500/20"
                : "border-white/10",
              ].join(" ")}>
              {houseIconFailed ?
                <Home
                  className={
                    mode === "landlord" ?
                      "h-4 w-4 text-indigo-300"
                    : "h-4 w-4 text-white/45"
                  }
                  strokeWidth={1.75}
                />
              : <img
                  src="https://i.postimg.cc/SsJZ7vzS/3d-house-1.png"
                  alt=""
                  referrerPolicy="no-referrer"
                  onError={() => setHouseIconFailed(true)}
                  className={
                    mode === "landlord" ? "h-6 w-6" : "h-6 w-6 opacity-45"
                  }
                />
              }
              <span
                className={[
                  "text-[10px] font-bold leading-3",
                  mode === "landlord" ? "text-indigo-200" : "text-white/45",
                ].join(" ")}>
                Landlord
              </span>
            </button>

            <button
              className={[
                "flex flex-1 flex-col items-center gap-0.5 rounded-[10px] border px-1.5 py-2.5",
                mode === "tenant" ?
                  "border-indigo-400/70 bg-indigo-500/20"
                : "border-white/10",
              ].join(" ")}>
              {searchIconFailed ?
                <Search
                  className={
                    mode === "tenant" ?
                      "h-4 w-4 text-indigo-300"
                    : "h-4 w-4 text-white/45"
                  }
                  strokeWidth={1.75}
                />
              : <img
                  src="https://i.postimg.cc/PxP6zR8t/search-1.png"
                  alt=""
                  referrerPolicy="no-referrer"
                  onError={() => setSearchIconFailed(true)}
                  className={
                    mode === "tenant" ? "h-6 w-6" : "h-6 w-6 opacity-45"
                  }
                />
              }
              <span
                className={[
                  "text-[10px] font-bold leading-3",
                  mode === "tenant" ? "text-indigo-200" : "text-white/45",
                ].join(" ")}>
                Tenant
              </span>
            </button>
          </div>

          <p className="w-full text-center text-[10px] leading-[14px] text-white/30">
            Managing your properties
          </p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === active;
          return (
            <Link
              key={item.key}
              href={item.href}
              className={[
                "flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-[13px] font-medium transition-colors",
                isActive ?
                  "border border-(--brand-primary)/30 bg-(--brand-primary)/20 text-(--text-inverse)"
                : "border border-transparent text-white/55 hover:bg-white/5",
              ].join(" ")}>
              <Icon className="h-4 w-4" strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer actions */}
      <div className="flex flex-col gap-1 border-t border-white/[0.08] p-3">
        <button className="flex items-center gap-2 rounded-[10px] px-3 py-2 text-xs text-white/40 transition-colors hover:bg-white/5 cursor-pointer">
          <Store className="h-3.5 w-3.5" strokeWidth={1.75} />
          Marketplace
        </button>
        <button className="flex items-center gap-2 rounded-[10px] px-3 py-2 text-xs text-white/40 transition-colors hover:bg-white/5 cursor-pointer">
          <LogOut className="h-3.5 w-3.5" strokeWidth={1.75} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
