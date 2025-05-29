'use client';

import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Player } from '@/domains/teams/types';

interface PlayerAgeChartProps {
    players: Player[];
}

export default function PlayerAgeChart({ players }: PlayerAgeChartProps) {
    const ageCountMap: Record<number, number> = {};

    players.forEach(player => {
        const age = player.age || 0;
        ageCountMap[age] = (ageCountMap[age] || 0) + 1;
    });

    const data = Object.entries(ageCountMap)
        .map(([age, count]) => ({
            age: age,
            count,
        }))
        .sort((a, b) => Number(a.age) - Number(b.age));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="age"
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    label={{ value: 'Age', position: 'insideBottomRight', offset: -10 }}
                />
                <YAxis
                    label={{ value: 'Number of Players', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
}
