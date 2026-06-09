'use client';

import { motion } from 'framer-motion';
import { ArrowRightCircle } from 'lucide-react';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { Project } from '@/types';
import { useImageFallback } from '@/hooks/useImageFallback';

interface CardProjectProps {
    project: Project;
    index?: number;
    onClick?: () => void;
}

export default function CardProject({ project, index = 0, onClick }: CardProjectProps) {
    const {
        imageSrc,
        hasError,
        isLoading,
        handleError,
        handleLoad,
    } = useImageFallback(project.image || '');

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={onClick}
            className="group relative bg-linear-to-br from-white/5 to-white/0 rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer"
        >
            {/* Image */}
            <div className="relative h-64 overflow-hidden bg-gray-800">
                {/* Loading Skeleton */}
                {isLoading && (
                    <div className="absolute inset-0 bg-linear-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
                )}

                <Image
                    src={imageSrc}
                    alt={project.title}
                    fill
                    unoptimized={true}
                    className={`object-cover transition-all duration-700 ease-out group-hover:scale-110 ${isLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                    onError={handleError}
                    onLoad={handleLoad}
                />

                {/* linear overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

                {/* Badge di atas gambar */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-500/80 text-white backdrop-blur-sm border border-white/20">
                        {project.category.replace(/-/g, ' ')}
                    </span>
                    {project.is_featured && (
                        <span className="text-xs px-3 py-1 rounded-full bg-lime-400/80 text-white backdrop-blur-sm border border-white/20">
                            Featured
                        </span>
                    )}
                </div>

                {/* Error Indicator */}
                {hasError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10">
                        <div className="text-center">
                            <p className="text-xs text-gray-300">Image not available</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
                    {project.description}
                </p>

                {/* Technologies */}
                {(() => {
                    const techs = project.technologies_label ?? project.technologies;
                    if (!techs || techs.length === 0) return null;
                    return (
                        <div className="flex flex-wrap gap-2 mb-5">
                            {techs.slice(0, 4).map((tech) => (
                                <span
                                    key={tech}
                                    className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-gray-300 border border-white/5 hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-300"
                                >
                                    {tech}
                                </span>
                            ))}
                            {techs.length > 4 && (
                                <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-gray-300 border border-white/5">
                                    +{techs.length - 4}
                                </span>
                            )}
                        </div>
                    );
                })()}

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    {project.github_url && (
                        <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FaGithub size={16} />
                            <span>Code</span>
                        </a>
                    )}
                    {project.project_url && (
                        <a
                            href={project.project_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FiExternalLink size={16} />
                            <span>Demo</span>
                        </a>
                    )}
                    <span className="ml-auto flex items-center gap-1.5 text-sm text-blue-400 group-hover:text-blue-300 transition-colors duration-300 cursor-pointer">
                        <span>Details</span>
                        <ArrowRightCircle size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                </div>
            </div>
        </motion.div>
    );
}