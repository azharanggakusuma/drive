"use client";

import React, { useState, useEffect } from "react";
import { filesData, type FileItem } from "@/lib/data";
import { FileDisplay } from "@/components/ui/FileAccess";
import { EmptyState } from "@/components/ui/EmptyState";
import { useView } from "@/context/ViewContext";
import { FileActionModal } from "@/components/ui/FileActionModal";
import { ContextMenu } from "@/components/ui/ContextMenu";

export default function BerandaPage() {
  const { viewMode } = useView();
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

  const folders = filesData.filter(item => item.type === 'folder');
  const files = filesData.filter(item => item.type === 'file');
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
      <h1 className="text-3xl font-bold">Beranda</h1>
      
      {!hasContent && !isLoading ? (
        <div className="mt-8"><EmptyState /></div>
      ) : (
        <>
          <FileDisplay 
            title="Folder"
            items={folders}
            viewMode={viewMode}
            isLoading={isLoading}
            onFileClick={handleFileClick}
            onFileContextMenu={handleFileContextMenu}
          />
          <FileDisplay
            title="File"
            items={files}
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