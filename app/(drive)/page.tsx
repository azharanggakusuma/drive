"use client";

import React, { useState, useEffect } from "react";
import {
  File,
  Folder,
  HardDrive,
  Share2,
  ArrowRight,
  FileText,
  FileSpreadsheet,
  Presentation,
} from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  gradient: string;
}

interface FrequentFile {
  id: number;
  icon: React.ReactNode;
  name: string;
  size: string;
  lastAccessed: string;
}

const dummyFrequentFiles: FrequentFile[] = [
  {
    id: 1,
    icon: <Presentation size={20} className="text-orange-500" />,
    name: "Presentasi Kinerja Kuartal 3.pptx",
    size: "3.4 MB",
    lastAccessed: "Baru saja, 10:30",
  },
  {
    id: 2,
    icon: <FileText size={20} className="text-red-500" />,
    name: "Laporan Penjualan Bulanan.pdf",
    size: "1.2 MB",
    lastAccessed: "Kemarin sore, 15:45",
  },
  {
    id: 3,
    icon: <FileSpreadsheet size={20} className="text-green-600" />,
    name: "Analisis Keuangan Tahunan.xlsx",
    size: "876 KB",
    lastAccessed: "Jumat, 14:20",
  },
];

const SkeletonCard = () => (
  <div className="bg-white p-6 rounded-2xl shadow-md animate-pulse">
    <div className="h-8 w-8 bg-slate-200 rounded-lg"></div>
    <div className="mt-5 h-7 w-2/5 bg-slate-200 rounded-md"></div>
    <div className="mt-2 h-4 w-3/5 bg-slate-200 rounded-md"></div>
  </div>
);

const SkeletonStorage = () => (
   <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg animate-pulse">
     <div className="h-7 w-1/2 bg-slate-200 rounded-md mb-8"></div>
     <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-36 h-36 rounded-full bg-slate-200 flex-shrink-0"></div>
        <div className="flex-1 w-full">
          <div className="h-6 w-full bg-slate-200 rounded-md"></div>
          <div className="h-4 w-3/4 bg-slate-200 rounded-md mt-3"></div>
        </div>
     </div>
   </div>
);

const SkeletonFiles = () => (
    <div className="bg-white p-8 rounded-2xl shadow-lg animate-pulse">
        <div className="h-7 w-1/2 bg-slate-200 rounded-md mb-8"></div>
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center p-2">
                    <div className="h-12 w-12 bg-slate-200 rounded-lg"></div>
                    <div className="flex-1 ml-4">
                        <div className="h-4 w-3/4 bg-slate-200 rounded-md"></div>
                        <div className="h-3 w-1/2 bg-slate-200 rounded-md mt-2"></div>
                    </div>
                    <div className="h-4 w-1/6 bg-slate-200 rounded-md"></div>
                </div>
            ))}
        </div>
    </div>
);


const StatCard: React.FC<StatCardProps> = ({ icon, label, value, gradient }) => (
  <div className="relative bg-white border border-gray-100 p-6 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group cursor-pointer">
    <div
      className={`absolute top-0 right-0 h-28 w-28 ${gradient} rounded-full -mr-12 -mt-12 opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300`}
    />
    <div className="relative z-10">
      <div className="p-3 bg-slate-100 rounded-lg inline-block text-slate-700">{icon}</div>
      <div className="mt-4">
        <p className="text-2xl sm:text-3xl font-bold text-slate-800">{value}</p>
        <p className="text-sm text-slate-600 font-medium mt-1">{label}</p>
      </div>
    </div>
  </div>
);

const StorageVisualizer = ({ percentage }: { percentage: number }) => (
  <div className="lg:col-span-2 bg-white border border-gray-100 p-6 md:p-8 rounded-2xl shadow-xl">
    <h2 className="text-lg md:text-xl font-semibold mb-6 text-slate-800">Visualisasi Penyimpanan</h2>
    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            className="stroke-slate-200"
            fill="none"
            strokeWidth="3"
          />
          <path
            className="stroke-blue-600"
            style={{ strokeDasharray: `${percentage}, 100`, transition: 'stroke-dasharray 1.5s ease-in-out' }}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            strokeWidth="3.5"
            strokeLinecap="round"
            transform="rotate(90 18 18)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xl sm:text-2xl font-bold text-slate-800">{percentage}%</p>
          <p className="text-xs text-slate-500">terpakai</p>
        </div>
      </div>
      <div className="flex-1 text-center md:text-left">
        <p className="text-base text-slate-600">
          Anda telah menggunakan <span className="font-bold text-slate-900">512 GB</span> dari total{" "}
          <span className="font-bold text-slate-900">2 TB</span>.
        </p>
      </div>
    </div>
  </div>
);

const FrequentlyAccessedFiles = ({ files }: { files: FrequentFile[] }) => (
  <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-2xl shadow-xl">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg md:text-xl font-semibold text-slate-800">Akses Cepat Berkas</h2>
      <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center group flex-shrink-0">
        Tampilkan Semua <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
    <ul className="space-y-4">
      {files.map((file, index) => (
        <li key={file.id} className="flex items-center p-2 rounded-lg hover:bg-slate-50 transition-colors duration-200 opacity-0 cursor-pointer" style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards` }}>
          <div className="mr-4 flex-shrink-0 bg-slate-100 p-2.5 rounded-lg">{file.icon}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-800 font-semibold truncate">{file.name}</p>
            <p className="text-xs text-slate-500 mt-1">{`Terakhir diakses: ${file.lastAccessed}`}</p>
          </div>
           <p className="text-sm text-slate-600 font-medium ml-4 flex-shrink-0">{file.size}</p>
        </li>
      ))}
    </ul>
  </div>
);


export default function BerandaPage() {
  const [isLoading, setIsLoading] = useState(true);
  const storagePercentage = 25;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 md:p-8">
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Dasbor Utama
          </h1>
          <p className="text-base text-slate-600 mt-2">
            Senang melihat Anda kembali, Azharangga Kusuma!
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <StatCard icon={<File size={24} />} label="Total Berkas" value="1,234" gradient="bg-gradient-to-br from-blue-400 to-cyan-300" />
              <StatCard icon={<Folder size={24} />} label="Jumlah Direktori" value="56" gradient="bg-gradient-to-br from-green-400 to-emerald-300" />
              <StatCard icon={<Share2 size={24} />} label="Berkas Terbagi" value="78" gradient="bg-gradient-to-br from-purple-400 to-indigo-300" />
              <StatCard icon={<HardDrive size={24} />} label="Kapasitas Tersisa" value="1.488 TB" gradient="bg-gradient-to-br from-yellow-400 to-orange-300" />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {isLoading ? <SkeletonStorage /> : <StorageVisualizer percentage={storagePercentage} />}
          {isLoading ? <SkeletonFiles /> : <FrequentlyAccessedFiles files={dummyFrequentFiles} />}
        </div>
      </div>
    </div>
  );
}