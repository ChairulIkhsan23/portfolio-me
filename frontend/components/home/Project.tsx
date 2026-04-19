'use client';

import { motion } from 'framer-motion';
import { useProjects } from '@/hooks/useProjects';
import CardProject from '@/components/ui/CardProject';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { useProject } from '@/hooks/useProject';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

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

    if (loading) {
        return (
            <section className="py-20">
                <div className="container mx-auto px-6 md:px-16">
                    <div className="flex justify-center items-center py-20">
                        <div className="w-8 h-8 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20">
                <div className="container mx-auto px-6 md:px-16">
                    <div className="text-center text-red-400">
                        Failed to load projects: {error}
                    </div>
                </div>
            </section>
        );
    }

    const featuredProjects = projects.filter(p => p.is_featured).slice(0, 6);

    if (featuredProjects.length === 0) {
        return (
            <section className="py-20">
                <div className="container mx-auto px-6 md:px-16">
                    <div className="text-center text-gray-400">
                        No projects yet. Check back later!
                    </div>
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
                    {/* Judul di kiri */}
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

                    {/* Carousel dengan efek slide */}
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

                        {/* Navigation Buttons */}
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

                        {/* Dots Indicator */}
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
                        {/* Image */}
                        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-6">
                            <Image
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                fill
                                unoptimized={true}
                                className="object-cover"
                            />
                        </div>

                        {/* Title & Category */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-white">
                                {selectedProject.title}
                            </h2>
                            <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 capitalize">
                                {selectedProject.category.replace(/-/g, ' ')}
                            </span>
                        </div>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {selectedProject.technologies.map((tech) => (
                                <span key={tech} className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-gray-300 border border-white/5">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="prose prose-invert max-w-none mb-6">
                            <p className="text-gray-300 leading-relaxed">
                                {selectedProject.description}
                            </p>
                            {selectedProject.content && (
                                <div className="mt-4 text-gray-400" dangerouslySetInnerHTML={{ __html: selectedProject.content }} />
                            )}
                        </div>

                        {/* Completion Date */}
                        <div className="text-sm text-gray-500 mb-6">
                            Completed: {selectedProject.completion_date_formatted}
                        </div>

                        {/* Action Buttons */}
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