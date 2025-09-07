import { Settings } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <Settings size={80} className="text-gray-300 dark:text-gray-600 mb-4" />
            <h1 className="text-3xl font-bold mb-2">Pengaturan</h1>
            <p className="text-gray-500">Kelola pengaturan akun dan aplikasi Anda di sini.</p>
        </div>
    );
}