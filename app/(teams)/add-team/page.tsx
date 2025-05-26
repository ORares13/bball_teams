'use client';
import { useRouter } from 'next/navigation';
import TeamForm from '@/components/teams/TeamForm';
import { TeamFormValues } from '@/domains/teams/types';

export default function AddTeamPage() {
    const router = useRouter();

    const handleAddTeam = async (formData: TeamFormValues) => {
        try {
            const response = await fetch('/api/protected/teams', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to create team');
            }

            const createdTeam = await response.json();


            const competition = formData.competition;
            router.push(`/${competition}`);
        } catch (error) {
            console.error('Failed to add team:', error);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-gray-700 mb-6">Add Team</h1>
                <TeamForm onSubmit={handleAddTeam} />
            </div>
        </div>
    );
}
