import { motion } from 'framer-motion';

import { Shield, Users, Brain, Heart, Sparkles, ChevronDown } from 'lucide-react';
import { BackgroundPaths } from '../components/ui/background-paths';

export const Excellences = ({ onNavigate }: { onNavigate: (v: 'home' | 'mood' | 'excellence' | 'community' | 'about' | 'auth') => void }) => {

    const excellences = [
        {
            icon: <Shield className="text-accent-glow" size={32} />,
            title: "Absolute Anonymity",
            description: "Your identity is a sacred boundary. We ensure zero trackability and total privacy, allowing you to speak your truth without fear of judgment or exposure."
        },
        {
            icon: <Users className="text-safe-400" size={32} />,
            title: "Peer Synergy",
            description: "Connect with real people who have walked your path. Our matching system pairs you with peers who share your lived experiences for authentic, reciprocal healing."
        },
        {
            icon: <Brain className="text-accent-soft" size={32} />,
            title: "Zen AI Resilience",
            description: "Meet 'Zen', our proprietary de-escalation engine. 24/7 intelligent presence built on therapeutic principles, providing immediate support when humans are unavailable."
        },
        {
            icon: <Heart className="text-accent-emergency" size={32} />,
            title: "Clinical Integrity",
            description: "SafeZone isn't just a chat; it's an evidence-based sanctuary. Every interaction follows protocols designed by mental health professionals for maximum safety."
        }
    ];

    return (
        <div className="relative min-h-screen bg-obsidian-deep overflow-x-hidden">
            {/* Hero Section using BackgroundPaths */}
            <section className="relative h-screen flex items-center justify-center">
                <BackgroundPaths title="THE SAFEZONE EXCELLENCE" />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Discover Our Mission</span>
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <ChevronDown size={20} />
                    </motion.div>
                </motion.div>
            </section>

            {/* Mission Section */}
            <section className="relative z-10 py-32 px-6">
                <div className="container mx-auto max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="text-center space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full bg-accent-glow/10 px-4 py-1.5 border border-accent-glow/20">
                            <Sparkles size={14} className="text-accent-glow" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-glow">Our Genesis</span>
                        </div>
                        <h2 className="text-6xl md:text-7xl font-black tracking-tighter text-white uppercase italic">
                            WHY <span className="text-accent-glow">SAFEZONE?</span>
                        </h2>
                        <p className="text-2xl md:text-3xl font-medium text-white/50 leading-tight">
                            "Bridging the critical gap in immediate, empathetic mental health support."
                        </p>
                        <div className="h-px w-24 bg-accent-glow/30 mx-auto mt-12" />
                        <p className="max-w-3xl mx-auto text-xl text-white/40 leading-relaxed pt-8">
                            SafeZone was developed to be more than just a platform; it is a digital sanctuary born from the realization that clinical support is often too far, and isolation is far too near. We created a space where human empathy and ethical AI converge to ensure no one has to navigate their darkest hours alone.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Excellences Grid */}
            <section className="relative z-10 py-32 px-6 bg-white/2 backdrop-blur-3xl border-y border-white/5">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {excellences.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group p-8 rounded-[2.5rem] bg-white/3 border border-white/5 hover:bg-white/5 transition-all duration-500"
                            >
                                <div className="mb-6 h-16 w-16 flex items-center justify-center rounded-2xl bg-white/5 group-hover:bg-accent-glow group-hover:scale-110 transition-all duration-500">
                                    <div className="group-hover:text-obsidian transition-colors duration-500">
                                        {item.icon}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-white/40 leading-relaxed font-medium group-hover:text-white/60 transition-colors">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Footer */}
            <section className="relative py-40 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="space-y-12"
                >
                    <h3 className="text-5xl font-black text-white italic tracking-tighter">THE FUTURE OF HEALING IS <span className="text-accent-glow">ANONYMOUS.</span></h3>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button
                            onClick={() => onNavigate('auth')}
                            className="px-12 py-5 rounded-full bg-accent-glow text-obsidian font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-accent-glow/20"
                        >
                            JOIN THE ECOSYSTEM
                        </button>

                    </div>
                </motion.div>
                {/* Decorative floating glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-accent-glow/10 blur-[150px] -z-10 animate-pulse"></div>
            </section>
        </div>
    );
};
