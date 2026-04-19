'use client';

import { motion } from 'framer-motion';
import { Experience } from '@/types';

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
            {/* Timeline dot */}
            <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/40 border border-white/20" />

            {/* Content */}
            <div className="pb-8">
                {/* Year */}
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

                {/* Position */}
                <h3 className="text-xl font-semibold text-white mb-1">
                    {experience.position}
                </h3>

                {/* Company */}
                <p className="text-gray-400 text-base mb-3">
                    {experience.company}
                </p>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-3 max-w-2xl">
                    {experience.description}
                </p>

                {/* Technologies */}
                {(experience.technologies_label ?? experience.technologies) && (
                    <div className="flex flex-wrap gap-2">
                        {(experience.technologies_label ?? experience.technologies)!.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10 hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-300"
                            >
                                {tech}
                            </span>
                        ))}
                        {(experience.technologies_label ?? experience.technologies)!.length > 4 && (
                            <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">
                                +{(experience.technologies_label ?? experience.technologies)!.length - 4}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}