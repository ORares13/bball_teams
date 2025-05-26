'use client';
import { useState } from 'react';
import { Player, PlayerFormValues } from '@/domains/teams/types';
import PlayerForm from './PlayerForm';

interface UpdateModalProps {
    teamId: string;
    player: Player;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: () => void;
}

export default function UpdateModal({
    teamId,
    player,
    isOpen,
    onClose,
    onUpdate,
}: UpdateModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleUpdate = async (values: PlayerFormValues) => {
        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/protected/teams/${teamId}/players/${player.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                console.error('Failed to update player:', await res.text());
                setIsSubmitting(false);
                return;
            }

            onUpdate();
            onClose();
        } catch (error) {
            console.error('Error updating player:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                className="bg-white p-6 rounded-lg max-w-md w-full relative"
                role="dialog"
                aria-modal="true"
            >
                <button
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    aria-label="Close modal"
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold mb-4 text-gray-800">Update Player</h2>
                <PlayerForm
                    player={player}
                    onSubmit={handleUpdate}
                    teamId={teamId}
                    disabled={isSubmitting}
                />

                <button
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="mt-4 w-full py-2 rounded text-gray-700 border border-gray-300 hover:bg-gray-200"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
