import { Star } from "lucide-react";

export default function StarredPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <Star size={80} className="text-gray-300 dark:text-gray-600 mb-4" />
            <h1 className="text-3xl font-bold mb-2">Berbintang</h1>
            <p className="text-gray-500">Item yang Anda tandai dengan bintang akan muncul di sini.</p>
        </div>
    );
}