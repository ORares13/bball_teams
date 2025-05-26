'use client';

import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Team } from '@/domains/teams/types';

interface ArenaCapacityChartProps {
    teams: Team[];
}

export default function ArenaCapacityChart({ teams }: ArenaCapacityChartProps) {
    // Map teams to chart data
    const data = teams.map(team => ({
        name: team.name,
        capacity: team.arenaCapacity || 0,
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="capacity" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}
