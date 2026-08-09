"use client";
// import DashboardNav from "@/shared/DashboardNav/DashboardNav";
import Sidebar, { SidebarNavItem } from "@/shared/Sidebar/Sidebar";
import { Heart, FileText, History } from "lucide-react";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
    const tenantNavItems: SidebarNavItem[] = [
  { key: "saved", label: "Saved Listings", href: "/tenant/saved", icon: Heart },
  { key: "requests", label: "My Requests", href: "/tenant/myRequests", icon: FileText },
  { key: "history", label: "Lease History", href: "/tenant/history", icon: History },
];
  return (
    <div className="flex min-h-screen w-full flex-col bg-(--bg-base)">
      {/* <DashboardNav /> */}

      <div className="flex flex-1 items-stretch">
        <Sidebar
  mode="tenant"
  active="saved"
  navItems={tenantNavItems}
/>
        <main className="flex-1 p-7">{children}</main>
      </div>
    </div>
  );
}
