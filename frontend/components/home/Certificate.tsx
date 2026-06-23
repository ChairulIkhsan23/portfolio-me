'use client';

import { motion } from 'framer-motion';
import { useCertificatesSWR } from '@/hooks';
import CertificateItem from '@/components/ui/CertificateItem';
import { Award, Medal, FileQuestion } from 'lucide-react';
import FilterDropdown from '@/components/ui/FilterDropdown';
import Modal from '@/components/ui/Modal';
import { useState, useMemo } from 'react';
import type { Certificate } from '@/types';
import Image from "next/image";

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
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
    const perPage = 6;

    const { certificates, loading, error, pagination } = useCertificatesSWR(
        selectedCategory || undefined,
        perPage,
        currentPage
    );

    const categories = useMemo(() => {
        const catMap = new Map<number, string>();
        certificates.forEach(c => {
            if (c.category?.id && c.category?.name) {
                catMap.set(c.category.id, c.category.name);
            }
        });
        return Array.from(catMap.entries()).map(([id, name]) => ({ id, name }));
    }, [certificates]);

    const totalPages = pagination?.last_page || 1;

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const openModal = (cert: Certificate) => {
        setSelectedCertificate(cert);
    };

    const closeModal = () => {
        setSelectedCertificate(null);
    };

    if (loading) {
        return (
            <section className="py-20">
                <div className="container mx-auto px-6 md:px-16">
                    <div className="mb-12 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-white/10 animate-pulse" />
                        </div>
                        <div className="h-9 w-48 bg-white/10 rounded mx-auto mb-3 animate-pulse" />
                        <div className="h-5 w-64 bg-white/10 rounded mx-auto animate-pulse" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white/5 rounded-xl border border-white/10 p-5 animate-pulse">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-white/10" />
                                    <div className="flex-1 space-y-3">
                                        <div className="h-5 w-3/4 bg-white/10 rounded" />
                                        <div className="h-4 w-1/2 bg-white/10 rounded" />
                                        <div className="flex gap-2">
                                            <div className="h-6 w-20 bg-white/10 rounded-full" />
                                            <div className="h-6 w-24 bg-white/10 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
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

    if (certificates.length === 0) {
        return (
            <section className="py-20">
                <div className="container mx-auto px-6 md:px-16">
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

    return (
        <>
            <section className="py-20">
                <div className="container mx-auto px-6 md:px-16">
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
                            Professional Certifications and Achievements
                        </p>
                    </motion.div>

                    <div className="mb-8 flex justify-start">
                        <FilterDropdown
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelect={(id) => {
                                setSelectedCategory(id);
                                setCurrentPage(1);
                            }}
                            placeholder="All Categories"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {certificates.map((cert, index) => (
                            <div key={cert.id} onClick={() => openModal(cert)} className="cursor-pointer">
                                <CertificateItem certificate={cert} index={index} />
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-3 mt-12">
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            >
                                Previous
                            </button>

                            <span className="text-gray-400 text-sm">
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <Modal isOpen={!!selectedCertificate} onClose={closeModal}>
                {selectedCertificate && (
                    <div className="pb-6">
                        <div className="relative h-56 md:h-80 lg:h-96 rounded-xl overflow-hidden mb-6">
                            {selectedCertificate.image ? (
                                <Image
                                    src={selectedCertificate.image}
                                    alt={selectedCertificate.title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                                    <Award size={64} className="text-blue-400/50" />
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                                {selectedCertificate.title}
                            </h2>
                            <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 w-fit">
                                {selectedCertificate.category?.name || 'Certificate'}
                            </span>
                        </div>

                        <p className="text-gray-400 text-sm mb-2">
                            Issued by: {selectedCertificate.issuer}
                        </p>

                        <div className="text-xs md:text-sm text-gray-500 mb-4">
                            Issued: {selectedCertificate.issued_formatted}
                            {selectedCertificate.expiry_date && (
                                <span className="ml-2">
                                    • Expires: {selectedCertificate.expiry_formatted}
                                </span>
                            )}
                            {!selectedCertificate.expiry_date && selectedCertificate.is_valid && (
                                <span className="ml-2 text-emerald-400">• Lifetime</span>
                            )}
                        </div>

                        {selectedCertificate.skills && selectedCertificate.skills.length > 0 && (
                            <div className="mb-4">
                                <h3 className="text-sm font-semibold text-white mb-2">Skills Gained</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedCertificate.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-gray-300 border border-white/5"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedCertificate.technologies && selectedCertificate.technologies.length > 0 && (
                            <div className="mb-4">
                                <h3 className="text-sm font-semibold text-white mb-2">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedCertificate.technologies.map((tech) => (
                                        <span
                                            key={tech.id}
                                            className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-gray-300 border border-white/5"
                                        >
                                            {tech.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedCertificate.credential_url && (
                            <a
                                href={selectedCertificate.credential_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors text-blue-400 text-sm mt-2"
                            >
                                Show Credential
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        )}
                    </div>
                )}
            </Modal>
        </>
    );
}