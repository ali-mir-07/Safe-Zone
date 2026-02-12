import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const FloatingShape = ({
    className,
    delay = 0,
    duration = 10,
    rotate = 0
}: {
    className?: string;
    delay?: number;
    duration?: number;
    rotate?: number;
}) => {
    return (
        <motion.div
            initial={{ y: 0, rotate: rotate }}
            animate={{
                y: [0, -20, 0],
                rotate: [rotate, rotate + 5, rotate - 5, rotate],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
            }}
            className={`absolute rounded-full pointer-events-none opacity-20 blur-xl ${className}`}
        />
    );
};

export const ModernHero = ({ onNavigate }: { onNavigate: (v: 'home' | 'mood' | 'demo' | 'auth') => void }) => {
    return (
        <section className="relative min-h-[110vh] w-full flex flex-col items-center justify-center overflow-hidden bg-obsidian-deep px-6 pt-20">
            {/* Background Shapes - More organic and weightless */}
            <div className="absolute inset-0 z-0">
                <FloatingShape
                    className="w-[600px] h-[150px] bg-linear-to-r from-safe-200/10 to-accent-soft/10 -top-20 -left-40 blur-3xl"
                    rotate={-15}
                    duration={25}
                />
                <FloatingShape
                    className="w-[400px] h-[100px] bg-linear-to-r from-accent-glow/10 to-safe-300/10 top-60 right-0 blur-3xl"
                    rotate={25}
                    delay={4}
                    duration={20}
                />
                <FloatingShape
                    className="w-[700px] h-[200px] bg-linear-to-r from-safe-100/5 to-accent-soft/5 bottom-20 -left-60 blur-3xl"
                    rotate={-5}
                    delay={8}
                    duration={30}
                />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 max-w-5xl mx-auto text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="inline-flex items-center gap-3 rounded-full border border-white/5 bg-white/2 px-5 py-2 backdrop-blur-2xl mb-16"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safe-300 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-safe-400"></span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-safe-200/40">Zen Sanctuary</span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.9] tracking-tighter text-white mb-10"
                >
                    Elevate Your <br />
                    <span className="bg-linear-to-r from-safe-200 via-white to-accent-soft bg-clip-text text-transparent italic">
                        Mental Peace
                    </span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                    className="mx-auto max-w-2xl text-xl md:text-2xl font-medium text-safe-100/30 leading-relaxed mb-16"
                >
                    Breathe deeply. Your safe space for healing,
                    connection, and quiet reflection.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.9 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <button
                        onClick={() => onNavigate('mood')}
                        className="group relative rounded-2xl bg-white px-10 py-5 text-xl font-black text-obsidian transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_-10px_rgba(201,223,213,0.3)]"
                    >
                        <span className="flex items-center gap-2">
                            BEGIN JOURNEY
                            <Sparkles className="text-safe-400 group-hover:scale-125 transition-transform" size={24} fill="currentColor" />
                        </span>
                    </button>
                    <button
                        onClick={() => document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' })}
                        className="rounded-2xl border border-white/10 bg-white/3 px-10 py-5 text-xl font-bold text-white backdrop-blur-md transition-all hover:bg-white/5"
                    >
                        DISCOVER SAFE ZONE
                    </button>
                </motion.div>
            </div>

            {/* Bottom Gradient Fade - Bridging the gap */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-obsidian-deep to-transparent z-20 pointer-events-none"></div>
        </section>
    );
};
