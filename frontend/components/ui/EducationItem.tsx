'use client';

import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
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
            {/* Timeline dot */}
            <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/40 border border-white/20" />

            {/* Content */}
            <div className="pb-8">
                {/* Year */}
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

                {/* Degree with icon */}
                <div className="flex items-center gap-2 mb-1">
                    <GraduationCap size={18} className="text-blue-400" />
                    <h3 className="text-xl font-semibold text-white">
                        {education.degree}
                    </h3>
                </div>

                {/* Institution & Field */}
                <p className="text-gray-400 text-base mb-2 ml-6">
                    {education.institution} • {education.field_of_study}
                </p>

                {/* Grade (if available) */}
                {education.grade && (
                    <p className="text-gray-500 text-sm mb-3 ml-6">
                        Grade: {education.grade}
                    </p>
                )}

                {/* Description (if available) */}
                {education.description && (
                    <p className="text-gray-400 text-sm leading-relaxed mb-3 max-w-2xl ml-6">
                        {education.description}
                    </p>
                )}
            </div>
        </motion.div>
    );
}