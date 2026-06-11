'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '@/hooks/useProjects';
import CardProject from '@/components/ui/CardProject';
import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, FolderOpen, RefreshCw } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { useProject } from '@/hooks/useProject';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { Skeleton } from '@/components/ui/skeleton';

const capitalizeWords = (str: string | null | undefined): string => {
    if (!str) return '';
    return str
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

function CardSkeleton() {
    return (
        <div className="group relative bg-linear-to-br from-white/5 to-white/0 rounded-2xl overflow-hidden border border-white/10">
            <Skeleton className="h-64 w-full rounded-none" />
            <div className="p-6 space-y-4">
                <Skeleton className="h-7 w-3/4" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                    <Skeleton className="h-4 w-10/12" />
                </div>
                <div className="flex gap-2 pt-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                </div>
                <div className="flex gap-4 pt-4 border-t border-white/10">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-16 ml-auto" />
                </div>
            </div>
        </div>
    );
}

function EmptyState({ onRetry }: { onRetry?: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
        >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-6">
                <FolderOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
                No Projects Yet
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
                Projects will appear here once added.
            </p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                >
                    <RefreshCw size={16} />
                    <span>Refresh</span>
                </button>
            )}
        </motion.div>
    );
}

export default function Project() {
    const { projects, loading, error } = useProjects();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
    const { project: selectedProject } = useProject(selectedSlug || '');
    const projectsPerSlide = 3;

    const openModal = (slug: string) => {
        setSelectedSlug(slug);
    };

    const closeModal = () => {
        setSelectedSlug(null);
    };

    const allProjects = projects;
    const displayProjects = allProjects.slice(0, 12);
    const totalSlides = Math.ceil(displayProjects.length / projectsPerSlide);
    const validTotalSlides = Math.max(1, totalSlides);

    const safeCurrentIndex = ((currentIndex % validTotalSlides) + validTotalSlides) % validTotalSlides;

    const currentProjects = displayProjects.slice(
        safeCurrentIndex * projectsPerSlide,
        (safeCurrentIndex + 1) * projectsPerSlide
    );

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => prev + 1);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => prev - 1);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    if (loading) {
        return (
            <section className="py-20 overflow-hidden">
                <div className="container mx-auto px-6 md:px-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <p className="text-blue-400 text-lg tracking-wider mb-2">
                            My Work
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Projects
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <CardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20">
                <div className="container mx-auto px-6 md:px-16">
                    <EmptyState onRetry={() => window.location.reload()} />
                </div>
            </section>
        );
    }

    if (displayProjects.length === 0) {
        return (
            <section className="py-20">
                <div className="container mx-auto px-6 md:px-16">
                    <EmptyState />
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="py-20 overflow-hidden">
                <div className="container mx-auto px-6 md:px-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <p className="text-blue-400 text-lg tracking-wider mb-2">
                            My Work
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Projects
                        </h2>
                        <p className="text-gray-400 mt-2">
                            {displayProjects.length} projects
                        </p>
                    </motion.div>

                    <div className="relative">
                        <div className="overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={safeCurrentIndex}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {currentProjects.map((project, index) => (
                                        <CardProject
                                            key={project.id}
                                            project={project}
                                            index={index}
                                            onClick={() => openModal(project.slug)}
                                        />
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {validTotalSlides > 1 && (
                            <>
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 z-10"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 z-10"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </>
                        )}

                        {validTotalSlides > 1 && (
                            <div className="flex justify-center gap-2 mt-8 flex-wrap">
                                {Array.from({ length: validTotalSlides }).map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => goToSlide(idx)}
                                        className={`transition-all duration-300 cursor-pointer ${safeCurrentIndex === idx
                                            ? 'w-8 h-2 bg-blue-500 rounded-full'
                                            : 'w-2 h-2 bg-white/30 rounded-full hover:bg-white/50 hover:scale-125'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Modal isOpen={!!selectedSlug} onClose={closeModal}>
                {selectedProject && (
                    <div className="pb-6">
                        <div className="relative h-56 md:h-80 lg:h-96 rounded-xl overflow-hidden mb-6">
                            <Image
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                fill
                                unoptimized={true}
                                className="object-cover"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                                {selectedProject.title}
                            </h2>
                            <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 w-fit">
                                {capitalizeWords(selectedProject.category) || 'Project'}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {(selectedProject.technologies || []).slice(0, 6).map((tech: string) => (
                                <span key={tech} className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-gray-300 border border-white/5">
                                    {capitalizeWords(tech)}
                                </span>
                            ))}
                            {(selectedProject.technologies || []).length > 6 && (
                                <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-gray-300 border border-white/5">
                                    +{(selectedProject.technologies || []).length - 6}
                                </span>
                            )}
                        </div>

                        {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                            <div className="bg-white/5 rounded-lg p-4 md:p-5 mb-6">
                                <h3 className="text-base md:text-lg font-semibold text-white mb-3">
                                    Key Highlights
                                </h3>
                                <ul className="space-y-2">
                                    {selectedProject.highlights.map((highlight: string | { point: string }, idx: number) => (
                                        <li key={idx} className="text-gray-300 text-sm flex gap-2">
                                            <span className="text-blue-400 mt-0.5">•</span>
                                            <span>{typeof highlight === 'object' ? highlight.point : highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="prose prose-invert max-w-none mb-6">
                            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                                {selectedProject.description}
                            </p>
                            {selectedProject.content && (
                                <div className="mt-4 text-gray-400 text-sm" dangerouslySetInnerHTML={{ __html: selectedProject.content }} />
                            )}
                        </div>

                        <div className="text-xs md:text-sm text-gray-500 mb-6">
                            Completed: {selectedProject.completion_date_formatted}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/10">
                            {selectedProject.github_url && (
                                <a
                                    href={selectedProject.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors w-full sm:w-auto"
                                >
                                    <FaGithub size={16} />
                                    <span className="text-sm">View Code</span>
                                </a>
                            )}
                            {selectedProject.project_url && (
                                <a
                                    href={selectedProject.project_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors text-blue-400 w-full sm:w-auto"
                                >
                                    <FiExternalLink size={16} />
                                    <span className="text-sm">Live Demo</span>
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}