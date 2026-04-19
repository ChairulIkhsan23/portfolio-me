'use client';

import { useState } from 'react';
import { sendMessage } from '@/lib/api';
import { MessageForm } from '@/types';
import { MapPin } from 'lucide-react';
import ModalMessage from '@/components/ui/ModalMessage';
import { Loader2, Send } from 'lucide-react';
import GithubStats from '../ui/GithubStats';
import CurrentTime from '../ui/CurrentTime';
import DailyQuote from '../ui/DailyQuote';

export default function ContactForm() {
    const [formData, setFormData] = useState<MessageForm>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'success' | 'error'>('success');
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await sendMessage(formData);
            setStatus('success');
            setModalType('success');
            setModalTitle('Message Sent!');
            setModalMessage('Thank you for reaching out. I will get back to you soon.');
            setModalOpen(true);

            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });

            setTimeout(() => setStatus('idle'), 500);
        } catch (error) {
            setStatus('error');
            setModalType('error');
            setModalTitle('Failed to Send');
            setModalMessage('Something went wrong. Please try again later.');
            setModalOpen(true);
            setTimeout(() => setStatus('idle'), 500);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">

                    {/* LEFT SIDE */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
                                Let's talk
                            </h2>
                            <p className="text-white/70 text-sm md:text-base leading-relaxed">
                                Punya pertanyaan atau proyek yang ingin dikerjakan? Saya terbuka untuk kolaborasi dan diskusi.
                            </p>
                        </div>

                        <div className="flex items-start gap-3">
                            <MapPin size={20} className="text-blue-400 mt-0.5" />
                            <div>
                                <h3 className="text-white font-medium text-sm">Location</h3>
                                <p className="text-white/60 text-sm">Majalengka, Jawa Barat</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <GithubStats username="ChairulIkhsan23" />
                            <DailyQuote />
                            <CurrentTime />
                        </div>
                    </div>

                    {/* RIGHT SIDE - FORM */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-white/80 text-sm mb-1.5">
                                    Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all duration-300"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-white/80 text-sm mb-1.5">
                                    Email <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all duration-300"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-white/80 text-sm mb-1.5">
                                    Phone <span className="text-white/40 text-xs">(Optional)</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all duration-300"
                                    placeholder="+62 123 4567 890"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-white/80 text-sm mb-1.5">
                                    Subject <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all duration-300"
                                    placeholder="What is this about?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-white/80 text-sm mb-1.5">
                                    Message <span className="text-red-400">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all duration-300 resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="relative w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group shadow-lg hover:shadow-xl mt-2"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                                {status === 'loading' ? (
                                    <span className="flex items-center justify-center gap-2 relative z-10">
                                        <Loader2 size={18} className="animate-spin" />
                                        <span>Sending...</span>
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2 relative z-10">
                                        <span>Send Message</span>
                                        <Send size={16} className="group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal Message */}
            <ModalMessage
                isOpen={modalOpen}
                onClose={closeModal}
                type={modalType}
                title={modalTitle}
                message={modalMessage}
            />
        </>
    );
}