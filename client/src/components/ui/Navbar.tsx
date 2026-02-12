import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Shield, Menu, X, ChevronRight, LogOut } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

interface NavbarProps {
    onNavigate: (v: 'home' | 'mood' | 'excellence' | 'community' | 'about' | 'auth') => void;
    user?: User | null;
    onSignOut?: () => void;
}

export const Navbar = ({ onNavigate, user, onSignOut }: NavbarProps) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Support', view: 'home' as const, scrollTo: 'support' },
        { name: 'Journal', view: 'mood' as const },
        { name: 'Excellence', view: 'excellence' as const },
        { name: 'Community', view: 'community' as const },
        { name: 'About', view: 'about' as const }
    ];




    const handleNavClick = (item: typeof navItems[number]) => {
        onNavigate(item.view);
        if (item.scrollTo) {
            setTimeout(() => {
                document.getElementById(item.scrollTo!)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}>
            <div className="container mx-auto px-6">
                <div className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-6 py-3 transition-all duration-500 ${scrolled ? 'border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl' : 'border-transparent bg-transparent'}`}>

                    {/* Logo */}
                    <motion.div
                        onClick={() => onNavigate('home')}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex cursor-pointer items-center gap-2 group"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-accent-glow to-safe-500 shadow-lg shadow-accent-glow/20 transition-transform group-hover:scale-110">
                            <Shield className="text-obsidian" size={24} fill="currentColor" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-white">
                            SAFE<span className="text-accent-glow group-hover:text-white transition-colors">ZONE</span>
                        </span>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden items-center gap-8 md:flex">
                        {navItems.map((item, i) => (
                            <motion.button
                                key={item.name}
                                onClick={() => handleNavClick(item)}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative text-sm font-bold uppercase tracking-widest text-white/70 transition-colors hover:text-white"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent-glow transition-all group-hover:w-full"></span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <motion.button
                                onClick={onSignOut}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="hidden items-center gap-2 rounded-xl bg-white/10 border border-white/10 px-6 py-2.5 text-sm font-black text-white transition-all hover:bg-accent-emergency/20 hover:border-accent-emergency/30 hover:scale-105 active:scale-95 md:flex"
                            >
                                SIGN OUT
                                <LogOut size={16} />
                            </motion.button>
                        ) : (
                            <motion.button
                                onClick={() => onNavigate('auth')}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="hidden items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-sm font-black text-obsidian transition-all hover:bg-accent-glow hover:scale-105 active:scale-95 md:flex"
                            >
                                SIGN IN
                                <ChevronRight size={16} />
                            </motion.button>
                        )}

                        <button
                            className="text-white md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden bg-black/95 backdrop-blur-2xl md:hidden"
                    >
                        <div className="flex flex-col gap-4 p-8">
                            {navItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        handleNavClick(item);
                                        setMobileMenuOpen(false);
                                    }}
                                    className="text-left text-2xl font-black text-white hover:text-accent-glow"
                                >
                                    {item.name}
                                </button>
                            ))}
                            {user ? (
                                <button
                                    onClick={() => {
                                        onSignOut?.();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="mt-4 rounded-xl bg-white/10 border border-white/10 p-4 font-black text-white active:scale-95 transition-all"
                                >
                                    SIGN OUT
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        onNavigate('auth');
                                        setMobileMenuOpen(false);
                                    }}
                                    className="mt-4 rounded-xl bg-white p-4 font-black text-black active:scale-95 transition-all"
                                >
                                    SIGN IN
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

