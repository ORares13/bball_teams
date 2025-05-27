'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Team } from '@/domains/teams/types';
import TeamCard from '@/components/teams/TeamCard';
// import { useWebSocket } from '@/components/hooks/useWebSocket';
import ArenaCapacityChart from '@/components/teams/ArenaCapacityChart';

export default function EuroleagueClient() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState<string>('');
    const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
    const searchParams = useSearchParams();

    useEffect(() => {
        const searchQuery = searchParams.get('search') || '';
        setSearch(searchQuery);
    }, [searchParams]);

    useEffect(() => {
        const timeoutId = setTimeout(() => setDebouncedSearch(search), 500);
        return () => clearTimeout(timeoutId);
    }, [search]);

    const fetchTeams = useCallback(async () => {
        try {
            setError(null);
            const res = await fetch(`/api/protected/teams?competition=euroleague&search=${encodeURIComponent(debouncedSearch)}`);
            if (!res.ok) throw new Error('Failed to fetch teams');
            const data = await res.json();
            setTeams(data);
        } catch {
            setError('Failed to load teams. Please try again later.');
        }
    }, [debouncedSearch]);

    useEffect(() => {
        fetchTeams();
    }, [fetchTeams]);

    // const handleNewTeam = useCallback((newTeam: Team) => {
    //     setTeams(prev => {
    //         if (prev.find(t => t.id === newTeam.id)) return prev;
    //         return [newTeam, ...prev];
    //     });
    // }, []);
    // useWebSocket(handleNewTeam, 'euroleague', 'ws://localhost:3000');

    const handleDelete = () => {
        fetchTeams();
    };

    const handleUpdate = () => {
        fetchTeams();
    };

    const maxCapacity = Math.max(...teams.map(team => team.arenaCapacity || 0));
    const minCapacity = Math.min(...teams.map(team => team.arenaCapacity || Infinity));

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto p-4">
                {error && <p className="text-red-500">{error}</p>}

                <h2 className="text-xl font-semibold mb-4">Arena Capacities</h2>
                <ArenaCapacityChart teams={teams} />

                <div className="space-y-4 mt-8">
                    {teams.map(team => (
                        <TeamCard
                            key={team.id}
                            team={team}
                            highlight={
                                team.arenaCapacity === maxCapacity ? 'max' :
                                    team.arenaCapacity === minCapacity ? 'min' : null
                            }
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
