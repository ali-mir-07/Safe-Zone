import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AuthPageProps {
    onSuccess: () => void;
}

export const AuthPage = ({ onSuccess }: AuthPageProps) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (signInError) throw signInError;
                onSuccess();
            } else {
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                        }
                    }
                });
                if (signUpError) throw signUpError;
                setSuccess(true);
                setTimeout(() => setIsLogin(true), 3000);
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-[90vh] flex items-center justify-center px-6 py-20 pointer-events-auto">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full max-h-[600px] pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-glow/5 blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-safe-400/5 blur-[100px] animate-pulse [animation-delay:1s]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-md overflow-hidden"
            >
                {/* Auth Card */}
                <div className="glass rounded-[2.5rem] p-10 shadow-2xl relative z-10">
                    <div className="flex flex-col items-center mb-10">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-accent-glow to-safe-500 shadow-lg shadow-accent-glow/20 mb-6"
                        >
                            <Shield className="text-obsidian" size={32} fill="currentColor" />
                        </motion.div>
                        <h1 className="text-4xl font-black tracking-tight text-white mb-2">
                            {isLogin ? 'Welcome Back' : 'Join SafeZone'}
                        </h1>
                        <p className="text-white/40 font-medium text-center">
                            {isLogin
                                ? 'Your sanctuary is waiting for you.'
                                : 'Start your journey towards mental peace.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AnimatePresence mode="wait">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-2"
                                >
                                    <label className="text-xs font-black uppercase tracking-widest text-white/30 ml-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                        <input
                                            required
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="John Doe"
                                            className="w-full rounded-2xl bg-white/5 border border-white/10 px-12 py-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-accent-glow transition-all"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-white/30 ml-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-12 py-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-accent-glow transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-white/30 ml-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                <input
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-12 py-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-accent-glow transition-all"
                                />
                            </div>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-3 rounded-2xl bg-accent-emergency/10 border border-accent-emergency/20 p-4 text-accent-emergency text-sm font-bold"
                                >
                                    <AlertCircle size={18} />
                                    {error}
                                </motion.div>
                            )}
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-3 rounded-2xl bg-safe-400/10 border border-safe-400/20 p-4 text-safe-400 text-sm font-bold"
                                >
                                    <CheckCircle2 size={18} />
                                    Verification email sent. Please check your inbox.
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-white py-4 text-sm font-black text-obsidian transition-all hover:bg-accent-glow hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100"
                        >
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            {loading ? 'PROCESSING...' : (isLogin ? 'SIGN IN' : 'CREATE ACCOUNT')}
                            {!loading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError(null);
                                setSuccess(false);
                            }}
                            className="text-sm font-bold text-white/40 hover:text-white transition-colors"
                        >
                            {isLogin
                                ? "Don't have an account? "
                                : "Already have an account? "}
                            <span className="text-accent-glow">
                                {isLogin ? 'Sign Up' : 'Log In'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-glow/10 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-safe-500/10 rounded-full blur-3xl -z-10"></div>
            </motion.div>
        </div>
    );
};
