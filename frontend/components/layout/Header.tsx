'use client';

import Link from 'next/link';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { navigation } from '@/constants/navigation';

export default function Header() {
    const sections = ['#home', '#projects', '#journey', '#certificates', '#contact'];
    const activeSection = useScrollSpy(sections, 100);

    const isActive = (href: string) => {
        if (href === '/') return activeSection === '#home';
        return activeSection === href;
    };

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 hidden md:flex justify-center py-4">
            <nav className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-xl rounded-full px-6 py-2 shadow-lg border border-white/10 dark:border-white/5">
                <div className="flex items-center gap-0.5 md:gap-1">
                    {navigation.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className={`relative flex items-center gap-2 px-4 py-2 text-base font-medium rounded-full transition-opacity duration-300 ease-out ${active
                                    ? 'text-white opacity-100'
                                    : 'text-white opacity-50 hover:opacity-80'
                                    }`}
                            >
                                <span className="relative w-3 h-3 flex items-center justify-center">
                                    <span
                                        className={`absolute w-2 h-2 bg-lime-300 rounded-full transition-all duration-500 ease-out ${active ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                                            }`}
                                    />
                                </span>
                                <span className="inline-block">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </header>
    );
}