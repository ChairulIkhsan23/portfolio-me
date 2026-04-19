'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };
    return (
        <section className="py-20 overflow-hidden">
            <div className="container mx-auto px-6 md:px-16">
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

                    {/* Left - Image with animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative justify-self-center md:justify-self-end group"
                    >
                        <div className="relative w-65 md:w-75 aspect-3/4 [perspective:1000px] cursor-pointer">
                            <div
                                onClick={handleFlip}
                                className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''
                                    } md:group-hover:[transform:rotateY(180deg)]`}
                            >
                                {/* Front side */}
                                <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/20 bg-black/50 shadow-xl [backface-visibility:hidden]">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="/images/profile.jpg"
                                            alt="Chairul Ikhsan"
                                            fill
                                            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                            quality={100}
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
                                    </div>
                                </div>

                                {/* Back side */}
                                <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/20 bg-black/50 shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="/images/profile-back.jpg"
                                            alt="Chairul Ikhsan - Back"
                                            fill
                                            className="object-cover object-top"
                                            quality={100}
                                        />
                                        <div className="absolute inset-0 bg-black/20" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hint for mobile */}
                        <div className="text-center mt-3 md:hidden">
                            <p className="text-white/40 text-[10px]">
                                {isFlipped ? 'tap to flip back' : 'tap to flip'}
                            </p>
                        </div>
                    </motion.div>

                    {/* Right - Content with animation */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        className="md:pl-4"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-linear-to-r from-white to-white/70 bg-clip-text text-transparent">
                            About Me
                        </h2>

                        <div className="space-y-5 text-gray-300 text-base md:text-lg leading-relaxed">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                Berfokus pada pengembangan solusi digital yang modern, efisien, dan dapat diimplementasikan secara nyata.
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                Menguasai Full Stack Development dan Machine Learning untuk membangun sistem yang fungsional, terstruktur, dan berdampak.
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                Terus mengembangkan kemampuan dalam membangun aplikasi web modern serta solusi digital yang scalable, adaptif, dan relevan dengan kebutuhan saat ini.
                            </motion.p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}