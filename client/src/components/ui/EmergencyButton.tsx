import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Phone, MessageCircle, X, ExternalLink } from 'lucide-react';

export const EmergencyButton = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed bottom-10 right-10 z-50 flex flex-col items-center gap-4"
            >
                <div className="relative group">
                    {/* Multi-layered glow */}
                    <div className="absolute -inset-4 rounded-full bg-accent-emergency/30 blur-2xl animate-pulse"></div>
                    <div className="absolute -inset-1 rounded-full bg-linear-to-tr from-accent-emergency to-orange-500 opacity-60 group-hover:opacity-100 transition-opacity"></div>

                    <button
                        className="relative flex h-20 w-20 items-center justify-center rounded-full bg-obsidian-soft border border-white/20 text-accent-emergency shadow-2xl transition-transform active:scale-90 group-hover:scale-110"
                        onClick={() => setShowModal(true)}
                    >
                        <AlertCircle size={32} fill="currentColor" className="text-obsidian" />
                    </button>

                    {/* Floating Tooltip */}
                    <div className="absolute bottom-[calc(100%+1.5rem)] right-0 whitespace-nowrap rounded-xl bg-accent-emergency px-4 py-2 text-xs font-black text-white shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                        GET IMMEDIATE HELP
                    </div>
                </div>
            </motion.div>

            {/* Emergency Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-6"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-lg rounded-[2.5rem] border border-accent-emergency/20 bg-obsidian-soft p-10 shadow-[0_0_80px_-20px_rgba(255,139,139,0.3)]"
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-6 right-6 h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/40 transition-colors"
                            >
                                <X size={18} />
                            </button>

                            <div className="flex flex-col items-center text-center">
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-emergency/10">
                                    <AlertCircle className="text-accent-emergency" size={32} />
                                </div>
                                <h2 className="text-3xl font-black tracking-tight text-white mb-2">You're Not Alone</h2>
                                <p className="text-white/40 font-medium mb-8">
                                    If you or someone you know is in crisis, please reach out to one of these resources immediately.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <a
                                    href="tel:988"
                                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-white transition-all hover:bg-accent-emergency/10 hover:border-accent-emergency/30 group"
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-emergency/10 group-hover:bg-accent-emergency/20">
                                        <Phone className="text-accent-emergency" size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-sm font-black">988 Suicide & Crisis Lifeline</span>
                                        <span className="block text-xs text-white/40 font-medium">Call or text 988 — Available 24/7</span>
                                    </div>
                                    <ExternalLink className="ml-auto text-white/20 group-hover:text-accent-emergency" size={16} />
                                </a>

                                <a
                                    href="sms:741741?body=HELLO"
                                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-white transition-all hover:bg-safe-400/10 hover:border-safe-400/30 group"
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-safe-400/10 group-hover:bg-safe-400/20">
                                        <MessageCircle className="text-safe-400" size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-sm font-black">Crisis Text Line</span>
                                        <span className="block text-xs text-white/40 font-medium">Text HOME to 741741 — Free & confidential</span>
                                    </div>
                                    <ExternalLink className="ml-auto text-white/20 group-hover:text-safe-400" size={16} />
                                </a>
                            </div>

                            <p className="mt-8 text-center text-[10px] font-bold uppercase tracking-widest text-white/20">
                                Your safety is our top priority
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

