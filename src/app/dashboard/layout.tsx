import DashboardNav from "@/shared/DashboardNav/DashboardNav";
import Sidebar from "@/shared/Sidebar/Sidebar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-(--bg-base)">
      <DashboardNav />

      <div className="flex flex-1 items-stretch">
        <Sidebar active="add-listing" mode="landlord" />
        <main className="flex-1 p-7">{children}</main>
      </div>
    </div>
  );
}
