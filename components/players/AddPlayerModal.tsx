'use client';
import { useState } from 'react';
import { PlayerFormValues } from '@/domains/teams/types';
import PlayerForm from './PlayerForm';

interface AddPlayerModalProps {
    teamId: string;
    isOpen: boolean;
    onClose: () => void;
    onAdd: () => void;
}

export default function AddPlayerModal({
    teamId,
    isOpen,
    onClose,
    onAdd,
}: AddPlayerModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleAdd = async (values: PlayerFormValues) => {
        setIsSubmitting(true);

        try {
            const res = await fetch(`/api/protected/teams/${teamId}/players`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                console.error('Failed to add player:', await res.text());
                setIsSubmitting(false);
                return;
            }

            onAdd();
            onClose();
        } catch (error) {
            console.error('Error adding player:', error);
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
                <h2 className="text-xl font-bold mb-4 text-gray-800">Add Player</h2>

                <PlayerForm onSubmit={handleAdd} disabled={isSubmitting} />

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
