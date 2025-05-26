'use client';
import { FormEvent, useState } from 'react';
import { Team, TeamFormValues } from '@/domains/teams/types';

export default function TeamForm({
    team,
    onSubmit,
}: {
    team?: Team;
    onSubmit: (values: TeamFormValues) => Promise<void>;
}) {
    const [formData, setFormData] = useState<TeamFormValues>({
        name: team?.name || '',
        country: team?.country || '',
        arena: team?.arena || '',
        arenaCapacity: team?.arenaCapacity || 0,
        logo: team?.logo || '',
        manager: team?.manager || '',
        competition: team?.competition || 'euroleague',
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
        if (!team) {
            setFormData({ name: '', country: '', arena: '', arenaCapacity: 0, logo: '', manager: '', competition: 'euroleague' });
        }
    };

    const buttonColors = formData.competition === 'euroleague'
        ? 'bg-orange-500 hover:bg-orange-600'
        : 'bg-blue-500 hover:bg-blue-600';

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-1 text-gray-700">Team Name*</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded text-gray-700"
                    aria-label="Team Name"
                    required
                />
            </div>

            <div>
                <label className="block mb-1 text-gray-700">Country*</label>
                <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded text-gray-700"
                    aria-label="Country"
                    required
                />
            </div>

            <div>
                <label className="block mb-1 text-gray-700">Arena*</label>
                <input
                    type="text"
                    value={formData.arena}
                    onChange={(e) => setFormData({ ...formData, arena: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded text-gray-700"
                    aria-label="Arena"
                    required
                />
            </div>

            <div>
                <label className="block mb-1 text-gray-700">Arena Capacity*</label>
                <input
                    type="number"
                    value={formData.arenaCapacity || ''}
                    onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        setFormData({ ...formData, arenaCapacity: isNaN(value) ? 0 : value });
                    }}
                    className="w-full p-2 border border-gray-300 rounded text-gray-700"
                    aria-label="Arena Capacity"
                    required
                    min="2500"
                />
                {formData.arenaCapacity > 0 && formData.arenaCapacity < 2500 && (
                    <p className="text-red-500 text-sm">Capacity must be at least 2500.</p>
                )}
            </div>




            <div>
                <label className="block mb-1 text-gray-700">Logo URL*</label>
                <input
                    type="text"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded text-gray-700"
                    aria-label="Logo URL"
                    required
                />
            </div>

            <div>
                <label className="block mb-1 text-gray-700">Manager*</label>
                <input
                    type="text"
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded text-gray-700"
                    aria-label="Manager"
                    required
                />
            </div>

            <div>
                <label className="block mb-1 text-gray-700">Competition*</label>
                <select
                    value={formData.competition}
                    onChange={(e) => setFormData({ ...formData, competition: e.target.value as 'euroleague' | 'eurocup' })}
                    className="w-full p-2 border border-gray-300 rounded text-gray-700"
                    aria-label="Competition"
                    required
                >
                    <option value="euroleague">Euroleague</option>
                    <option value="eurocup">Eurocup</option>
                </select>
            </div>

            <button
                type="submit"
                className={`w-full text-white py-2 rounded ${buttonColors}`}
                aria-label={team ? 'Update Team' : 'Add Team'}
            >
                {team ? 'Update Team' : 'Add Team'}
            </button>
        </form>
    );
}
