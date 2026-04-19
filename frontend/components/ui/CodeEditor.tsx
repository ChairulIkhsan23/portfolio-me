'use client';

import { motion } from 'framer-motion';

export default function CodeEditor() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
        >
            <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />

            <div className="relative bg-[#1e1e2e] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                {/* Window Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#181825] border-b border-white/10">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 text-center text-xs text-gray-500 font-mono">portfolio.tsx</div>
                    <div className="w-16" />
                </div>

                {/* Code Content */}
                <div className="p-5 font-mono text-sm">
                    <div className="flex items-start gap-3">
                        <span className="text-gray-600 select-none w-6">1</span>
                        <div>
                            <span className="text-purple-400">import</span>
                            <span className="text-white"> {'{'} </span>
                            <span className="text-blue-400">Project</span>
                            <span className="text-white">, </span>
                            <span className="text-blue-400">TechStack</span>
                            <span className="text-white"> {'}'} </span>
                            <span className="text-purple-400">from</span>
                            <span className="text-green-400"> &apos;@/types&apos;</span>
                        </div>
                    </div>

                    <div className="h-2" />

                    <div className="flex items-start gap-3">
                        <span className="text-gray-600 select-none w-6">2</span>
                        <div>
                            <span className="text-purple-400">import</span>
                            <span className="text-white"> {'{'} </span>
                            <span className="text-blue-400">useProjects</span>
                            <span className="text-white"> {'}'} </span>
                            <span className="text-purple-400">from</span>
                            <span className="text-green-400"> &apos;@/hooks/useProjects&apos;</span>
                        </div>
                    </div>

                    <div className="h-2" />

                    <div className="flex items-start gap-3">
                        <span className="text-gray-600 select-none w-6">3</span>
                        <div>
                            <span className="text-purple-400">export default</span>
                            <span className="text-yellow-400"> function</span>
                            <span className="text-yellow-400"> Portfolio</span>
                            <span className="text-white">() {'{'}</span>
                        </div>
                    </div>

                    <div className="h-1" />

                    <div className="flex items-start gap-3 ml-6">
                        <span className="text-gray-600 select-none w-6">4</span>
                        <div>
                            <span className="text-purple-400">const</span>
                            <span className="text-white"> projects </span>
                            <span className="text-white">= </span>
                            <span className="text-yellow-400">useProjects</span>
                            <span className="text-white">()</span>
                        </div>
                    </div>

                    <div className="h-1" />

                    <div className="flex items-start gap-3 ml-6">
                        <span className="text-gray-600 select-none w-6">5</span>
                        <div>
                            <span className="text-purple-400">const</span>
                            <span className="text-white"> loading </span>
                            <span className="text-white">= </span>
                            <span className="text-yellow-400">true</span>
                        </div>
                    </div>

                    <div className="h-2" />

                    <div className="flex items-start gap-3">
                        <span className="text-gray-600 select-none w-6">6</span>
                        <div>
                            <span className="text-purple-400">if</span>
                            <span className="text-white"> (loading) {'{'}</span>
                        </div>
                    </div>

                    <div className="h-1" />

                    <div className="flex items-start gap-3 ml-6">
                        <span className="text-gray-600 select-none w-6">7</span>
                        <div>
                            <span className="text-purple-400">return</span>
                            <span className="text-green-400"> &lt;Loading /&gt;</span>
                        </div>
                    </div>

                    <div className="h-1" />

                    <div className="flex items-start gap-3">
                        <span className="text-gray-600 select-none w-6">8</span>
                        <div>
                            <span className="text-white">{'}'}</span>
                        </div>
                    </div>

                    <div className="h-2" />

                    {/* Blinking cursor */}
                    <div className="flex items-start gap-3 mt-2">
                        <span className="text-gray-600 select-none w-6">9</span>
                        <div className="w-2.5 h-5 bg-purple-400 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-500/20 rounded-full blur-xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl -z-10" />
        </motion.div>
    );
}