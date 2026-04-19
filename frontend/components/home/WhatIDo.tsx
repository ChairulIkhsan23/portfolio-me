'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { serviceCategories } from '@/constants/services';
import { ChevronDown } from 'lucide-react';
import CodeEditor from '../ui/CodeEditor';

export default function WhatIDo() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 overflow-hidden">
            <div className="container mx-auto px-6 md:px-16">
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">

                    {/* LEFT - Accordion Categories */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-linear-to-r from-white to-white/70 bg-clip-text text-transparent">
                            What I Do?
                        </h2>

                        {serviceCategories.map((category, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="border border-white/10 rounded-xl overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleAccordion(idx)}
                                    className="w-full flex justify-between items-center p-4 text-left bg-white/5 hover:bg-white/10 transition-colors duration-300"
                                >
                                    <span className="text-white font-semibold">{category.category}</span>
                                    <motion.span
                                        animate={{ rotate: openIndex === idx ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-purple-400"
                                    >
                                        <ChevronDown className="w-5 h-5 text-blue-500" />
                                    </motion.span>
                                </button>
                                <AnimatePresence>
                                    {openIndex === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-4 space-y-2">
                                                {category.services.map((service, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                                                        <span className="text-blue-500">▹</span>
                                                        <span>{service}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>

                    <CodeEditor />
                </div>
            </div>
        </section>
    );
}