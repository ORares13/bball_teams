'use client';


import { useState } from 'react';
import { Player } from '@/domains/teams/types';
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
import { useRouter } from 'next/navigation';


export default function PlayerCard({
    player,
    highlight,
    onUpdate,
    onDelete,
}: {
    player: Player;
    highlight: 'max' | 'min' | null;
    onUpdate: () => void;
    onDelete: () => void;
}) {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const router = useRouter();

    const highlightClass =
        highlight === 'max'
            ? 'bg-green-100 text-green-900 font-bold'
            : highlight === 'min'
                ? 'bg-red-100 text-red-900 font-bold'
                : '';

    return (
        <div className={`rounded-lg shadow-md p-4 mb-4 border bg-white`}>
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-lg text-black">{player.name}</h3>
                    <p className="text-gray-700">Position: {player.position}</p>
                    <p className={`text-sm ${highlightClass}`}>Age: {player.age}</p>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setShowUpdateModal(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                        Update
                    </button>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <UpdateModal
                teamId={player.teamId}
                player={player}
                isOpen={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                onUpdate={onUpdate}
            />

            <DeleteModal
                teamId={player.teamId}
                playerId={player.id}
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={onDelete}
            />
        </div>
    );
}
