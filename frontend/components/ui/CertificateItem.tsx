'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, ExternalLink } from 'lucide-react';
import { Certificate } from '@/types';
import { useImageFallback } from '@/hooks/useImageFallback';

interface CertificateItemProps {
    certificate: Certificate;
    index: number;
}

export default function CertificateItem({ certificate, index }: CertificateItemProps) {
    const {
        imageSrc,
        hasError,
        isLoading,
        handleError,
        handleLoad,
    } = useImageFallback(certificate.image || '');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group"
        >
            <div className="bg-white/5 rounded-xl overflow-visible hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-blue-500/30 relative">
                {/* Image di atas */}
                {certificate.image ? (
                    <div className="relative w-full h-48 overflow-hidden bg-gray-800">
                        {/* Loading Skeleton */}
                        {isLoading && (
                            <div className="absolute inset-0 bg-linear-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
                        )}

                        <Image
                            src={imageSrc}
                            alt={certificate.title}
                            fill
                            className={`object-cover transition-all duration-500 group-hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'
                                }`}
                            unoptimized={true}
                            onError={handleError}
                            onLoad={handleLoad}
                        />

                        {/* Error Indicator */}
                        {hasError && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                                <div className="text-center">
                                    <Award size={32} className="text-blue-400 mx-auto mb-1" />
                                    <p className="text-xs text-gray-300">Image not available</p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full h-32 bg-linear-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <Award size={48} className="text-blue-400" />
                    </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                    <span className="text-xs px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white border border-white/20">
                        {certificate.category_label || certificate.category}
                    </span>
                </div>

                {/* Content di bawah gambar */}
                <div className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                            {certificate.title}
                        </h3>
                        {certificate.credential_url && (
                            <a
                                href={certificate.credential_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-blue-400 transition-colors duration-300"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink size={16} />
                            </a>
                        )}
                    </div>

                    <p className="text-gray-400 text-sm mb-2">
                        {certificate.issuer}
                    </p>

                    <p className="text-gray-500 text-xs mb-3">
                        Issued: {certificate.issued_formatted}
                        {certificate.expiry_date && ` • Expires: ${certificate.expiry_date.split('-')[0]}`}
                        {!certificate.expiry_date && certificate.is_valid && ' • Lifetime'}
                    </p>

                    {/* Skills */}
                    {certificate.skills && certificate.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {certificate.skills.slice(0, 3).map((skill) => (
                                <span
                                    key={skill}
                                    className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10"
                                >
                                    {skill}
                                </span>
                            ))}
                            {certificate.skills.length > 3 && (
                                <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">
                                    +{certificate.skills.length - 3}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}