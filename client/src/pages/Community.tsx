import { motion } from 'framer-motion';
import { MessageSquare, Users, Star, Quote, Heart, Sparkles } from 'lucide-react';

const testimonials = [
    {
        name: "Alex M.",
        role: "SafeZone Member since 2024",
        text: "I was in a very dark place at 3 AM and didn't want to wake anyone up. I spoke with Zen, and the grounding exercises literally brought me back to my breath. SafeZone is the first place where I felt truly heard without being judged.",
        sentiment: "Life-changing",
        avatar_color: "bg-accent-glow"
    },
    {
        name: "Sarah L.",
        role: "Anonymous Peer",
        text: "Connecting with someone who actually understood my anxiety made all the difference. The matching system is incredible—it's like finding a soul sibling who just gets it. I'm now a peer listener myself!",
        sentiment: "Empowering",
        avatar_color: "bg-safe-400"
    },
    {
        name: "Jordan T.",
        role: "Student",
        text: "The anonymity of SafeZone allowed me to open up about things I've never told my closest friends. Zen's intelligent responses are surprisingly empathetic. It feels like a warm hug in digital form.",
        sentiment: "Healing",
        avatar_color: "bg-accent-soft"
    },
    {
        name: "Elena R.",
        role: "Healthcare Worker",
        text: "After a 12-hour shift, my mind is often racing. Using the Journal and then chatting with a peer helps me decompress. The design is so calming—it's my favorite app on my phone.",
        sentiment: "Serene",
        avatar_color: "bg-accent-emergency"
    },
    {
        name: "Marcus K.",
        role: "SafeZone Veteran",
        text: "SafeZone isn't just an app; it's a movement. I've seen the community grow, and the way Zen handles crises is nothing short of revolutionary. It's safe, it's fast, and it works.",
        sentiment: "Revolutionary",
        avatar_color: "bg-white"
    },
    {
        name: "Aisha B.",
        role: "New Member",
        text: "I was skeptical about AI support, but Zen proved me wrong. It noticed I was spiraling before I even realized it. The transition to a human peer was seamless. Truly life-saving tech.",
        sentiment: "Safe",
        avatar_color: "bg-accent-glow"
    }
];

const stats = [
    { label: "Hearts Healed", value: "120K+", icon: <Heart className="text-accent-emergency" size={24} /> },
    { label: "Zen Sessions", value: "2.4M", icon: <Sparkles className="text-accent-glow" size={24} /> },
    { label: "Peer Connections", value: "85K", icon: <Users className="text-safe-400" size={24} /> },
    { label: "Crisis averted", value: "99.9%", icon: <Star className="text-accent-soft" size={24} /> }
];

export const Community = ({ onNavigate }: { onNavigate: (v: 'home' | 'mood' | 'excellence' | 'community' | 'about' | 'auth') => void }) => {

    return (
        <div className="relative min-h-screen bg-obsidian-deep pt-32 pb-40 px-6 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-accent-glow/5 blur-[150px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 h-[800px] w-[800px] bg-safe-500/5 blur-[180px] -z-10"></div>

            <div className="container mx-auto max-w-7xl">
                {/* Hero Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-32 space-y-6"
                >
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 border border-white/10 mb-4">
                        <Users size={14} className="text-safe-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Community Pulse</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase italic">
                        VOICES OF THE <span className="text-accent-glow">SANCTUARY</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl md:text-2xl text-white/40 font-medium leading-relaxed">
                        Join a global movements of hearts. Real stories from real people who found their light in SafeZone.
                    </p>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-40"
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-3xl hover:bg-white/10 hover:border-safe-400/50 hover:shadow-[0_0_30px_-10px_var(--color-safe-500)] transition-all"
                        >
                            <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-white/10 mx-auto mb-4 group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                            <div className="text-4xl font-black text-white mb-1 uppercase tracking-tighter">{stat.value}</div>
                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-safe-400">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Testimonial Masonry-style Grid */}
                <div className="relative">
                    {/* Grid Ambient Lighting */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-safe-500/5 blur-[180px] -z-10 animate-pulse-slow"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="relative group p-8 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl hover:bg-white/10 hover:border-accent-glow/50 hover:shadow-[0_0_50px_-15px_var(--color-accent-glow)] transition-all duration-500 overflow-hidden"
                            >
                                <Quote size={40} className="absolute -top-4 -right-4 text-white/5 group-hover:text-accent-glow/20 transition-all duration-500" />

                                <div className="flex items-center gap-4 mb-8">
                                    <div className={`h-12 w-12 rounded-2xl ${t.avatar_color} flex items-center justify-center text-obsidian font-black text-xl shadow-lg border-2 border-white/20 group-hover:scale-110 transition-transform duration-500`}>
                                        {t.name[0]}
                                    </div>
                                    <div className="text-left">
                                        <div className="text-lg font-black text-white leading-none mb-1 group-hover:text-accent-glow transition-colors">{t.name}</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40">{t.role}</div>
                                    </div>
                                    <div className="ml-auto">
                                        <div className="rounded-full bg-accent-glow/20 px-3 py-1 border border-accent-glow/30 shadow-[0_0_15px_rgba(187,250,240,0.1)]">
                                            <span className="text-[10px] font-black uppercase text-accent-glow tracking-tighter">{t.sentiment}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-xl text-white/70 leading-relaxed font-medium italic group-hover:text-white transition-colors">
                                    "{t.text}"
                                </p>

                                <div className="mt-8 flex items-center gap-1">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} size={14} className="fill-accent-glow text-accent-glow drop-shadow-[0_0_5px_var(--color-accent-glow)]" />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>


                {/* Engagement Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="mt-40 rounded-[4rem] bg-linear-to-br from-safe-500 to-obsidian-deep p-16 text-center border border-white/5 relative overflow-hidden group"
                >
                    <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                        <MessageSquare size={60} className="mx-auto text-accent-glow animate-bounce" />
                        <h2 className="text-5xl md:text-6xl font-black text-white italic tracking-tighter uppercase">
                            YOUR VOICE <span className="text-accent-glow">MATTERS.</span>
                        </h2>
                        <p className="text-xl text-white/50 font-medium">
                            Join our community of empathetic believers. Shared quiet moments, lived recovery, and the power of presence.
                        </p>
                        <div className="pt-8">
                            <button
                                onClick={() => onNavigate('auth')}
                                className="rounded-full bg-white px-12 py-5 text-xl font-black text-obsidian hover:scale-110 active:scale-95 transition-all shadow-2xl"
                            >
                                BECOME A MEMBER
                            </button>
                        </div>

                    </div>
                    {/* Floating Glow */}
                    <div className="absolute inset-0 bg-accent-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                </motion.div>
            </div>
        </div>
    );
};
