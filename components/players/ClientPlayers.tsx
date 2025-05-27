'use client';

import { useEffect, useState, useCallback } from 'react';
import { Player } from '@/domains/teams/types';
import PlayerCard from './PlayerCard';
import PlayerAgeChart from './PlayerAgeChart';
import AddPlayerModal from './AddPlayerModal';

export default function ClientPlayers({ teamId }: { teamId: string }) {
    const [players, setPlayers] = useState<Player[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchPlayers = useCallback(async () => {
        try {
            setError(null);
            const res = await fetch(`/api/protected/teams/${teamId}/players`);
            if (!res.ok) throw new Error('Failed to fetch players');
            const data = await res.json();
            setPlayers(data);
        } catch {
            setError('Failed to load players. Please try again later.');
        }
    }, [teamId]);

    useEffect(() => {
        fetchPlayers();
    }, [fetchPlayers]);

    const handleDelete = () => {
        fetchPlayers();
    };

    const handleUpdate = () => {
        fetchPlayers();
    };

    const handleAddPlayer = () => {
        fetchPlayers();

        setIsModalOpen(false);
    };

    const maxAge = players.length > 0 ? Math.max(...players.map(p => p.age || 0)) : 0;
    const minAge = players.length > 0 ? Math.min(...players.map(p => p.age || Infinity)) : 0;

    return (
        <>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="flex justify-between items-center mb-4">
                {players.length > 0 && (
                    <h2 className="text-xl font-semibold">Player Ages Distribution</h2>
                )}
                {/* Add Player Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Player
                </button>
            </div>

            {players.length > 0 && (
                <PlayerAgeChart players={players} />
            )}

            <div className="space-y-4 mt-8">
                {players.map(player => (
                    <PlayerCard
                        key={player.id}
                        player={player}
                        highlight={
                            player.age === maxAge ? 'max' :
                                player.age === minAge ? 'min' : null
                        }
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                    />
                ))}
            </div>

            {/* Add Player Modal */}
            <AddPlayerModal
                teamId={teamId}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddPlayer}
            />
        </>
    );
}