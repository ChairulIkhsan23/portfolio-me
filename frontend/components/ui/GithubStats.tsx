'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { Star } from 'lucide-react';
import { GrAnnounce } from "react-icons/gr";

interface GithubStatsProps {
    username: string;
}

export default function GithubStats({ username }: GithubStatsProps) {
    const [stats, setStats] = useState({
        public_repos: 0,
        followers: 0,
        following: 0,
    });
    const [loading, setLoading] = useState(true);
    const [totalContributions, setTotalContributions] = useState(0);

    useEffect(() => {
        fetch(`https://api.github.com/users/${username}`)
            .then(res => res.json())
            .then(data => {
                setStats({
                    public_repos: data.public_repos || 0,
                    followers: data.followers || 0,
                    following: data.following || 0,
                });
            })
            .catch(() => { });

        fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=2025`)
            .then(res => res.json())
            .then(data => {
                if (data.contributions) {
                    const total = Object.values(data.contributions).reduce((sum: number, info: any) => sum + info.count, 0);
                    setTotalContributions(total);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [username]);

    if (loading) {
        return (
            <div className="bg-white/5 rounded-xl p-4">
                <div className="flex justify-center py-3">
                    <div className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-all duration-300"
        >
            <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <FaGithub size={16} className="text-blue-400" />
                </div>
                <span className="text-white text-sm font-medium">GitHub</span>
                <span className="text-gray-500 text-xs">@{username}</span>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <div>
                        <div className="text-lg font-bold text-white">{stats.public_repos}</div>
                        <div className="text-gray-500 text-xs">Repos</div>
                    </div>
                    <div>
                        <div className="text-lg font-bold text-white">{stats.followers}</div>
                        <div className="text-gray-500 text-xs">Followers</div>
                    </div>
                    <div>
                        <div className="text-lg font-bold text-white">{stats.following}</div>
                        <div className="text-gray-500 text-xs">Following</div>
                    </div>
                    <div>
                        <div className="text-lg font-bold text-white">{totalContributions}</div>
                        <div className="text-gray-500 text-xs">Contribs</div>
                    </div>
                </div>
                <a
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-400 transition"
                >
                    <GrAnnounce size={20} />
                </a>
            </div>
        </motion.div>
    );
}