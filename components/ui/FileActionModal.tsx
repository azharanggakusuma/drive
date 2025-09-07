"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Eye, Download } from "lucide-react";
import { type FileItem } from "@/lib/data";
import { FileTypeIcon } from "./FileAccess"; // Pastikan FileTypeIcon diekspor dari FileAccess.tsx

interface FileActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: FileItem | null;
}

export const FileActionModal = ({ isOpen, onClose, file }: FileActionModalProps) => {
  if (!file) return null;

  const handleActionClick = (action: string) => {
    // Untuk saat ini, kita hanya menampilkan alert
    alert(`${action} file: ${file.name}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Konten Modal */}
          <motion.div
            className="relative z-10 w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-6">
              <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                <div className="flex-shrink-0">
                  <FileTypeIcon name={file.name} type={file.type} />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg truncate text-gray-800 dark:text-gray-200">{file.name}</h3>
                  <p className="text-sm text-gray-500">{file.size} - {file.modified}</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleActionClick("Melihat")}
                  className="flex items-center gap-3 w-full p-3 rounded-lg text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Eye size={20} />
                  <span>Lihat Pratinjau</span>
                </button>
                <button
                  onClick={() => handleActionClick("Mengunduh")}
                  className="flex items-center gap-3 w-full p-3 rounded-lg text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Download size={20} />
                  <span>Download</span>
                </button>
              </div>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};