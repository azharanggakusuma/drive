"use client";

import React, { useState, useEffect } from "react";
import { filesData, type FileItem } from "@/lib/data";
import { FileDisplay } from "@/components/ui/FileAccess";
import { EmptyState } from "@/components/ui/EmptyState";
import { useView } from "@/context/ViewContext";
import { FileActionModal } from "@/components/ui/FileActionModal";
import { ContextMenu } from "@/components/ui/ContextMenu";
import { ChevronDown, LayoutGrid, List, Upload, FolderPlus } from "lucide-react"; 

// Komponen untuk view controls
const ViewControls = () => {
    const { viewMode, setViewMode } = useView();
    return (
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md ${viewMode === "list" ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm" : "text-gray-500 dark:text-gray-400"} transition-all`}
                title="Tampilan Daftar"
            >
                <List size={18} />
            </button>
            <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md ${viewMode === "grid" ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm" : "text-gray-500 dark:text-gray-400"} transition-all`}
                title="Tampilan Kotak"
            >
                <LayoutGrid size={18} />
            </button>
        </div>
    );
};

export default function FilesPage() {
  const { viewMode, setViewMode } = useView();
  const [isLoading, setIsLoading] = useState(true);

  // State untuk modal
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State untuk context menu
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    position: { x: number, y: number };
    file: FileItem | null;
  }>({ isOpen: false, position: { x: 0, y: 0 }, file: null });

  const hasContent = filesData.length > 0;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handler untuk klik kiri
  const handleFileClick = (file: FileItem) => {
    if (file.type === 'file') {
      setSelectedFile(file);
      setIsModalOpen(true);
    } else {
      alert(`Membuka folder: ${file.name}`);
    }
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedFile(null), 300);
  };
  
  // Handler untuk klik kanan
  const handleFileContextMenu = (event: React.MouseEvent, file: FileItem) => {
    event.preventDefault();
    setContextMenu({
      isOpen: true,
      position: { x: event.pageX, y: event.pageY },
      file: file,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(prev => ({ ...prev, isOpen: false }));
  };


  return (
    <div onClick={handleCloseContextMenu}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <button className="flex items-center text-3xl font-bold">
            File Saya
          </button>
        </div>
        {/* Kontainer tombol dengan jarak yang disesuaikan */}
        <div className="flex items-center space-x-3">
          <ViewControls />
          
          {/* Separator Tipis */}
          <div className="h-6 w-px bg-gray-300"></div>

          <div className="flex items-center space-x-2">
            <button 
              className="p-2 rounded-full hover:bg-gray-200" 
              title="New Folder"
            >
              <FolderPlus className="w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded-full hover:bg-gray-200" 
              title="Upload"
            >
              <Upload className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb (Contoh Statis) */}
      <div className="mb-6 text-sm text-gray-500">
        <p className="text-sm">Kelola semua file dan folder Anda di satu tempat.</p>
      </div>
      
      {!hasContent && !isLoading ? (
        <div className="mt-8"><EmptyState /></div>
      ) : (
        <>
          <FileDisplay 
            title="Files"
            items={filesData}
            viewMode={viewMode}
            isLoading={isLoading}
            onFileClick={handleFileClick}
            onFileContextMenu={handleFileContextMenu}
          />
        </>
      )}

      <FileActionModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        file={selectedFile}
      />
      <ContextMenu 
        isOpen={contextMenu.isOpen}
        onClose={handleCloseContextMenu}
        position={contextMenu.position}
        file={contextMenu.file}
      />
    </div>
  );
}