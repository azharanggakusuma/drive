"use client";

import { useView } from "@/context/ViewContext";
import { Menu, Search, Grid3x3, List, Bell, Plus, Settings } from "lucide-react";

export const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { viewMode, setViewMode } = useView();

  return (
    <header className="flex items-center justify-between w-full gap-4 p-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      {/* KIRI: Tombol Menu & Bilah Pencarian */}
      <div className="flex items-center gap-2 flex-1 max-w-sm">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-md transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="w-full relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Cari di Drive..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-700"
          />
        </div>
      </div>

      {/* KANAN: Kontrol & Profil */}
      <div className="flex items-center gap-2">
        <button className="hidden sm:flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={18} />
          <span className="text-sm font-semibold hidden lg:block">Baru</span>
        </button>
        
        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

        <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-md ${
              viewMode === "list"
                ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-500 dark:text-gray-400"
            } transition-all`}
            title="Tampilan Daftar"
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-md ${
              viewMode === "grid"
                ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-500 dark:text-gray-400"
            } transition-all`}
            title="Tampilan Kotak"
          >
            <Grid3x3 size={18} />
          </button>
        </div>
        
        <button
          className="p-2.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-full transition-colors"
          title="Notifikasi"
        >
          <Bell size={20} />
        </button>
        
        <button
          className="p-2.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-full transition-colors"
          title="Pengaturan"
        >
          <Settings size={20} />
        </button>

        {/* Profil Pengguna */}
        <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer ml-2">
            A
        </div>
      </div>
    </header>
  );
};