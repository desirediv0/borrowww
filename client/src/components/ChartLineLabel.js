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
    // 1. Slice to last 6 months if more
    let chartData = history.length > 0 ? history.slice(-6) : [];

    // 2. Handle 0 data points (Empty)
    if (chartData.length === 0) {
        return (
            <Card className="flex flex-col h-full border-none shadow-none bg-transparent">
                <CardHeader>
                    <CardTitle>Credit Score History</CardTitle>
                    <CardDescription>No history available yet.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center min-h-[200px] text-gray-400">
                    <p>Score history will appear here after your next check.</p>
                </CardContent>
            </Card>
        );
    }

    // 3. Handle 1 data point (Single) - Add a dummy point to make it a line/area
    if (chartData.length === 1) {
        // Create a fake previous point to allow area to render
        const singlePoint = chartData[0];
        chartData = [
            { month: '', score: singlePoint.score }, // Hidden start point
            singlePoint
        ];
    }

    // Calculate trend
    const latestScore = chartData[chartData.length - 1].score;
    const previousScore = chartData.length > 1 ? chartData[chartData.length - 2].score : latestScore;
    const diff = latestScore - previousScore;
    const percentChange = previousScore > 0 ? ((diff / previousScore) * 100).toFixed(1) : 0;

    return (
        <Card className="flex flex-col h-full border-none shadow-none bg-transparent">
            <CardHeader>
                <CardTitle>Credit Score History</CardTitle>
                <CardDescription>Your score trend over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0 min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary-blue)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--primary-blue)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                            style={{ fontSize: '12px', fill: '#888' }}
                        />
                        <YAxis
                            hide={true}
                            domain={['dataMin - 50', 'dataMax + 50']}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            cursor={{ stroke: 'var(--primary-blue)', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="score"
                            stroke="var(--primary-blue)"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorScore)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        {diff !== 0 && (
                            <div className="flex items-center gap-2 font-medium leading-none">
                                {diff > 0 ? 'Trending up' : 'Trending down'} by {Math.abs(percentChange)}% this month{' '}
                                <TrendingUp className={`h-4 w-4 ${diff > 0 ? 'text-green-500' : 'text-red-500'}`} />
                            </div>
                        )}
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Showing total score for the last 6 months
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}

export default ChartLineLabel;
