'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ShinyText from '@/components/ShinyText';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
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
                        <span className="inline-block px-4 py-1.5 text-sm md:text-base text-yellow-400/80 bg-yellow-500/10 rounded-full border border-yellow-500/20">
                            Error 404
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        <ShinyText
                            text="Page Not Found"
                            speed={3}
                            shineColor="#eab308"
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
                            Halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman tersebut telah dipindahkan, dihapus, atau URL yang Anda masukkan salah.
                        </p>
                        <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
                            <Link
                                href="/"
                                className="px-6 md:px-8 py-2.5 md:py-3 rounded-full bg-linear-to-r from-yellow-500/20 to-amber-500/20 text-white border border-yellow-500/40 hover:from-yellow-500/30 hover:to-amber-500/30 transition-all duration-300 font-medium flex items-center gap-2 text-sm md:text-base"
                            >
                                <Home size={16} className="md:w-[18px] md:h-[18px]" />
                                Back to Home
                            </Link>
                            <button
                                onClick={() => window.history.back()}
                                className="px-6 md:px-8 py-2.5 md:py-3 rounded-full bg-white/5 text-white/70 border border-white/15 hover:bg-white/10 transition-all duration-300 font-medium flex items-center gap-2 text-sm md:text-base"
                            >
                                <ArrowLeft size={16} className="md:w-[18px] md:h-[18px]" />
                                Go Back
                            </button>
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
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl" />

                    {/* 404 Illustration */}
                    <div className="relative text-center">
                        <div className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-white/5 select-none">
                            404
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                                <Search size={48} className="md:w-16 md:h-16 text-yellow-400/60" />
                            </div>
                        </div>
                    </div>

                    <p className="relative text-gray-300 text-base md:text-xl leading-relaxed text-center">
                        Sepertinya Anda tersesat. Jangan khawatir, kami akan membantu Anda kembali ke jalur yang benar.
                    </p>

                    <div className="relative pt-2 md:pt-4 flex justify-center">
                        <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-yellow-500/10 rounded-full border border-yellow-500/20">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-400 rounded-full animate-pulse" />
                            <span className="text-xs md:text-sm text-yellow-400/80">Page not found • 404</span>
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="relative pt-4 md:pt-6 space-y-2">
                        <p className="text-xs md:text-sm text-gray-500">Beberapa kemungkinan penyebab:</p>
                        <ul className="text-xs md:text-sm text-gray-400 space-y-1 list-disc list-inside">
                            <li>URL yang Anda masukkan salah atau tidak lengkap</li>
                            <li>Halaman telah dipindahkan ke alamat baru</li>
                            <li>Halaman sudah tidak tersedia atau dihapus</li>
                            <li>Ada kesalahan saat mengetik alamat website</li>
                        </ul>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}