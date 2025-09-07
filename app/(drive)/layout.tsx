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
      <div className="flex h-screen w-full bg-gray-50 dark:bg-black overflow-hidden">
        {/* Sidebar untuk desktop */}
        <div className="hidden lg:block flex-shrink-0">
          <Sidebar />
        </div>

        {/* Overlay dan Sidebar untuk mobile */}
        {isSidebarOpen && <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={toggleSidebar}></div>}
        <div className={`fixed top-0 left-0 h-full z-30 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}>
          <Sidebar />
        </div>

        {/* Konten Utama */}
        <div className="flex flex-col flex-1 w-full">
          {/* Header diposisikan di paling atas */}
          <Header onMenuClick={toggleSidebar} />

          {/* Area konten yang bisa di-scroll */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ViewProvider>
  );
}