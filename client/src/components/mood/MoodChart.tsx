import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MoodData {
    created_at: string;
    mood_score: number;
}

export const MoodChart = ({ data }: { data: MoodData[] }) => {
    const chartData = data.map(item => ({
        time: new Date(item.created_at).toLocaleDateString(),
        score: item.mood_score
    }));

    return (
        <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700 }}
                    />
                    <YAxis
                        domain={[0, 10]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700 }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '16px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#fff'
                        }}
                        itemStyle={{ color: '#bbfaf0' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#bbfaf0"
                        strokeWidth={4}
                        dot={{ r: 4, fill: '#bbfaf0', strokeWidth: 2, stroke: '#0a0a0a' }}
                        activeDot={{ r: 8, fill: '#fff' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
