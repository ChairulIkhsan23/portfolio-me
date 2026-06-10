'use client';

import { motion } from 'framer-motion';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-900 to-black">
            <div className="flex flex-col items-center justify-center gap-6">
                {/* Spinner 1 garis 3 warna */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-transparent border-t-blue-500 border-r-lime-500 border-b-white"
                />

                {/* Loading text */}
                <div className="flex items-center gap-1">
                    <span className="text-white/80 text-lg md:text-xl font-medium">Loading</span>
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                        className="text-white/80 text-lg md:text-xl"
                    >
                        .
                    </motion.span>
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                        className="text-white/80 text-lg md:text-xl"
                    >
                        .
                    </motion.span>
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                        className="text-white/80 text-lg md:text-xl"
                    >
                        .
                    </motion.span>
                </div>
            </div>
        </div>
    );
}