'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface ModalMessageProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'success' | 'error';
    title: string;
    message: string;
    autoClose?: number; // waktu dalam detik, default 3 detik
}

export default function ModalMessage({
    isOpen,
    onClose,
    type,
    title,
    message,
    autoClose = 3
}: ModalMessageProps) {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (isOpen) {
            setProgress(100);
            const startTime = Date.now();
            const duration = autoClose * 1000;

            const interval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
                setProgress(remaining);

                if (remaining <= 0) {
                    clearInterval(interval);
                    onClose();
                }
            }, 16); // ~60fps

            return () => clearInterval(interval);
        }
    }, [isOpen, autoClose, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm"
                    >
                        <div className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl p-6 mx-4">
                            {/* Progress Bar */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 rounded-t-2xl overflow-hidden">
                                <motion.div
                                    initial={{ width: "100%" }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.016 }}
                                    className={`h-full rounded-t-2xl ${type === 'success' ? 'bg-green-500' : 'bg-red-500'
                                        }`}
                                />
                            </div>

                            {/* Content */}
                            <div className="text-center mt-2">
                                {/* Icon */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.1 }}
                                    className={`w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center ${type === 'success'
                                        ? 'bg-green-500/20'
                                        : 'bg-red-500/20'
                                        }`}
                                >
                                    {type === 'success' ? (
                                        <CheckCircle size={28} className="text-green-400" />
                                    ) : (
                                        <AlertCircle size={28} className="text-red-400" />
                                    )}
                                </motion.div>

                                {/* Title */}
                                <motion.h3
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-xl font-semibold text-white mb-2"
                                >
                                    {title}
                                </motion.h3>

                                {/* Message */}
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-gray-400 text-sm"
                                >
                                    {message}
                                </motion.p>

                                {/* Countdown Indicator */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="mt-4 text-xs text-white/30"
                                >
                                    Closing in {Math.ceil(progress / 100 * autoClose)}s
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}