// components/home/Journey.tsx
'use client';

import { useExperiences } from '@/hooks/useExperiences';
import { useEducations } from '@/hooks/useEducations';
import ExperienceItem from '@/components/ui/ExperienceItem';
import EducationItem from '@/components/ui/EducationItem';
import { Briefcase, GraduationCap } from 'lucide-react';

export default function Journey() {
    const { experiences, loading: expLoading, error: expError } = useExperiences();
    const { educations, loading: eduLoading, error: eduError } = useEducations();

    if (expLoading || eduLoading) {
        return (
            <div className="flex justify-center items-center py-16">
                <div className="w-6 h-6 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
            </div>
        );
    }

    if (expError || eduError) {
        return (
            <div className="text-center text-red-400 py-16 text-sm">
                Failed to load journey data
            </div>
        );
    }

    return (
        <section className="py-20">
            <div className="container mx-auto px-6 md:px-16">
                {/* Section Title */}
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        My Journey
                    </h2>
                    <p className="text-gray-400 text-base max-w-2xl mx-auto">
                        My professional experience and educational background
                    </p>
                </div>

                {/* Grid 2 kolom */}
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16">

                    {/* LEFT COLUMN - Experience */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <Briefcase className="text-blue-400" size={24} />
                            <h3 className="text-2xl font-semibold text-white">Work Experience</h3>
                        </div>

                        <div className="space-y-8">
                            {experiences.length === 0 ? (
                                <p className="text-gray-500 text-sm">No work experience yet.</p>
                            ) : (
                                experiences.map((exp, index) => (
                                    <ExperienceItem key={exp.id} experience={exp} index={index} />
                                ))
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN - Education */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <GraduationCap className="text-blue-400" size={24} />
                            <h3 className="text-2xl font-semibold text-white">Education</h3>
                        </div>

                        <div className="space-y-8">
                            {educations.length === 0 ? (
                                <p className="text-gray-500 text-sm">No education yet.</p>
                            ) : (
                                educations.map((edu, index) => (
                                    <EducationItem key={edu.id} education={edu} index={index} />
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}