interface MoodData {
    created_at: string;
    mood_score: number;
}

export const MoodHeatmap = ({ data }: { data: MoodData[] }) => {
    const recentDays = data.slice(-14);

    const getColor = (score: number) => {
        if (score >= 8) return 'bg-accent-glow';
        if (score >= 6) return 'bg-safe-300';
        if (score >= 4) return 'bg-white/20';
        return 'bg-white/5';
    };

    return (
        <div className="w-full">
            <div className="flex flex-wrap justify-center gap-3">
                {recentDays.length === 0 ? (
                    <p className="text-sm text-white/20 italic">No data yet</p>
                ) : (
                    recentDays.map((item, i) => (
                        <div
                            key={i}
                            title={`Score: ${item.mood_score} on ${new Date(item.created_at).toLocaleDateString()}`}
                            className={`h-10 w-10 rounded-xl ${getColor(item.mood_score)} transition-all hover:scale-125 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/5`}
                        />
                    ))
                )}
            </div>
            <p className="mt-6 text-center text-[10px] font-black uppercase tracking-widest text-white/20">Last 14 Intervals</p>
        </div>
    );
};
