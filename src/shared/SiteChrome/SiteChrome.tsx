"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/shared/Navbar/navbar";
import Footer from "@/shared/Footer/Footer";

// Routes under /dashboard render their own DashboardNav + Sidebar
// (see src/shared/DashboardNav and src/shared/Sidebar), so we skip
// the marketing Navbar/Footer there instead of showing both.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}