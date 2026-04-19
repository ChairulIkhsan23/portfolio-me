'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

export default function CurrentTime() {
    const [time, setTime] = useState(new Date());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    if (!mounted) return null;

    const formattedTime = time.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    const formattedDate = time.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
                <Clock size={14} className="text-blue-400" />
                <span className="text-white text-xs font-medium">Local Time</span>
            </div>
            <div className="font-mono">
                <div className="text-2xl font-bold text-white tracking-wider">
                    {formattedTime}
                </div>
                <div className="text-gray-500 text-[10px] mt-1">
                    {formattedDate}
                </div>
            </div>
            <div className="mt-2 pt-2 border-t border-white/10">
                <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-gray-500 text-[9px]">UTC+7 (WIB)</span>
                </div>
            </div>
        </div>
    );
}