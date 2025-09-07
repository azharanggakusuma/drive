import { File, Folder, FileText, FileSpreadsheet, MoreHorizontal, ImageIcon, FileArchive, FileCode, Presentation } from "lucide-react";
import { type FileItem } from "@/lib/data";
import { motion } from "framer-motion";

export const FileTypeIcon = ({ name, type }: { name: string, type: 'file' | 'folder' }) => {
  if (type === 'folder') {
    return <Folder className="text-blue-500 group-hover:text-blue-600" size={28} />;
  }
  
  const extension = name.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'pdf':
      return <FileText className="text-red-500" size={28} />;
    case 'xlsx':
    case 'csv':
      return <FileSpreadsheet className="text-green-500" size={28} />;
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'svg':
      return <ImageIcon className="text-purple-500" size={28} />;
    case 'docx':
    case 'doc':
      return <FileText className="text-blue-600" size={28} />;
    case 'pptx':
      return <Presentation className="text-orange-500" size={28} />;
    case 'zip':
    case 'rar':
      return <FileArchive className="text-yellow-600" size={28} />;
    case 'js':
    case 'ts':
    case 'html':
    case 'css':
      return <FileCode className="text-indigo-500" size={28} />;
    default:
      return <File className="text-gray-400 group-hover:text-gray-500" size={28} />;
  }
};

const FileCard = ({ name, type, size, onClick, onContextMenu }: FileItem & { onClick?: () => void, onContextMenu?: (e: React.MouseEvent) => void }) => (
  <div onClick={onClick} onContextMenu={onContextMenu} className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative">
    <div className="flex items-center gap-4 mb-3">
      <FileTypeIcon name={name} type={type} />
      <span className="font-semibold text-gray-800 dark:text-gray-200 truncate pr-8">{name}</span>
    </div>
    <p className="text-sm text-gray-500 dark:text-gray-400 pl-11">{size}</p>
    <button className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
        <MoreHorizontal size={20} />
    </button>
  </div>
);

const FileRow = ({ name, type, size, modified, onClick, onContextMenu }: FileItem & { onClick?: () => void, onContextMenu?: (e: React.MouseEvent) => void }) => (
    <div onClick={onClick} onContextMenu={onContextMenu} className="grid grid-cols-12 gap-x-4 items-center px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group">
        <div className="col-span-12 sm:col-span-6 flex items-center gap-4">
            <div className="flex-shrink-0"><FileTypeIcon name={name} type={type} /></div>
            <span className="font-medium truncate">{name}</span>
        </div>
        <div className="col-span-6 sm:col-span-3 text-sm text-gray-500 dark:text-gray-400 pl-11 sm:pl-0">{modified}</div>
        <div className="col-span-6 sm:col-span-3 text-sm text-gray-500 dark:text-gray-400 pl-11 sm:pl-0 sm:text-left">{size}</div>
    </div>
);

const FileCardSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="flex items-center gap-4 mb-3">
            <div className="w-7 h-7 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 ml-11"></div>
    </div>
);

const FileRowSkeleton = () => (
    <div className="grid grid-cols-12 gap-4 items-center px-4 py-5 animate-pulse">
        <div className="col-span-6 flex items-center gap-4">
            <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
        <div className="col-span-3 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="col-span-3 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
);

interface FileDisplayProps {
    title: string;
    items: FileItem[];
    viewMode: 'grid' | 'list';
    isLoading: boolean;
    onFileClick?: (file: FileItem) => void;
    onFileContextMenu?: (event: React.MouseEvent, file: FileItem) => void;
}

export const FileDisplay = ({ title, items, viewMode, isLoading, onFileClick, onFileContextMenu }: FileDisplayProps) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    if (isLoading) {
        return (
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => <FileCardSkeleton key={i} />)}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800/50 p-2 rounded-lg">
                        {[...Array(4)].map((_, i) => <FileRowSkeleton key={i} />)}
                    </div>
                )}
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <div className="text-center py-10 px-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <p className="text-gray-500">Tidak ada item di sini.</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            {viewMode === 'grid' ? (
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {items.map((file, index) => 
                        <motion.div key={index} variants={itemVariants}>
                            <FileCard {...file} 
                                onClick={() => onFileClick?.(file)}
                                onContextMenu={(e) => onFileContextMenu?.(e, file)}
                            />
                        </motion.div>
                    )}
                </motion.div>
            ) : (
                <motion.div
                    className="bg-white dark:bg-gray-800/50 p-2 rounded-lg"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="hidden sm:grid grid-cols-12 gap-4 px-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                        <div className="col-span-6 text-sm font-semibold text-gray-600 dark:text-gray-400">Nama</div>
                        <div className="col-span-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Terakhir diubah</div>
                        <div className="col-span-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Ukuran file</div>
                    </div>
                    <div className="mt-2 flex flex-col gap-1">
                        {items.map((file, index) => 
                            <motion.div key={index} variants={itemVariants}>
                                <FileRow {...file}
                                    onClick={() => onFileClick?.(file)}
                                    onContextMenu={(e) => onFileContextMenu?.(e, file)}
                                />
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );
};