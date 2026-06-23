'use client';

import { motion } from 'framer-motion';
import { GraduationCap, FileText } from 'lucide-react';
import Image from 'next/image';
import { Education } from '@/types';

interface EducationItemProps {
    education: Education;
    index: number;
}


export default function EducationItem({ education, index }: EducationItemProps) {
    return (
        <motion.div
            key={education.id}
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
                        {education.start_date.split('-')[0]} — {education.is_current ? 'Present' : education.end_date?.split('-')[0]}
                    </span>
                    {education.is_current && (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-lime-400/20 text-lime-300 border border-lime-400/30">
                            Current
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2 mb-1">
                    <GraduationCap size={18} className="text-blue-400" />
                    <h3 className="text-xl font-semibold text-white">
                        {education.degree}
                    </h3>
                </div>

                <div className="flex items-center gap-2 mb-2 ml-6">
                    {education.logo && (
                        <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                            <Image
                                src={`/storage/${education.logo}`}
                                alt={education.institution}
                                fill
                                className="object-contain rounded"
                                unoptimized={true}
                            />
                        </div>
                    )}
                    <p className="text-gray-400 text-base">
                        {education.institution} • {education.field_of_study}
                    </p>
                </div>

                {education.grade && (
                    <p className="text-gray-500 text-sm mb-3 ml-6">
                        Grade: {education.grade}
                    </p>
                )}

                {education.description && (
                    <div className="ml-6 mb-3">
                        <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                            {education.description}
                        </p>
                    </div>
                )}

                {education.highlights && education.highlights.length > 0 && (
                    <ul className="ml-6 space-y-1">
                        {education.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-gray-400 text-sm flex gap-2">
                                <span className="text-blue-400">•</span>
                                <span>{highlight}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {education.drive_link && (
                    <a
                        href={education.drive_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors mt-3 ml-6"
                    >
                        <FileText size={16} />
                        <span>View Supporting Documents</span>
                    </a>
                )}
            </div>
        </motion.div>
    );
}