"use client";

import { useState, ElementType } from "react";
import { Menu, Search, Bell, Plus, Settings, LucideProps } from "lucide-react";

// 1. Komponen IconButton yang Dapat Digunakan Kembali
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ElementType<LucideProps>;
  label: string;
}

const IconButton = ({ icon: Icon, label, ...props }: IconButtonProps) => (
  <button
    {...props}
    className="p-2.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-full transition-colors"
    aria-label={label}
  >
    <Icon size={20} />
  </button>
);

// 2. Komponen UserProfile
interface UserProfileProps {
  initial: string;
}

const UserProfile = ({ initial }: UserProfileProps) => (
  <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer ml-2">
    {initial}
  </div>
);

// 3. Komponen untuk Bagian Kiri Header
const HeaderLeft = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex items-center gap-2 flex-1 max-w-sm">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-md transition-colors"
        aria-label="Toggle menu"
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari di Drive..."
          className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-700"
        />
      </div>
    </div>
  );
};

// 4. Komponen untuk Bagian Kanan Header
const HeaderRight = () => (
  <div className="flex items-center gap-2">
    <button className="hidden sm:flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
      <Plus size={18} />
      <span className="text-sm font-semibold hidden lg:block">Baru</span>
    </button>
    <IconButton icon={Bell} label="Notifikasi" />
    <IconButton icon={Settings} label="Pengaturan" />
    <UserProfile initial="A" />
  </div>
);

// 5. Komponen Header Utama (Ekspor Default)
export const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    <header className="flex items-center justify-between w-full gap-4 p-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <HeaderLeft onMenuClick={onMenuClick} />
      <HeaderRight />
    </header>
  );
};