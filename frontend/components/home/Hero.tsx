'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { FiFileText } from 'react-icons/fi';
import ShinyText from '@/components/ShinyText';
import { socialLinks } from '@/constants/socialLinks';
import { useState } from 'react';

export default function Hero() {
    const [showPDF, setShowPDF] = useState(false);

    const socialArray = [
        { icon: FaGithub, href: socialLinks.github, label: 'GitHub' },
        { icon: FaLinkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
        { icon: FaInstagram, href: socialLinks.instagram, label: 'Instagram' },
        { icon: HiOutlineMail, href: socialLinks.email, label: 'Email' },
    ];

    const handleOpenPDF = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowPDF(true);
    };

    return (
        <>
            <section className="min-h-[calc(100vh-80px)] flex items-center px-6 md:px-16">
                <div className="max-w-7xl mx-auto w-full grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">

                    {/* LEFT */}
                    <div className="space-y-8 max-w-xl">
                        {/* Small intro */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-block px-4 py-1.5 text-base text-white/60 bg-white/5 rounded-full border border-white/10">
                                Hi, I'm Chairul Ikhsan
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            <ShinyText
                                text="Building Digital Solutions"
                                speed={3}
                                shineColor="#60a5fa"
                                color="#ffffff"
                                className="text-6xl md:text-7xl lg:text-8xl font-medium leading-[1.1] tracking-tighter"
                            />
                        </motion.div>

                        {/* SOCIAL LINKS + RESUME BUTTON */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex gap-3 pt-2 flex-wrap items-center"
                        >
                            {/* Social Icons */}
                            {socialArray.map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon className="text-lg" />
                                </motion.a>
                            ))}

                            {/* Separator garis */}
                            <div className="w-px h-6 bg-white/20 mx-1"></div>

                            {/* Resume Button - tidak pindah halaman */}
                            <motion.button
                                onClick={handleOpenPDF}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-300 hover:text-white hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 cursor-pointer"
                            >
                                <FiFileText className="text-base" />
                                <span className="text-sm font-medium">Resume</span>
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* RIGHT - unchanged */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative space-y-6"
                    >
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />

                        <p className="relative text-gray-300 text-lg md:text-xl leading-relaxed">
                            "Mengembangkan solusi digital berbasis teknologi dengan pendekatan yang praktis, rapi,
                            dan berorientasi pada kebutuhan pengguna."
                        </p>

                        <div className="relative pt-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                <span className="w-2 h-2 bg-lime-300 rounded-full animate-pulse" />
                                <span className="text-sm text-white/60">Available for new opportunities</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* MODAL PDF */}
            {showPDF && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-pointer"
                    onClick={() => setShowPDF(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-4xl h-[80vh] bg-white rounded-lg overflow-hidden shadow-2xl cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* PDF Viewer */}
                        <iframe
                            src={`${socialLinks.resume}#toolbar=0`}
                            className="w-full h-full"
                            title="Resume Preview"
                        />
                    </motion.div>
                </div>
            )}
        </>
    );
}