'use client';

import { useState } from 'react';
import { Team } from '@/domains/teams/types';
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TeamCard({
    team,
    highlight,
    onDelete,
    onUpdate,
}: {
    team: Team;
    highlight: 'max' | 'min' | null;
    onDelete: () => void;
    onUpdate: () => void;
}) {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const router = useRouter();

    const themeColors =
        team.competition === 'euroleague'
            ? 'bg-orange-100 border-orange-400 text-orange-900'
            : 'bg-blue-100 border-blue-400 text-blue-900';

    const buttonColors =
        team.competition === 'euroleague'
            ? 'bg-orange-500 hover:bg-orange-600'
            : 'bg-blue-500 hover:bg-blue-600';

    const highlightClass =
        highlight === 'max'
            ? 'bg-green-100 text-green-900 font-bold'
            : highlight === 'min'
                ? 'bg-red-100 text-red-900 font-bold'
                : '';

    return (
        <div className={`rounded-lg shadow-md p-4 mb-4 border ${themeColors}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="flex-1">
                        <h3 className="font-bold text-lg">{team.name}</h3>
                        <p className="text-gray-700">{team.country}</p>

                        <p className={`text-sm ${highlightClass}`}>
                            Arena: {team.arena} • Capacity: {team.arenaCapacity}
                        </p>

                        <p className="text-sm text-gray-600">Manager: {team.manager}</p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setShowUpdateModal(true)}
                        className={`${buttonColors} text-white px-3 py-1 rounded`}
                    >
                        Update
                    </button>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => router.push(`/euroleague/${team.id}/players`)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                        Players
                    </button>

                </div>
            </div>

            <UpdateModal
                team={team}
                isOpen={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                onUpdate={onUpdate}
            />

            <DeleteModal
                teamId={team.id}
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={onDelete}
            />
        </div>
    );
}
