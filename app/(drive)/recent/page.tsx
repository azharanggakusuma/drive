import { Clock } from "lucide-react";

export default function RecentPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <Clock size={80} className="text-gray-300 dark:text-gray-600 mb-4" />
            <h1 className="text-3xl font-bold mb-2">Terbaru</h1>
            <p className="text-gray-500">File yang baru saja Anda buka akan muncul di sini.</p>
        </div>
    );
}