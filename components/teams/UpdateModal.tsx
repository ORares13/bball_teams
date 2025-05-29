'use client';
import { useRouter } from 'next/navigation';
import { Team, TeamFormValues } from '@/domains/teams/types';
import TeamForm from './TeamForm';

interface UpdateModalProps {
    team: Team;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: () => void;
}

export default function UpdateModal({
    team,
    isOpen,
    onClose,
    onUpdate,
}: UpdateModalProps) {

    const router = useRouter();
    console.log("UpdateModal isOpen:", isOpen);


    if (!isOpen) return null;

    const handleUpdate = async (values: TeamFormValues) => {
        try {
            console.log("try to do put on team");
            const res = await fetch(`/api/protected/teams/${team.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                console.error('Failed to update team:', await res.text());
                return;
            }

            onUpdate();
            onClose();
        } catch (error) {
            console.error('Error updating team:', error);
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
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    aria-label="Close modal"
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold mb-4 text-gray-800">Update Team</h2>
                <TeamForm team={team} onSubmit={handleUpdate} />
                <button
                    onClick={onClose}
                    className="mt-4 w-full py-2 rounded text-gray-700 border border-gray-300 hover:bg-gray-200"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
