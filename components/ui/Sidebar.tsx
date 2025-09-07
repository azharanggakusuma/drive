"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import {
  Home,
  Folder,
  Users,
  Clock,
  Star,
  Trash2,
  Settings,
  HardDrive,
  Cloud,
  Plus,
} from "lucide-react";
import React from "react";

// Tipe props untuk NavItem
type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

// Komponen untuk judul kategori/sub-menu
const NavHeader = ({ title }: { title: string }) => (
  <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 mt-4 mb-1">
    {title}
  </h2>
);

// Komponen NavItem yang diperbarui
const NavItem = ({ href, icon, label }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  const activeClasses = "bg-blue-600/10 text-blue-600 dark:text-blue-300";
  const inactiveClasses = "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50";

  const handleClick = () => {
    if (pathname !== href) {
      NProgress.start();
    }
  };

  return (
    <Link
      href={href}
      className={`flex items-center gap-3.5 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm ${isActive ? activeClasses : inactiveClasses}`}
      onClick={handleClick}
    >
      {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
      <span>{label}</span>
    </Link>
  );
};

// Komponen StorageStatus yang lebih ringkas
const StorageStatus = () => (
  <div className="mt-auto p-2">
    <div className="flex items-center gap-3 mb-2 px-1">
      <HardDrive size={16} className="text-gray-500" />
      <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Penyimpanan</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "4%" }}></div>
    </div>
    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">75 GB dari 2 TB telah digunakan</p>
  </div>
);

// Komponen Sidebar utama yang telah didesain ulang
export const Sidebar = () => {
  const pathname = usePathname();
  const handleLogoClick = () => {
    if (pathname !== "/") {
      NProgress.start();
    }
  };

  return (
    <aside className="w-64 h-full bg-white dark:bg-gray-900 flex flex-col p-4 border-r border-gray-200 dark:border-gray-800">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 px-2 mb-6" onClick={handleLogoClick}>
        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
          <Cloud size={22} className="text-white" />
        </div>
        <span className="text-xl font-bold text-gray-800 dark:text-white">CloudDrive</span>
      </Link>
      
      {/* Tombol Aksi Utama */}
      <div className="px-2 mb-4">
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
          <Plus size={20} />
          <span className="text-sm font-semibold">Tambah Baru</span>
        </button>
      </div>

      {/* Navigasi dengan Kategori */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex flex-col gap-1">
          <NavHeader title="Menu" />
          <NavItem href="/" icon={<Home />} label="Beranda" />
          <NavItem href="/files" icon={<Folder />} label="File Saya" />
          <NavItem href="/settings" icon={<Settings />} label="Pengaturan" />
          
          <NavHeader title="Pustaka" />
          <NavItem href="/recent" icon={<Clock />} label="Terbaru" />
          <NavItem href="/shared" icon={<Users />} label="Dibagikan" />
          <NavItem href="/starred" icon={<Star />} label="Berbintang" />
          <NavItem href="/trash" icon={<Trash2 />} label="Sampah" />
        </nav>
        
        {/* Status Penyimpanan */}
        <div className="mt-auto">
          <StorageStatus />
        </div>
      </div>
    </aside>
  );
};