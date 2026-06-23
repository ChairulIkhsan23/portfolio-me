'use client';

import { motion } from 'framer-motion';
import { useExperiencesSWR, useEducationsSWR } from '@/hooks';
import ExperienceItem from '@/components/ui/ExperienceItem';
import EducationItem from '@/components/ui/EducationItem';
import { BadgeCheck, GraduationCap, BriefcaseBusiness, School, AlertCircle } from 'lucide-react';

function JourneyItemSkeleton() {
    return (
        <div className="relative pl-8 pb-8 border-l border-white/10">
            <div className="absolute left-0 top-0 -translate-x-1/2">
                <div className="w-4 h-4 rounded-full bg-white/10 animate-pulse" />
            </div>
            <div className="space-y-3">
                <div className="h-5 w-3/4 bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-white/10 rounded animate-pulse" />
                <div className="flex gap-2 pt-2">
                    <div className="h-6 w-16 bg-white/10 rounded-full animate-pulse" />
                    <div className="h-6 w-20 bg-white/10 rounded-full animate-pulse" />
                </div>
            </div>
        </div>
    );
}

function ColumnSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="space-y-6">
            {[...Array(count)].map((_, i) => (
                <JourneyItemSkeleton key={i} />
            ))}
        </div>
    );
}

function JourneyEmptyState({ type, icon: Icon }: { type: string; icon: React.ElementType }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center py-8 px-4 bg-white/5 rounded-xl border border-white/10"
        >
            <Icon className="w-10 h-10 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">
                No {type.toLowerCase()} yet.
            </p>
            <p className="text-gray-500 text-xs mt-1">
                {type === 'Experience' ? 'Experience will appear here.' : 'Education will appear here.'}
            </p>
        </motion.div>
    );
}

export default function Journey() {
    const { experiences, loading: expLoading, error: expError } = useExperiencesSWR();
    const { educations, loading: eduLoading, error: eduError } = useEducationsSWR();

    const isLoading = expLoading || eduLoading;
    const hasError = expError || eduError;

    if (isLoading) {
        return (
            <section className="py-20">
                <div className="container mx-auto px-6 md:px-16">
                    <div className="mb-16 text-center">
                        <div className="h-10 w-48 bg-white/10 rounded mx-auto mb-3 animate-pulse" />
                        <div className="h-5 w-80 bg-white/10 rounded mx-auto animate-pulse" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-6 h-6 bg-white/10 rounded animate-pulse" />
                                <div className="h-7 w-40 bg-white/10 rounded animate-pulse" />
                            </div>
                            <ColumnSkeleton count={3} />
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-6 h-6 bg-white/10 rounded animate-pulse" />
                                <div className="h-7 w-32 bg-white/10 rounded animate-pulse" />
                            </div>
                            <ColumnSkeleton count={3} />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (hasError) {
        return (
            <section className="py-20">
                <div className="container mx-auto px-6 md:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center py-16"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                            <AlertCircle className="w-10 h-10 text-red-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Failed to Load Journey
                        </h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                            Unable to load work experience and education data. Please try again later.
                        </p>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20">
            <div className="container mx-auto px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        My Journey
                    </h2>
                    <p className="text-gray-400 text-base max-w-2xl mx-auto">
                        My Professional Experience and Educational Background
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <BadgeCheck className="text-blue-400" size={24} />
                            <h3 className="text-2xl font-semibold text-white">Experience</h3>
                        </div>

                        <div className="space-y-8">
                            {experiences.length === 0 ? (
                                <JourneyEmptyState type="Experience" icon={BriefcaseBusiness} />
                            ) : (
                                experiences.map((exp, index) => (
                                    <ExperienceItem key={exp.id} experience={exp} index={index} />
                                ))
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <GraduationCap className="text-blue-400" size={24} />
                            <h3 className="text-2xl font-semibold text-white">Education</h3>
                        </div>

                        <div className="space-y-8">
                            {educations.length === 0 ? (
                                <JourneyEmptyState type="Education" icon={School} />
                            ) : (
                                educations.map((edu, index) => (
                                    <EducationItem key={edu.id} education={edu} index={index} />
                                ))
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}