import { useEffect, useState } from 'react';

export function useScrollSpy(sections: string[], offset = 100) {
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (ticking) return;

            ticking = true;

            requestAnimationFrame(() => {
                const scrollPosition = window.scrollY + offset;

                for (const section of sections) {
                    if (!section || typeof section !== 'string') continue;
                    if (!section.startsWith('#')) continue;
                    if (section === '#') continue;

                    const element = document.querySelector(section);
                    if (!element) continue;

                    const { offsetTop, offsetHeight } = element as HTMLElement;

                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(section);
                        break;
                    }
                }

                ticking = false;
            });
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections, offset]);

    return activeSection;
}