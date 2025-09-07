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
  MoreHorizontal,
} from "lucide-react";

// --- INTERFACES ---
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

// --- DUMMY DATA ---
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

// --- SKELETON COMPONENTS ---
const SkeletonCard = () => (
  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg animate-pulse border border-slate-200">
    <div className="h-8 w-8 bg-slate-200 rounded-lg"></div>
    <div className="mt-5 h-7 w-2/5 bg-slate-200 rounded-md"></div>
    <div className="mt-2 h-4 w-3/5 bg-slate-200 rounded-md"></div>
  </div>
);

const SkeletonStorage = () => (
   <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl animate-pulse border border-slate-200 h-full">
     <div className="h-7 w-1/2 bg-slate-200 rounded-md mb-8"></div>
     <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-24 h-24 rounded-full bg-slate-200 flex-shrink-0"></div>
        <div className="flex-1 w-full">
          <div className="h-6 w-full bg-slate-200 rounded-md"></div>
          <div className="h-4 w-3/4 bg-slate-200 rounded-md mt-3"></div>
        </div>
     </div>
   </div>
);

const SkeletonFiles = () => (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl animate-pulse border border-slate-200 h-full">
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

// --- UI COMPONENTS ---
const StatCard: React.FC<StatCardProps> = ({ icon, label, value, gradient }) => (
  <div className="relative bg-white/60 backdrop-blur-sm border border-slate-200/80 p-6 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group cursor-pointer">
    <div
      className={`absolute top-0 right-0 h-32 w-32 ${gradient} rounded-full -mr-16 -mt-16 opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500`}
    />
    <div className="relative z-10">
      <div className="p-3 bg-slate-100 rounded-lg inline-block text-slate-700 border border-slate-200">{icon}</div>
      <div className="mt-4">
        <p className="text-2xl sm:text-3xl font-bold text-slate-800">{value}</p>
        <p className="text-sm text-slate-600 font-medium mt-1">{label}</p>
      </div>
    </div>
  </div>
);

const StorageVisualizer = ({ percentage }: { percentage: number }) => (
  <div className="h-full bg-white/60 backdrop-blur-sm border border-slate-200/80 p-6 md:p-8 rounded-2xl shadow-xl flex flex-col">
    <h2 className="text-lg md:text-xl font-semibold mb-6 text-slate-800">Visualisasi Penyimpanan</h2>
    <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <defs>
            <linearGradient id="storageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3b82f6' }} />
              <stop offset="100%" style={{ stopColor: '#2563eb' }} />
            </linearGradient>
          </defs>
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            className="stroke-slate-200"
            fill="none"
            strokeWidth="3"
          />
          <path
            stroke="url(#storageGradient)"
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
          <p className="text-xs text-slate-500 uppercase tracking-wider">Terpakai</p>
        </div>
      </div>
      <div className="flex-1 text-center md:text-left">
        <p className="text-base text-slate-600">
          Anda telah menggunakan <span className="font-bold text-slate-900">900 GB</span> dari total{" "}
          <span className="font-bold text-slate-900">2 TB</span>.
        </p>
        <button className="mt-4 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all">
          Kelola Penyimpanan
        </button>
      </div>
    </div>
  </div>
);

const FrequentlyAccessedFiles = ({ files }: { files: FrequentFile[] }) => (
  <div className="h-full bg-white/60 backdrop-blur-sm border border-slate-200/80 p-6 md:p-8 rounded-2xl shadow-xl flex flex-col">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg md:text-xl font-semibold text-slate-800">Akses Cepat Berkas</h2>
      <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center group flex-shrink-0">
        Tampilkan Semua <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
    <ul className="space-y-2 flex-1">
      {files.map((file, index) => (
        <li key={file.id} className="flex items-center p-2.5 rounded-lg hover:bg-slate-100 transition-colors duration-200 opacity-0 group" style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards` }}>
          <div className="mr-4 flex-shrink-0 bg-slate-100 p-2.5 rounded-lg border border-slate-200">{file.icon}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-800 font-semibold truncate">{file.name}</p>
            <p className="text-xs text-slate-500 mt-1">{`Terakhir diakses: ${file.lastAccessed}`}</p>
          </div>
          <div className="flex items-center">
            <p className="text-sm text-slate-600 font-medium ml-4 flex-shrink-0 hidden sm:block">{file.size}</p>
            <button className="ml-4 p-2 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

// --- MAIN PAGE COMPONENT ---
export default function BerandaPage() {
  const [isLoading, setIsLoading] = useState(true);
  const storagePercentage = 45;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 md:p-8">
      <div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-white to-green-50 -z-10"
        style={{
          backgroundSize: '200% 200%',
          animation: 'gradientAnimation 15s ease infinite',
        }}
      />
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
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
            <><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /></>
          ) : (
            <>
              <StatCard icon={<File size={24} />} label="Total Berkas" value="1,234" gradient="bg-gradient-to-br from-blue-400 to-cyan-300" />
              <StatCard icon={<Folder size={24} />} label="Jumlah Direktori" value="56" gradient="bg-gradient-to-br from-green-400 to-emerald-300" />
              <StatCard icon={<Share2 size={24} />} label="Berkas Terbagi" value="78" gradient="bg-gradient-to-br from-purple-400 to-indigo-300" />
              <StatCard icon={<HardDrive size={24} />} label="Kapasitas Tersisa" value="1.1 TB" gradient="bg-gradient-to-br from-yellow-400 to-orange-300" />
            </>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            {isLoading ? <SkeletonStorage /> : <StorageVisualizer percentage={storagePercentage} />}
          </div>
          <div className="lg:col-span-2">
            {isLoading ? <SkeletonFiles /> : <FrequentlyAccessedFiles files={dummyFrequentFiles} />}
          </div>
        </div>
      </div>
    </div>
  );
}