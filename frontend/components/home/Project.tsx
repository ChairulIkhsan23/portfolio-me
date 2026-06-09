'use client';

import { motion } from 'framer-motion';
import { useProjects } from '@/hooks/useProjects';
import CardProject from '@/components/ui/CardProject';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, FolderOpen, RefreshCw } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { useProject } from '@/hooks/useProject';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { Skeleton } from '@/components/ui/skeleton';

// Component Skeleton untuk Card
function CardSkeleton() {
    return (
        <div className="group relative bg-linear-to-br from-white/5 to-white/0 rounded-2xl overflow-hidden border border-white/10">
            {/* Image Skeleton */}
            <Skeleton className="h-64 w-full rounded-none" />

            {/* Content Skeleton */}
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

// Component Empty State
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

    // Loading state dengan skeleton grid
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <CardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // Error state (termasuk 404 API not ready)
    if (error) {
        return (
            <section className="py-20">
                <div className="container mx-auto px-6 md:px-16">
                    <EmptyState onRetry={() => window.location.reload()} />
                </div>
            </section>
        );
    }

    const featuredProjects = projects.filter(p => p.is_featured).slice(0, 6);

    // Empty state (filtered projects kosong)
    if (featuredProjects.length === 0) {
        return (
            <section className="py-20">
                <div className="container mx-auto px-6 md:px-16">
                    <EmptyState />
                </div>
            </section>
        );
    }

    const totalSlides = Math.ceil(featuredProjects.length / projectsPerSlide);
    const currentProjects = featuredProjects.slice(
        currentIndex * projectsPerSlide,
        (currentIndex + 1) * projectsPerSlide
    );

    const nextSlide = () => {
        if (currentIndex < totalSlides - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

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
                    </motion.div>

                    <div className="relative">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
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

                        {totalSlides > 1 && (
                            <>
                                <button
                                    onClick={prevSlide}
                                    disabled={currentIndex === 0}
                                    className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-4 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                                        }`}
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    disabled={currentIndex === totalSlides - 1}
                                    className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-4 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 ${currentIndex === totalSlides - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                                        }`}
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </>
                        )}

                        {totalSlides > 1 && (
                            <div className="flex justify-center gap-2 mt-8">
                                {Array.from({ length: totalSlides }).map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`transition-all duration-300 ${currentIndex === idx
                                            ? 'w-8 h-2 bg-blue-500 rounded-full'
                                            : 'w-2 h-2 bg-white/30 rounded-full hover:bg-white/50'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Modal Detail Project */}
            <Modal isOpen={!!selectedSlug} onClose={closeModal}>
                {selectedProject && (
                    <div>
                        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-6">
                            <Image
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                fill
                                unoptimized={true}
                                className="object-cover"
                            />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-white">
                                {selectedProject.title}
                            </h2>
                            <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 capitalize">
                                {selectedProject.category?.replace(/-/g, ' ') || 'Project'}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {(selectedProject.technologies || []).map((tech) => (
                                <span key={tech} className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-gray-300 border border-white/5">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="prose prose-invert max-w-none mb-6">
                            <p className="text-gray-300 leading-relaxed">
                                {selectedProject.description}
                            </p>
                            {selectedProject.content && (
                                <div className="mt-4 text-gray-400" dangerouslySetInnerHTML={{ __html: selectedProject.content }} />
                            )}
                        </div>

                        <div className="text-sm text-gray-500 mb-6">
                            Completed: {selectedProject.completion_date_formatted}
                        </div>

                        <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10">
                            {selectedProject.github_url && (
                                <a
                                    href={selectedProject.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                >
                                    <FaGithub size={18} />
                                    <span>View Code</span>
                                </a>
                            )}
                            {selectedProject.project_url && (
                                <a
                                    href={selectedProject.project_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors text-blue-400"
                                >
                                    <FiExternalLink size={18} />
                                    <span>Live Demo</span>
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}