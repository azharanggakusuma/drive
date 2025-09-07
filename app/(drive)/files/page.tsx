import { Folder } from "lucide-react";

export default function FilesPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <Folder size={80} className="text-gray-300 dark:text-gray-600 mb-4" />
            <h1 className="text-3xl font-bold mb-2">File Saya</h1>
            <p className="text-gray-500">Semua file dan folder Anda akan muncul di sini.</p>
        </div>
    );
}