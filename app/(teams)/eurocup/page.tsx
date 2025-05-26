'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Team } from '@/domains/teams/types';
import TeamCard from '@/components/teams/TeamCard';

export default function EurocupPage() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState<string>('');
    const searchParams = useSearchParams();
    const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

    useEffect(() => {
        const searchQuery = searchParams.get('search') || '';
        setSearch(searchQuery);
    }, [searchParams]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [search]);

    const fetchTeams = async () => {
        try {
            const res = await fetch(`/api/teams?competition=eurocup&search=${debouncedSearch}`);
            if (!res.ok) throw new Error('Failed to fetch teams');
            const data = await res.json();
            setTeams(data);
        } catch (error) {
            setError('Failed to load teams. Please try again later.');
        }
    };

    useEffect(() => {
        fetchTeams();
    }, [debouncedSearch]);

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
                <div className="space-y-4">
                    {teams.map((team) => (
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
