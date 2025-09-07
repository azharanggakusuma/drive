import { File, Folder, FileText, FileSpreadsheet, ImageIcon, FileArchive, FileCode } from "lucide-react";

export const filesData = [
  // Folders
  { name: "Aset Desain", type: "folder" as const, size: "128 MB", modified: "Hari ini, 10:45" },
  { name: "Foto Event 2025", type: "folder" as const, size: "3.2 GB", modified: "Kemarin, 20:30" },
  { name: "Dokumen Klien", type: "folder" as const, size: "750 MB", modified: "5 Sep 2025" },
  { name: "Proyek Koding", type: "folder" as const, size: "512 MB", modified: "1 Sep 2025" },

  // Files
  { name: "Proposal Proyek Q4.pdf", type: "file" as const, size: "2.1 MB", modified: "Hari ini, 09:15" },
  { name: "Laporan Bulanan.xlsx", type: "file" as const, size: "850 KB", modified: "Kemarin, 14:00" },
  { name: "Presentasi Kick-off.pptx", type: "file" as const, size: "5.5 MB", modified: "5 Sep 2025" },
  { name: "Logo Perusahaan Final.png", type: "file" as const, size: "150 KB", modified: "4 Sep 2025" },
  { name: "Panduan Brand.docx", type: "file" as const, size: "3.8 MB", modified: "4 Sep 2025" },
  { name: "Skrip Aplikasi.js", type: "file" as const, size: "12 KB", modified: "3 Sep 2025" },
  { name: "Foto Tim.jpg", type: "file" as const, size: "4.2 MB", modified: "2 Sep 2025" },
  { name: "Arsip Proyek Lama.zip", type: "file" as const, size: "256 MB", modified: "1 Sep 2025" },
  { name: "Invoice #123.pdf", type: "file" as const, size: "98 KB", modified: "31 Agu 2025" },
  { name: "Catatan Rapat.docx", type: "file" as const, size: "25 KB", modified: "30 Agu 2025" },
  { name: "Data Penjualan Q3.xlsx", type: "file" as const, size: "1.2 MB", modified: "28 Agu 2025" },
  { name: "Mockup UI.fig", type: "file" as const, size: "12.3 MB", modified: "27 Agu 2025" },
];

export type FileItem = typeof filesData[0];