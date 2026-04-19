// components/home/Certificates.tsx
'use client';

import { useCertificates } from '@/hooks/useCertificates';
import CertificateItem from '@/components/ui/CertificateItem';
import { Award } from 'lucide-react';

export default function Certificates() {
    const { certificates, loading, error } = useCertificates();

    if (loading) {
        return (
            <div className="flex justify-center items-center py-16">
                <div className="w-6 h-6 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-400 py-16 text-sm">
                Failed to load certificates
            </div>
        );
    }

    if (certificates.length === 0) {
        return (
            <div className="text-center text-gray-500 py-16 text-sm">
                No certificates yet.
            </div>
        );
    }

    return (
        <section className="py-20">
            <div className="container mx-auto px-6 md:px-16">
                {/* Section Title */}
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