'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Headphones, Music } from 'lucide-react';

interface NowPlayingProps {
    spotifyId?: string;
}

export default function NowPlaying({ spotifyId = 'chairulikhsan23' }: NowPlayingProps) {
    const [track, setTrack] = useState<{ title: string; artist: string; isPlaying: boolean } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch from Spotify API (you need backend proxy or use public API)
        // This is a mock - replace with actual API call
        fetch(`https://api.lanyard.rest/v1/users/218764258249277440`) // Discord presence as example
            .then(res => res.json())
            .then(data => {
                if (data.data?.spotify) {
                    setTrack({
                        title: data.data.spotify.song,
                        artist: data.data.spotify.artist,
                        isPlaying: true,
                    });
                }
                setLoading(false);
            })
            .catch(() => {
                // Mock data for demo
                setTrack({
                    title: "Listening to music",
                    artist: "Spotify",
                    isPlaying: true,
                });
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="bg-white/5 rounded-xl p-3">
                <div className="flex justify-center py-2">
                    <div className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/5 rounded-xl p-3 border border-white/10 hover:border-blue-500/30 transition-all duration-300"
        >
            <div className="flex items-center gap-2 mb-2">
                <Headphones size={14} className="text-green-400" />
                <span className="text-white text-xs font-medium">Now Playing</span>
            </div>

            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Music size={12} className="text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium truncate">{track?.title || "Not playing"}</p>
                    <p className="text-gray-500 text-[10px] truncate">{track?.artist || "Spotify"}</p>
                </div>
                {track?.isPlaying && (
                    <div className="flex gap-0.5">
                        <span className="w-1 h-3 bg-green-400 animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1 h-4 bg-green-400 animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1 h-2 bg-green-400 animate-bounce" />
                    </div>
                )}
            </div>
        </motion.div>
    );
}