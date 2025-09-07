import { Trash2 } from "lucide-react";

export default function TrashPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <Trash2 size={80} className="text-gray-300 dark:text-gray-600 mb-4" />
            <h1 className="text-3xl font-bold mb-2">Sampah</h1>
            <p className="text-gray-500">Item yang dihapus akan muncul di sini.</p>
        </div>
    );
}