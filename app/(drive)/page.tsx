"use client";

import React from "react";
import {
  File,
  Folder,
  HardDrive,
  Share2,
  Download,
  Plus,
} from "lucide-react";

// Data Dummy untuk Aktivitas Terkini
const recentActivities = [
  {
    icon: <Download size={16} className="text-green-500" />,
    text: "Dokumen_Laporan.pdf berhasil diunduh.",
    time: "Baru saja",
  },
  {
    icon: <Share2 size={16} className="text-purple-500" />,
    text: "Anda membagikan folder 'Project Alpha' ke tim.",
    time: "2 menit yang lalu",
  },
  {
    icon: <Plus size={16} className="text-blue-500" />,
    text: "5 file baru ditambahkan ke 'Materi Desain'.",
    time: "1 jam yang lalu",
  },
];

// Komponen Kartu Statistik
const StatCard = ({ icon, label, value, gradient }) => (
  <div className="relative bg-white border border-gray-200 p-6 rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:bg-gray-100 hover:-translate-y-1">
    <div
      className={`absolute top-0 right-0 h-20 w-20 ${gradient} rounded-full -mr-8 -mt-8 opacity-10`}
    />
    <div className="flex justify-between items-start">
      <div className="text-black">{icon}</div>
    </div>
    <div className="mt-4">
      <p className="text-3xl lg:text-4xl font-bold text-black">{value}</p>
      <p className="text-sm text-gray-700 font-medium mt-1">{label}</p>
    </div>
  </div>
);

export default function BerandaPage() {
  const storagePercentage = 65;

  return (
    <div className="min-h-screen text-black p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Dasbor
          </h1>
          <p className="text-gray-700 mt-2">
            Ringkasan aktivitas dan statistik akun Anda.
          </p>
        </header>

        {/* Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<File size={22} />}
            label="Total File"
            value="1,234"
            gradient="bg-gradient-to-br from-blue-500 to-cyan-400"
          />
          <StatCard
            icon={<Folder size={22} />}
            label="Total Folder"
            value="56"
            gradient="bg-gradient-to-br from-green-500 to-emerald-400"
          />
          <StatCard
            icon={<Share2 size={22} />}
            label="File Dibagikan"
            value="78"
            gradient="bg-gradient-to-br from-purple-500 to-indigo-400"
          />
          <StatCard
            icon={<HardDrive size={22} />}
            label="Penyimpanan Terpakai"
            value="12.3 GB"
            gradient="bg-gradient-to-br from-yellow-500 to-orange-400"
          />
        </div>

        {/* Penyimpanan & Aktivitas */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Visualisasi Penyimpanan */}
          <div className="lg:col-span-2 bg-white border border-gray-200 p-8 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-6">
              Penggunaan Penyimpanan
            </h2>
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    className="stroke-gray-300"
                    fill="none"
                    strokeWidth="3"
                  />
                  <path
                    className="stroke-blue-500"
                    strokeDasharray={`${storagePercentage}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeWidth="3"
                    strokeLinecap="round"
                    transform="rotate(90 18 18)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-3xl font-bold text-black">
                    {storagePercentage}%
                  </p>
                  <p className="text-xs text-gray-500">terpakai</p>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 text-lg">
                  Anda telah menggunakan{" "}
                  <span className="font-bold text-black">12.3 GB</span> dari{" "}
                  <span className="font-bold text-black">20 GB</span>.
                </p>
                <button className="mt-4 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg transition-colors">
                  Upgrade Penyimpanan
                </button>
              </div>
            </div>
          </div>

          {/* Aktivitas Terkini */}
          <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-6">Aktivitas Terkini</h2>
            <ul className="space-y-5">
              {recentActivities.map((activity, index) => (
                <li key={index} className="flex items-start">
                  <div className="mt-1 mr-4">{activity.icon}</div>
                  <div>
                    <p className="text-sm text-gray-800">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {activity.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
