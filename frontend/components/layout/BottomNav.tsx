'use client';

import Link from 'next/link';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { HiOutlineHome } from 'react-icons/hi';
import { HiOutlineFolder } from 'react-icons/hi';
import { HiOutlineBriefcase } from 'react-icons/hi';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { HiOutlineMail } from 'react-icons/hi';

const navigation = [
    { name: 'Home', href: '#home', icon: HiOutlineHome },
    { name: 'Projects', href: '#projects', icon: HiOutlineFolder },
    { name: 'Journey', href: '#journey', icon: HiOutlineBriefcase },
    { name: 'Certificates', href: '#certificates', icon: HiOutlineDocumentText },
    { name: 'Contact', href: '#contact', icon: HiOutlineMail },
];

export default function BottomNav() {
    const sections = ['#home', '#projects', '#journey', '#certificates', '#contact'];
    const activeSection = useScrollSpy(sections, 100);

    const isActive = (href: string) => {
        return activeSection === href;
    };

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/10 dark:bg-gray-900/20 backdrop-blur-xl border-t border-white/10 dark:border-white/5 md:hidden z-50">
            <div className="flex justify-around items-center h-16">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className={`flex flex-col items-center gap-1 transition-all duration-300 ${active
                                ? 'text-white opacity-100'
                                : 'text-white/40 hover:text-white/80'
                                }`}
                        >
                            <Icon className="text-2xl" />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}