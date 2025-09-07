import { Users } from "lucide-react";

export default function SharedPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <Users size={80} className="text-gray-300 dark:text-gray-600 mb-4" />
            <h1 className="text-3xl font-bold mb-2">Dibagikan</h1>
            <p className="text-gray-500">File dan folder yang dibagikan dengan Anda akan muncul di sini.</p>
        </div>
    );
}