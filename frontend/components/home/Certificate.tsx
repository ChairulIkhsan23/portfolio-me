'use client';

import { motion } from 'framer-motion';
import { useCertificates } from '@/hooks/useCertificates';
import CertificateItem from '@/components/ui/CertificateItem';
import { Award, Medal, FileQuestion } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Skeleton untuk Certificate Item
function CertificateSkeleton() {
    return (
        <div className="group relative bg-linear-to-br from-white/5 to-white/0 rounded-xl overflow-hidden border border-white/10 p-5">
            <div className="flex items-start gap-4">
                {/* Icon Skeleton */}
                <Skeleton className="w-12 h-12 rounded-lg shrink-0" />

                {/* Content Skeleton */}
                <div className="flex-1 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Empty State Component untuk Certificates
function CertificatesEmptyState() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
        >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-6">
                <Medal className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
                No Certificates Yet
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
                Certificates will appear here once added.
            </p>
        </motion.div>
    );
}

export default function Certificates() {
    const { certificates, loading, error } = useCertificates();

    // Loading state dengan skeleton grid
    if (loading) {
        return (
            <section className="py-20">
                <div className="container mx-auto px-6 md:px-16">
                    {/* Section Title Skeleton */}
                    <div className="mb-12 text-center">
                        <div className="flex justify-center mb-4">
                            <Skeleton className="w-12 h-12 rounded-full" />
                        </div>
                        <Skeleton className="h-9 w-48 mx-auto mb-3" />
                        <Skeleton className="h-5 w-64 mx-auto" />
                    </div>

                    {/* Grid Skeleton */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <CertificateSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // Error state
    if (error) {
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
                            <FileQuestion className="w-10 h-10 text-red-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Failed to Load Certificates
                        </h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                            Please try again later.
                        </p>
                    </motion.div>
                </div>
            </section>
        );
    }

    // Empty state (data kosong)
    if (certificates.length === 0) {
        return (
            <section className="py-20">
                <div className="container mx-auto px-6 md:px-16">
                    {/* Section Title tetap muncul */}
                    <div className="mb-12 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <Award size={24} className="text-blue-400" />
                            </div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                            Certifications
                        </h2>
                        <p className="text-gray-400 text-base max-w-2xl mx-auto">
                            Professional certifications and achievements
                        </p>
                    </div>

                    <CertificatesEmptyState />
                </div>
            </section>
        );
    }

    // Success state - tampilkan certificates
    return (
        <section className="py-20">
            <div className="container mx-auto px-6 md:px-16">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center"
                >
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                            <Award size={24} className="text-blue-400" />
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        Certifications
                    </h2>
                    <p className="text-gray-400 text-base max-w-2xl mx-auto">
                        Professional certifications and achievements
                    </p>
                </motion.div>

                {/* Certificates Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {certificates.map((cert, index) => (
                        <CertificateItem key={cert.id} certificate={cert} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}