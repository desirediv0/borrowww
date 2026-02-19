'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const ChartLineLabel = ({ history = [] }) => {
    // 1. Slice to last 6 months & Sort by Date (just in case)
    let chartData = history && history.length > 0
        ? [...history].sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-6)
        : [];

    // 2. Handle 0 data points (Empty)
    if (chartData.length === 0) {
        return (
            <Card className="flex flex-col h-full border-none shadow-none bg-transparent">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-gray-700">Score History</CardTitle>
                    <CardDescription>No history available yet.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center min-h-[200px] text-gray-400 bg-gray-50/50 rounded-2xl mx-6 mb-6">
                    <div className="text-center">
                        <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-20" />
                        <p className="text-sm">History will appear here next month</p>
                    </div>
                </CardContent>
            </Card>
        );
    }


    const isSingle = chartData.length === 1;
    if (isSingle) {

        const single = chartData[0];
        chartData = [
            { ...single, month: '' }, // Invisible start
            single,
            { ...single, month: ' ' } // Invisible end
        ];
    }

    // Calculate trend
    const latestScore = chartData[chartData.length - 1].score;

    // Find previous score from *real* history
    let previousScore = latestScore;
    let percentChange = 0;
    let diff = 0;

    if (history.length >= 2) {
        const sortedHistory = [...history].sort((a, b) => new Date(a.date) - new Date(b.date));
        previousScore = sortedHistory[sortedHistory.length - 2].score;
        diff = latestScore - previousScore;
        percentChange = previousScore > 0 ? ((diff / previousScore) * 100).toFixed(1) : 0;
    }

    return (
        <Card className="flex flex-col h-full border-none shadow-none bg-transparent">
            <CardHeader className="pb-4 pt-2">
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-gray-400" />
                    Score History
                </CardTitle>
                <CardDescription className="text-sm font-medium text-gray-400">
                    Last 6 Months Trend
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0 pl-0">
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={chartData}
                            margin={{ top: 10, right: 30, left: -20, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--primary-blue)" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="var(--primary-blue)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f3f4f6" />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                tickFormatter={(value) => value ? value.slice(0, 3) : ''}
                                style={{ fontSize: '11px', fill: '#9ca3af', fontWeight: 600 }}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                                style={{ fontSize: '11px', fill: '#9ca3af' }}
                                domain={[300, 900]}
                                tickCount={5}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '16px',
                                    border: 'none',
                                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                    padding: '16px',
                                    fontSize: '13px',
                                    backgroundColor: 'white'
                                }}
                                cursor={{ stroke: '#e5e7eb', strokeWidth: 1, strokeDasharray: '4 4' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="score"
                                stroke="var(--primary-blue)"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorScore)"
                                animationDuration={1500}
                                dot={{ r: 4, fill: "var(--primary-blue)", strokeWidth: 2, stroke: "#fff" }}
                                activeDot={{ r: 6, fill: "var(--primary-blue)", strokeWidth: 0 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
            {history.length >= 2 && (
                <CardFooter className="pt-2 pb-2">
                    <div className="text-sm font-medium text-gray-500 flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                        <span className={`inline-flex items-center ${diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {diff > 0 ? '+' : ''}{diff} pts
                        </span>
                        <span className="text-xs text-gray-400">vs last month</span>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}

export default ChartLineLabel;
