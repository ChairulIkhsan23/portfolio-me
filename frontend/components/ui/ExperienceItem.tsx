'use client';

import { motion } from 'framer-motion';
import { Experience } from '@/types';
import { BadgeCheck } from 'lucide-react';
import Image from 'next/image';

interface ExperienceItemProps {
    experience: Experience;
    index: number;
}

export default function ExperienceItem({ experience, index }: ExperienceItemProps) {
    return (
        <motion.div
            key={experience.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative pl-6 border-l border-white/20 hover:border-white/40 transition-all duration-300"
        >
            <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/40 border border-white/20" />

            <div className="pb-8">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-sm text-blue-400 font-mono">
                        {experience.start_date.split('-')[0]} — {experience.is_current ? 'Present' : experience.end_date?.split('-')[0]}
                    </span>
                    {experience.is_current && (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-lime-400/20 text-lime-300 border border-lime-400/30">
                            Current
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2 mb-1">
                    <BadgeCheck size={18} className="text-blue-400" />
                    <h3 className="text-xl font-semibold text-white">
                        {experience.position}
                    </h3>
                </div>

                <div className="flex items-center gap-2 mb-3">
                    {experience.company_logo && (
                        <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                            <Image
                                src={experience.company_logo}
                                alt={experience.company}
                                fill
                                className="object-contain rounded"
                                unoptimized={true}
                            />
                        </div>
                    )}
                    <p className="text-gray-400 text-base">
                        {experience.company}
                    </p>
                </div>

                {experience.description && (
                    <div className="mb-3">
                        <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                            {experience.description}
                        </p>
                    </div>
                )}

                {experience.highlights && experience.highlights.length > 0 && (
                    <ul className="space-y-1 mb-3">
                        {experience.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-gray-400 text-sm flex gap-2">
                                <span className="text-blue-400">•</span>
                                <span>{highlight}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </motion.div>
    );
}