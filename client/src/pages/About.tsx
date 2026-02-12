import { motion } from 'framer-motion';
import { Target, ShieldCheck, HeartPulse, Globe } from 'lucide-react';


const team = [
    { name: "Dr. Aris V.", role: "Founder & Chief Architect", specialty: "Clinical Psychology", avatar: "AV" },
    { name: "Sarah Chen", role: "Head of AI Ethics", specialty: "Neural Engineering", avatar: "SC" },
    { name: "Marcus Thorne", role: "Community Lead", specialty: "Peer Advocacy", avatar: "MT" }
];

const values = [
    { icon: <Target className="text-safe-400" />, title: "Precision Recovery", desc: "Using data-driven insights to tailor immediate mental health support." },
    { icon: <ShieldCheck className="text-accent-glow" />, title: "Radical Privacy", desc: "Your identity is a sacred boundary. We never compromise on anonymity." },
    { icon: <Globe className="text-accent-soft" />, title: "Universal Access", desc: "Breaking down financial and geographical barriers to quality care." }
];

export const About = () => {
    return (
        <div className="relative min-h-screen bg-obsidian-deep pt-32 pb-40 px-6 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 -z-10">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-safe-500 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-soft rounded-full blur-[120px]"></div>
            </div>

            <div className="container mx-auto max-w-7xl">
                {/* Mission Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-32"
                >
                    <span className="text-safe-400 font-bold uppercase tracking-[0.4em] text-xs mb-4 block">Our Origin</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8">
                        BEYOND THE <br />
                        <span className="italic bg-linear-to-r from-white via-safe-200 to-accent-soft bg-clip-text text-transparent">SILENCE</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-xl text-white/40 leading-relaxed font-medium">
                        SafeZone was born out of a simple, urgent necessity: the world needed a place to breathe at 3 AM.
                        We combine cutting-edge AI resilience with the irreplaceable power of human peer synergy.
                    </p>
                </motion.div>

                {/* Core Pillars */}
                <div className="relative mb-40">
                    {/* Ambient Light Source for Grid */}
                    <div className="absolute -inset-20 bg-safe-500/10 blur-[120px] rounded-full -z-10 animate-pulse-slow"></div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {values.map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl hover:bg-white/10 hover:border-safe-400/50 hover:shadow-[0_0_40px_-10px_var(--color-safe-500)] transition-all group"
                            >
                                <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-2xl group-hover:scale-110 group-hover:bg-safe-400 group-hover:text-obsidian transition-all">
                                    {v.icon}
                                </div>
                                <h3 className="text-2xl font-black text-white mb-4">{v.title}</h3>
                                <p className="text-white/40 font-medium leading-relaxed group-hover:text-white/70 transition-colors">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* The 'Why' Section */}
                <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            A WELL-ESTABLISHED <br />
                            <span className="text-safe-400">SANCTUARY.</span>
                        </h2>
                        <div className="space-y-6 text-lg text-white/50 font-medium leading-relaxed">
                            <p>
                                Founded in 2022 by a collective of clinical psychologists and ethical AI researchers,
                                SafeZone has grown from a grassroots project into a globally recognized leader in
                                digital mental health de-escalation.
                            </p>
                            <p>
                                We don't just provide chat sessions; we provide a calibrated ecosystem where
                                clinical precision meets radical empathy. Our "Zen" engine is the world's
                                first specialized LLM trained exclusively on supportive, non-critical care protocols.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative rounded-[3rem] aspect-square bg-linear-to-br from-white/10 to-white/5 border-2 border-white/20 overflow-hidden shadow-2xl shadow-safe-500/10"
                    >
                        <div className="absolute inset-0 flex items-center justify-center p-12">
                            <HeartPulse size={200} className="text-safe-400/20 animate-pulse" />
                        </div>
                        <div className="absolute bottom-12 left-12 right-12 p-8 rounded-3xl bg-white/10 backdrop-blur-3xl border border-white/20 shadow-2xl">
                            <div className="text-4xl font-black text-white mb-1 tracking-tighter">50,000+</div>
                            <div className="text-xs font-bold text-safe-400 uppercase tracking-widest">Lives Touched Globally</div>
                        </div>
                    </motion.div>
                </div>

                {/* Team Section */}
                <div className="relative mb-20">
                    {/* Team Ambient Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent-soft/5 blur-[150px] -z-10"></div>

                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black text-white mb-4 tracking-widest">THE ARCHITECTS</h2>
                        <div className="h-1.5 w-24 bg-linear-to-r from-safe-400 to-accent-soft mx-auto rounded-full shadow-[0_0_20px_var(--color-safe-400)]"></div>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {team.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-4xl bg-white/5 border border-white/10 text-center group hover:bg-white/10 hover:border-accent-glow/50 hover:shadow-[0_0_50px_-15px_var(--color-accent-glow)] transition-all duration-500"
                            >
                                <div className="h-20 w-20 rounded-full bg-linear-to-br from-safe-500 to-accent-soft mx-auto mb-6 flex items-center justify-center text-obsidian font-black text-2xl shadow-xl group-hover:scale-110 transition-transform duration-500">
                                    {member.avatar}
                                </div>
                                <h3 className="text-xl font-black text-white mb-1 uppercase tracking-tight group-hover:text-accent-glow transition-colors">{member.name}</h3>
                                <p className="text-accent-glow text-xs font-bold uppercase tracking-widest mb-4 opacity-70">{member.role}</p>
                                <p className="text-white/40 text-sm font-medium italic group-hover:text-white transition-colors">"{member.specialty}"</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};
