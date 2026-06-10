'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Link from 'next/link';
import ShinyText from '@/components/ShinyText';
import { RefreshCw, Home } from 'lucide-react';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error('Application error:', error);
    }, [error]);

    return (
        <section className="min-h-[calc(100vh-80px)] py-12 md:py-20 flex items-center px-6 md:px-16">
            <div className="max-w-7xl mx-auto w-full grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-12 items-center">

                {/* LEFT */}
                <div className="space-y-6 md:space-y-8 max-w-xl">
                    {/* Status Code */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-4 py-1.5 text-sm md:text-base text-red-400/80 bg-red-500/10 rounded-full border border-red-500/20">
                            Error 500
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        <ShinyText
                            text="Something Went Wrong"
                            speed={3}
                            shineColor="#ef4444"
                            color="#ffffff"
                            className="text-4xl md:text-5xl lg:text-7xl font-medium leading-[1.2] md:leading-[1.1] tracking-tighter"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        <p className="text-gray-400 text-base md:text-lg">
                            {error.message || 'Terjadi kesalahan tak terduga pada aplikasi.'}
                        </p>
                        <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
                            <button
                                onClick={reset}
                                className="px-6 md:px-8 py-2.5 md:py-3 rounded-full bg-linear-to-r from-red-500/20 to-orange-500/20 text-white border border-red-500/40 hover:from-red-500/30 hover:to-orange-500/30 transition-all duration-300 font-medium flex items-center gap-2 text-sm md:text-base"
                            >
                                <RefreshCw size={16} className="md:w-[18px] md:h-[18px]" />
                                Try Again
                            </button>
                            <Link
                                href="/"
                                className="px-6 md:px-8 py-2.5 md:py-3 rounded-full bg-white/5 text-white/70 border border-white/15 hover:bg-white/10 transition-all duration-300 font-medium flex items-center gap-2 text-sm md:text-base"
                            >
                                <Home size={16} className="md:w-[18px] md:h-[18px]" />
                                Back Home
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative space-y-4 md:space-y-6 mt-4 md:mt-0"
                >
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-red-500/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl" />

                    <p className="relative text-gray-300 text-base md:text-xl leading-relaxed">
                        Maaf, terjadi kesalahan pada sistem. Silakan coba lagi atau hubungi saya melalui media sosial.
                    </p>

                    <div className="relative pt-2 md:pt-4">
                        <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-red-500/10 rounded-full border border-red-500/20">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-400 rounded-full animate-pulse" />
                            <span className="text-xs md:text-sm text-red-400/80">Error detected • Please try again</span>
                        </div>
                    </div>

                    {/* Saran perbaikan */}
                    <div className="relative pt-4 md:pt-6 space-y-2">
                        <p className="text-xs md:text-sm text-gray-500">Beberapa hal yang bisa Anda coba:</p>
                        <ul className="text-xs md:text-sm text-gray-400 space-y-1 list-disc list-inside">
                            <li>Refresh halaman dan coba lagi</li>
                            <li>Periksa koneksi internet Anda</li>
                            <li>Bersihkan cache browser</li>
                            <li>Hubungi support jika masalah berlanjut</li>
                        </ul>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}