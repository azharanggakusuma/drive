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
} from "lucide-react";
import React from "react";

// Tipe props untuk NavItem
type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

// Komponen NavItem yang diperbarui
const NavItem = ({ href, icon, label }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  // Kelas untuk styling
  const activeClasses = "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400";
  const inactiveClasses = "text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200";

  const handleClick = () => {
    if (pathname !== href) {
      NProgress.start();
    }
  };

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 ease-in-out font-medium text-sm ${isActive ? activeClasses : inactiveClasses}`}
      onClick={handleClick}
    >
      {/* Memberi styling pada ikon saat aktif */}
      {React.cloneElement(icon as React.ReactElement, { className: `w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}` })}
      <span className="truncate">{label}</span>
    </Link>
  );
};

// Komponen StorageStatus yang didesain ulang
const StorageStatus = () => (
  <div className="mt-auto px-2 pt-4">
    <div className="px-3 py-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
      <div className="flex items-center gap-3 mb-2">
        <HardDrive size={18} className="text-gray-600 dark:text-gray-400" />
        <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">Penyimpanan</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-2">
        {/* Contoh penggunaan storage 45% */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 rounded-full" style={{ width: "45%" }}></div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">900 GB dari 2 TB digunakan</p>
      <button className="w-full mt-3 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 font-semibold text-xs py-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors">
        Upgrade Storage
      </button>
    </div>
  </div>
);

// Komponen Sidebar utama
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
      <Link href="/" className="flex items-center gap-2.5 px-3 mb-8" onClick={handleLogoClick}>
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Cloud size={20} className="text-white" />
        </div>
        <span className="text-xl font-bold text-gray-800 dark:text-white">CloudDrive</span>
      </Link>
      
      {/* Grup Navigasi Atas (Utama) */}
      <div className="flex flex-col justify-between flex-1">
        <nav className="flex flex-col gap-1.5">
          <NavItem href="/" icon={<Home />} label="Beranda" />
          <NavItem href="/files" icon={<Folder />} label="File Saya" />
          <NavItem href="/shared" icon={<Users />} label="Dibagikan" />
          <NavItem href="/recent" icon={<Clock />} label="Terbaru" />
          <NavItem href="/starred" icon={<Star />} label="Berbintang" />
          <NavItem href="/trash" icon={<Trash2 />} label="Sampah" />
          <NavItem href="/settings" icon={<Settings />} label="Pengaturan" />
        </nav>

        {/* Status Penyimpanan */}
        <StorageStatus />
      </div>
    </aside>
  );
};