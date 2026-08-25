"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar, { defaultNavItems } from "@/shared/Sidebar/Sidebar";
import DashboardNav from "@/shared/DashboardNav/DashboardNav";
import { getCurrentUser } from "@/actions/user";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const router = useRouter();

  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [userAvatarUrl, setUserAvatarUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    getCurrentUser()
      .then((res) => {
        if (cancelled) return;
        setUserName(`${res.data.firstName} ${res.data.lastName}`.trim());
        if (res.data.avatarUrl) setUserAvatarUrl(res.data.avatarUrl);
      })
      .catch(() => {
        // Silently fall back to the Sidebar's default name/avatar.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const matchedItem = defaultNavItems.find((item) => pathname.startsWith(item.href));
  const active = matchedItem?.key ?? (pathname.startsWith("/dashboard/marketplace") ? "marketplace" : "add-listing");

  return (
    <div className="flex min-h-screen w-full flex-col bg-(--bg-base)">
      <DashboardNav />
      <div className="flex flex-1 items-stretch">
        <Sidebar
          active={active}
          mode="landlord"
          userName={userName}
          userAvatarUrl={userAvatarUrl}
          onModeChange={(mode) => {
            if (mode === "tenant") router.push("/tenant/saved");
          }}
        />
        <main className="flex-1 p-7">{children}</main>
      </div>
    </div>
  );
}