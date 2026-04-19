'use client';

import { useEffect, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { text: "The best error message is the one that never shows up.", author: "Unknown" },
];

export default function DailyQuote() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Pilih quote berdasarkan tanggal untuk default
    useEffect(() => {
        const today = new Date().toDateString();
        const storedDate = localStorage.getItem('quoteDate');
        const storedIndex = localStorage.getItem('quoteIndex');

        if (storedDate === today && storedIndex !== null) {
            setCurrentIndex(parseInt(storedIndex));
        } else {
            const random = Math.floor(Math.random() * quotes.length);
            setCurrentIndex(random);
            localStorage.setItem('quoteDate', today);
            localStorage.setItem('quoteIndex', random.toString());
        }
    }, []);

    const nextQuote = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
        setTimeout(() => setIsAnimating(false), 300);
    };

    const prevQuote = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
        setTimeout(() => setIsAnimating(false), 300);
    };

    const currentQuote = quotes[currentIndex];

    return (
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Quote size={14} className="text-blue-400" />
                    <span className="text-white/60 text-xs">Quote of the day</span>
                </div>
                <div className="flex gap-1">
                    <button
                        onClick={prevQuote}
                        className="p-1 rounded-md hover:bg-white/10 transition-colors"
                        aria-label="Previous quote"
                    >
                        <ChevronLeft size={14} className="text-gray-400 hover:text-white" />
                    </button>
                    <button
                        onClick={nextQuote}
                        className="p-1 rounded-md hover:bg-white/10 transition-colors"
                        aria-label="Next quote"
                    >
                        <ChevronRight size={14} className="text-gray-400 hover:text-white" />
                    </button>
                </div>
            </div>

            <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
                <div className="flex gap-2 items-start">
                    <Quote size={12} className="text-blue-400/50 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-white/70 text-xs italic leading-relaxed">
                            "{currentQuote.text}"
                        </p>
                        <p className="text-gray-500 text-[10px] mt-2">
                            — {currentQuote.author}
                        </p>
                    </div>
                </div>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-1 mt-3">
                {quotes.slice(0, 5).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            if (isAnimating) return;
                            setIsAnimating(true);
                            setCurrentIndex(idx);
                            setTimeout(() => setIsAnimating(false), 300);
                        }}
                        className={`h-1 rounded-full transition-all duration-300 ${currentIndex === idx
                            ? 'w-4 bg-blue-400'
                            : 'w-1 bg-gray-600 hover:bg-gray-500'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}