"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/ui/Sidebar";
import { Header } from "@/components/ui/Header";
import { ViewProvider } from "@/context/ViewContext";

export default function DriveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <ViewProvider>
      <div className="flex h-screen w-full bg-slate-50 dark:bg-black overflow-hidden">
        <div className="hidden lg:block flex-shrink-0">
          <Sidebar />
        </div>

        {isSidebarOpen && <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={toggleSidebar}></div>}
        <div className={`fixed top-0 left-0 h-full z-30 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}>
          <Sidebar />
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col overflow-y-auto">
          {/* Header kini mengambil viewMode dari Context, tidak perlu props lagi */}
          <Header onMenuClick={toggleSidebar} />
          <div className="mt-8"> {/* Memberi jarak dari Header ke konten halaman */}
            {children}
          </div>
        </main>
      </div>
    </ViewProvider>
  );
}