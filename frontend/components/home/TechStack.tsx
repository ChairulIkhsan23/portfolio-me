'use client';

import LogoLoop from '@/components/LogoLoop';
import { techStack } from '@/constants/techStack';
import { LogoItem } from '@/components/LogoLoop';

export default function TechStack() {
    // Konversi tech stack ke format LogoItem
    const logos: LogoItem[] = techStack.map((tech) => ({
        node: <tech.icon size={48} className="text-white/70" />,
        title: tech.name,
        ariaLabel: tech.name,
    }));

    return (
        <section className="py-16 overflow-hidden">
            <div className="container mx-auto px-6 md:px-16">
                <LogoLoop
                    logos={logos}
                    speed={60}
                    direction="right"
                    logoHeight={48}
                    gap={32}
                    pauseOnHover={true}
                    hoverSpeed={20}
                    scaleOnHover={true}
                    fadeOut={true}
                    fadeOutColor="#000000"
                    className="py-4"
                />
            </div>
        </section>
    );
}