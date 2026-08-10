"use client";

import { usePathname } from "next/navigation";
import Sidebar, { defaultNavItems } from "@/shared/Sidebar/Sidebar";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";


  const matchedItem = defaultNavItems.find((item) => pathname.startsWith(item.href));
  const active = matchedItem?.key ?? (pathname.startsWith("/dashboard/marketplace") ? "marketplace" : "add-listing");

  return (
    <div className="flex min-h-screen w-full flex-col bg-(--bg-base)">
      <div className="flex flex-1 items-stretch">
        <Sidebar active={active} mode="landlord" />
        <main className="flex-1 p-7">{children}</main>
      </div>
    </div>
  );
}