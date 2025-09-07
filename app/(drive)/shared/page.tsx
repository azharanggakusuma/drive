"use client";

import { Users } from "lucide-react";
import { motion } from "framer-motion";

export default function SharedPage() {
    return (
        <motion.div
            className="flex flex-col items-center justify-center h-full text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {/* Icon dengan efek glow */}
            <div className="relative mb-6">
                <Users
                    size={80}
                    className="text-gray-300 dark:text-gray-600"
                    strokeWidth={1.5}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-200/50 to-transparent dark:from-gray-500/30 dark:to-transparent rounded-full -z-10 blur-xl" />
            </div>

            {/* Judul */}
            <motion.h1
                className="text-4xl font-bold tracking-tight mb-2 text-slate-800 dark:text-slate-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                Dibagikan
            </motion.h1>

            {/* Deskripsi */}
            <motion.p
                className="text-base text-gray-500 dark:text-gray-400 mb-8 max-w-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                File dan folder yang dibagikan dengan Anda akan muncul di sini.
            </motion.p>

            {/* Badge status pengembangan */}
            <motion.div
                className="flex items-center px-4 py-2 rounded-full bg-yellow-100/80 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 border border-yellow-200/80 dark:border-yellow-800/60 shadow-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
            >
                <span className="mr-2 text-lg">🚧</span>
                <span className="text-sm font-medium">
                    Fitur ini sedang dalam tahap pengembangan.
                </span>
            </motion.div>
        </motion.div>
    );
}
