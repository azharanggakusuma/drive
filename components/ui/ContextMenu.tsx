"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Eye, Download, Share2, Trash2, Folder, File } from "lucide-react";
import { type FileItem } from "@/lib/data";
import { useEffect, useRef } from "react";

interface ContextMenuProps {
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
  file: FileItem | null;
}

export const ContextMenu = ({ isOpen, onClose, position, file }: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Menutup menu jika diklik di luar area menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!file) return null;
  
  const handleActionClick = (action: string) => {
    alert(`${action} item: ${file.name}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          className="fixed z-50 w-56 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 p-2"
          style={{ top: position.y, left: position.x }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.1 }}
        >
          <div className="flex items-center gap-3 px-2 pb-2 mb-2 border-b border-gray-200 dark:border-gray-700">
            {file.type === 'folder' ? <Folder size={18} className="text-blue-500" /> : <File size={18} className="text-gray-400" />}
            <span className="font-semibold text-sm truncate">{file.name}</span>
          </div>
          <div className="flex flex-col">
            <button onClick={() => handleActionClick("Melihat")} className="flex items-center gap-3 w-full p-2 rounded-md text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Eye size={16} /> Lihat
            </button>
            <button onClick={() => handleActionClick("Mengunduh")} className="flex items-center gap-3 w-full p-2 rounded-md text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Download size={16} /> Download
            </button>
            <button onClick={() => handleActionClick("Membagikan")} className="flex items-center gap-3 w-full p-2 rounded-md text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Share2 size={16} /> Bagikan
            </button>
            <div className="my-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            <button onClick={() => handleActionClick("Menghapus")} className="flex items-center gap-3 w-full p-2 rounded-md text-sm text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/50 transition-colors">
              <Trash2 size={16} /> Hapus
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};