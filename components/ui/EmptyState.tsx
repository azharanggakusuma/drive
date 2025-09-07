import { Folder, Plus } from "lucide-react";

export const EmptyState = () => (
  <div className="text-center py-16 px-8 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
    <Folder size={64} className="mx-auto text-gray-400 mb-4" />
    <h3 className="text-xl font-semibold mb-2">Tidak Ada File</h3>
    <p className="text-gray-500 mb-6">Mulai unggah file pertama Anda untuk melihatnya di sini.</p>
    <button className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors font-semibold">
      <Plus size={20} /> Unggah File
    </button>
  </div>
);