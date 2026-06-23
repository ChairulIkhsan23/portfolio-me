'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Category {
    id: number;
    name: string;
}

interface FilterDropdownProps {
    categories: Category[];
    selectedCategory: number | null;
    onSelect: (categoryId: number | null) => void;
    placeholder?: string;
    className?: string;
}

export default function FilterDropdown({
    categories,
    selectedCategory,
    onSelect,
    placeholder = 'All Categories',
    className = '',
}: FilterDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const getSelectedLabel = () => {
        if (selectedCategory === null) return placeholder;
        const found = categories.find(c => c.id === selectedCategory);
        return found?.name || placeholder;
    };

    const handleSelect = (categoryId: number | null) => {
        onSelect(categoryId);
        setIsOpen(false);
    };

    return (
        <div className={`relative inline-block ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors text-sm min-w-[160px] justify-between"
            >
                <span>{getSelectedLabel()}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full left-0 mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
                        <button
                            onClick={() => handleSelect(null)}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors ${selectedCategory === null
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            {placeholder}
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleSelect(cat.id)}
                                className={`w-full text-left px-4 py-2 text-sm transition-colors ${selectedCategory === cat.id
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}