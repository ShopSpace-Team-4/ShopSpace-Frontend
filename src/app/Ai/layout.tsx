// import TopNav from "@/shared/TopNav/TopNav";
import React from "react";
import TopNav from "../../shared/TopNav/TopNav"; // تأكد من صحة مسار استدعاء المكون

export default function NewSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <TopNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}
