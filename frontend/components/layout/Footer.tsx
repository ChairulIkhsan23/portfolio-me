'use client';

import { SiNextdotjs } from 'react-icons/si';
import { SiLaravel } from 'react-icons/si';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black border-t border-white/10 py-6">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center gap-2">
                    {/* Copyright dengan font Playwrite */}
                    <p className="text-white/50 text-sm text-center">
                        Copyright &copy; {currentYear}{' '}
                        Chairul Ikhsan. All rights reserved.
                    </p>

                    {/* Next.js Icon */}
                    <SiNextdotjs className="text-white/30 text-lg" />
                    <SiLaravel className="text-white/30 text-lg" />
                </div>
            </div>
        </footer>
    );
}