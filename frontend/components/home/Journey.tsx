'use client';

import { motion } from 'framer-motion';
import { useExperiences } from '@/hooks/useExperiences';
import { useEducations } from '@/hooks/useEducations';
import ExperienceItem from '@/components/ui/ExperienceItem';
import EducationItem from '@/components/ui/EducationItem';
import { Briefcase, GraduationCap, BriefcaseBusiness, School, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Skeleton untuk Experience/Education Item
function JourneyItemSkeleton() {
    return (
        <div className="relative pl-8 pb-8 border-l border-white/10">
            <div className="absolute left-0 top-0 -translate-x-1/2">
                <Skeleton className="w-4 h-4 rounded-full" />
            </div>
            <div className="space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-2 pt-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                </div>
            </div>
        </div>
    );
}

// Skeleton untuk satu kolom (list items)
function ColumnSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="space-y-6">
            {[...Array(count)].map((_, i) => (
                <JourneyItemSkeleton key={i} />
            ))}
        </div>
    );
}

// Empty State Component
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
                {type === 'Experience' ? 'Work experience will appear here.' : 'Education will appear here.'}
            </p>
        </motion.div>
    );
}

export default function Journey() {
    const { experiences, loading: expLoading, error: expError } = useExperiences();
    const { educations, loading: eduLoading, error: eduError } = useEducations();

    const isLoading = expLoading || eduLoading;
    const hasError = expError || eduError;

    // Loading state
    if (isLoading) {
        return (
            <section className="py-20">
                <div className="container mx-auto px-6 md:px-16">
                    {/* Section Title Skeleton */}
                    <div className="mb-16 text-center">
                        <Skeleton className="h-10 w-48 mx-auto mb-3" />
                        <Skeleton className="h-5 w-80 mx-auto" />
                    </div>

                    {/* Grid 2 kolom skeleton */}
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                        {/* Left Column - Experience */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <Skeleton className="w-6 h-6 rounded" />
                                <Skeleton className="h-7 w-40" />
                            </div>
                            <ColumnSkeleton count={3} />
                        </div>

                        {/* Right Column - Education */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <Skeleton className="w-6 h-6 rounded" />
                                <Skeleton className="h-7 w-32" />
                            </div>
                            <ColumnSkeleton count={3} />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Error state
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
                {/* Section Title */}
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
                        My professional experience and educational background
                    </p>
                </motion.div>

                {/* Grid 2 kolom */}
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                    {/* LEFT COLUMN - Experience */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <Briefcase className="text-blue-400" size={24} />
                            <h3 className="text-2xl font-semibold text-white">Work Experience</h3>
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

                    {/* RIGHT COLUMN - Education */}
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