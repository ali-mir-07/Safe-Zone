import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MoodChart } from '../components/mood/MoodChart';
import { MoodHeatmap } from '../components/mood/MoodHeatmap';
import { Sparkles, Calendar, PenTool } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const MoodTracker = () => {
    const [mood, setMood] = useState<number | null>(null);
    const [notes, setNotes] = useState('');
    const [history, setHistory] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            setError(null);
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                setError('Please sign in to view your mood history.');
                return;
            }
            const { data, error: dbError } = await supabase
                .from('mood_logs')
                .select('*')
                .order('created_at', { ascending: true });

            if (dbError) throw dbError;
            setHistory(data || []);
        } catch (err: any) {
            console.error('History fetch error:', err);
            setError(err?.message || 'Could not load mood history.');
        }
    };

    const handleSubmit = async () => {
        if (mood === null) return;
        setIsSubmitting(true);
        setError(null);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                setError('Please sign in to log your mood.');
                return;
            }

            const { error: dbError } = await supabase
                .from('mood_logs')
                .insert({
                    user_id: session.user.id,
                    mood_score: mood,
                    notes: notes || null,
                });

            if (dbError) throw dbError;

            setMood(null);
            setNotes('');
            fetchHistory();
        } catch (err: any) {
            console.error('Submit error:', err);
            setError(err?.message || 'Failed to save your reflection. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-obsidian-deep pb-24 pt-32">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-accent-glow/5 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-safe-500/5 blur-[120px] pointer-events-none"></div>

            <div className="container relative z-10 mx-auto px-6">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 flex items-center gap-3 rounded-2xl bg-accent-emergency/10 border border-accent-emergency/20 p-4 text-accent-emergency text-sm font-bold max-w-2xl mx-auto"
                    >
                        <span>{error}</span>
                    </motion.div>
                )}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid gap-12 lg:grid-cols-12"
                >
                    {/* Mood Entry - 5 Columns */}
                    <div className="lg:col-span-5 space-y-10">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-glow/10 px-4 py-1.5"
                            >
                                <PenTool size={14} className="text-accent-glow" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-glow">Daily Reflection</span>
                            </motion.div>
                            <h1 className="text-6xl font-black tracking-tighter text-white">
                                HOW'S YOUR <span className="bg-linear-to-r from-accent-glow to-safe-400 bg-clip-text text-transparent italic">INNER CLIMATE?</span>
                            </h1>
                            <p className="mt-4 text-lg font-medium text-white/40 leading-relaxed">
                                Log your emotional data to unlock deep behavioral insights and AI-driven growth patterns.
                            </p>
                        </div>

                        <div className="rounded-[2.5rem] border border-white/5 bg-white/3 p-10 backdrop-blur-3xl shadow-2xl">
                            <h3 className="mb-8 text-xs font-black text-white/80 uppercase tracking-widest">Rate your current energy</h3>
                            <div className="grid grid-cols-5 gap-4 sm:flex sm:justify-between sm:gap-2">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
                                    <button
                                        key={val}
                                        onClick={() => setMood(val)}
                                        className={`group relative flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black transition-all ${mood === val
                                            ? 'bg-accent-glow text-obsidian scale-110 shadow-[0_0_30px_rgba(187,250,240,0.4)]'
                                            : 'bg-white/5 text-white/30 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        {val}
                                        {mood === val && (
                                            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-white animate-ping"></span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-10">
                                <label className="mb-3 block text-[10px] font-black uppercase tracking-widest text-white/20">Optional context</label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Write your thoughts here..."
                                    className="w-full rounded-3xl border border-white/5 bg-white/5 p-6 text-white placeholder:text-white/20 focus:outline-none focus:border-accent-glow/50 focus:bg-white/8 transition-all"
                                    rows={4}
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={mood === null || isSubmitting}
                                className="mt-10 group relative w-full overflow-hidden rounded-3xl bg-white py-5 text-xl font-black text-obsidian transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    LOG REFLECTION
                                    <Sparkles size={20} fill="currentColor" />
                                </span>
                                <div className="absolute inset-0 bg-linear-to-r from-accent-glow to-safe-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </button>
                        </div>
                    </div>

                    {/* Dashboards - 7 Columns */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="rounded-[2.5rem] border border-white/5 bg-white/3 p-10 backdrop-blur-3xl shadow-xl">
                            <div className="mb-8 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-8 bg-accent-glow rounded-full" />
                                    <h3 className="text-xl font-black tracking-tight text-white italic">EMOTIONAL TRENDLINE</h3>
                                </div>
                                <Calendar className="text-white/20" size={20} />
                            </div>
                            <div className="h-[300px] w-full">
                                <MoodChart data={history} />
                            </div>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2">
                            <div className="rounded-[2.5rem] border border-white/5 bg-white/3 p-8 backdrop-blur-3xl shadow-xl flex flex-col items-center justify-center">
                                <h3 className="mb-6 text-center text-[10px] font-black uppercase tracking-widest text-white/30">History Heatmap</h3>
                                <MoodHeatmap data={history} />
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-linear-to-br from-obsidian-soft to-obsidian-deep p-10 shadow-2xl"
                            >
                                <Sparkles className="mb-6 text-accent-glow" size={32} fill="currentColor" />
                                <h4 className="text-2xl font-black tracking-tight text-white">AI INSIGHT</h4>
                                <p className="mt-4 text-white/50 leading-relaxed font-medium">
                                    {history.length > 3
                                        ? "Your stability baseline has increased by 14% this week. The consistency in your morning logs shows positive habit formation."
                                        : "Begin your streak. Three consecutive logs unlock deep behavioral sentiment analysis."}
                                </p>

                                <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-accent-glow/5 blur-[80px]"></div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
