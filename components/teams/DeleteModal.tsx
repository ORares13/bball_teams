'use client';
import { useEffect } from 'react';

interface DeleteModalProps {
    teamId: string;
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

export default function DeleteModal({
    teamId,
    isOpen,
    onClose,
    onDelete,
}: DeleteModalProps) {
    if (!isOpen) return null;

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/protected/teams/${teamId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete team');
            }

            onDelete();
            onClose();
        } catch (error) {
            console.error('Failed to delete team:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full relative" role="dialog" aria-modal="true">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" aria-label="Close modal">
                    ✕
                </button>
                <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                <p className="mb-6">Are you sure you want to delete this team?</p>
                <div className="flex justify-end space-x-3">
                    <button onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-50" aria-label="Cancel">
                        Cancel
                    </button>
                    <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" aria-label="Delete Team">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
