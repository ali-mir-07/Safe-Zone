import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Bot, User } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { API_BASE_URL } from '../../lib/api';

export const AIChatBubble = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);

        try {
            // Attempt to get auth token if user is signed in
            const { data: { session } } = await supabase.auth.getSession();
            const headers: Record<string, string> = { 'Content-Type': 'application/json' };

            if (session?.access_token) {
                headers['Authorization'] = `Bearer ${session.access_token}`;
            }

            const response = await fetch(`${API_BASE_URL}/api/ai/chat`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ message: userMsg }),
            });

            if (!response.ok) throw new Error('Failed to fetch');

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'ai', text: data.response }]);
        } catch (error) {
            console.error('Chat Error:', error);
            setMessages(prev => [...prev, { role: 'ai', text: "I'm here with you. Something went wrong with my connection, but let's take a slow breath together while I try to reconnect." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="absolute bottom-20 left-0 h-[500px] w-[380px] flex flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/60 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between bg-white/3 px-6 py-5 border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-safe-400/10 text-safe-400">
                                    <Sparkles size={20} fill="currentColor" />
                                </div>
                                <div>
                                    <span className="block font-black text-white text-sm tracking-tight">AI SANCTUARY</span>
                                    <span className="block text-[10px] font-bold text-safe-400 uppercase tracking-widest">Always Listening</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/40 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
                            {messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                                    <div className="h-16 w-16 rounded-3xl bg-white/5 flex items-center justify-center text-white/20">
                                        <Bot size={32} />
                                    </div>
                                    <p className="text-sm font-medium text-white/40 max-w-[200px]">How are you feeling today? I'm here to support you anonymously.</p>
                                </div>
                            )}
                            {messages.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex items-end gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/20 border border-white/5 ${m.role === 'user' ? 'bg-safe-400/20' : 'bg-white/5'}`}>
                                        {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                    </div>
                                    <div className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm font-medium leading-relaxed ${m.role === 'user'
                                        ? 'bg-safe-400 text-obsidian rounded-br-none shadow-lg'
                                        : 'bg-white/5 text-white/80 rounded-bl-none border border-white/5'
                                        }`}>
                                        {m.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/20">
                                        <Bot size={14} />
                                    </div>
                                    <div className="flex gap-1.5 px-4 py-3 rounded-2xl bg-white/5 border border-white/5">
                                        <span className="h-1.5 w-1.5 rounded-full bg-safe-400 animate-bounce"></span>
                                        <span className="h-1.5 w-1.5 rounded-full bg-safe-400 animate-bounce [animation-delay:0.2s]"></span>
                                        <span className="h-1.5 w-1.5 rounded-full bg-safe-400 animate-bounce [animation-delay:0.4s]"></span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-white/2 border-t border-white/5">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Tell me what's on your mind..."
                                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4 pr-14 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-safe-400 transition-all"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={isLoading}
                                    className="absolute right-2 top-2 h-10 w-10 flex items-center justify-center rounded-xl bg-safe-400 text-obsidian transition-all hover:scale-105 disabled:opacity-50 disabled:scale-100 shadow-lg"
                                >
                                    <Send size={18} fill="currentColor" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-20 w-20 items-center justify-center rounded-4xl bg-safe-400 text-obsidian shadow-[0_20px_40px_-10px_rgba(126,176,154,0.5)] transition-transform z-50 overflow-hidden relative group"
            >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                {isOpen ? <X size={32} strokeWidth={3} /> : <MessageCircle size={32} strokeWidth={3} fill="currentColor" />}
            </motion.button>
        </div>
    );
};
