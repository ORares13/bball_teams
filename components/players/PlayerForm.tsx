'use client';
import { FormEvent, useState } from 'react';
import { Player, PlayerFormValues } from '@/domains/teams/types';

export default function PlayerForm({
    player,
    onSubmit,
    teamId,
    disabled = false,
}: {
    player?: Player;
    onSubmit: (values: PlayerFormValues) => Promise<void>;
    teamId?: string;
    disabled?: boolean;
}) {
    const [formData, setFormData] = useState<PlayerFormValues>({
        name: player?.name || '',
        position: player?.position || 'PG',
        age: player?.age || 16,
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (disabled) return;
        await onSubmit(formData);
        if (!player) {
            setFormData({ name: '', position: 'PG', age: 16 });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-1 text-gray-700">Player Name*</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded text-gray-700"
                    required
                    disabled={disabled}
                />
            </div>

            <div>
                <label className="block mb-1 text-gray-700">Position*</label>
                <select
                    value={formData.position}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            position: e.target.value as PlayerFormValues['position'],
                        })
                    }
                    className="w-full p-2 border border-gray-300 rounded text-gray-700"
                    required
                    disabled={disabled} // disable select
                >
                    <option value="PG">PG - Point Guard</option>
                    <option value="SG">SG - Shooting Guard</option>
                    <option value="SF">SF - Small Forward</option>
                    <option value="PF">PF - Power Forward</option>
                    <option value="C">C - Center</option>
                </select>
            </div>

            <div>
                <label className="block mb-1 text-gray-700">Age*</label>
                <input
                    type="number"
                    value={formData.age || ''}
                    onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        setFormData({ ...formData, age: isNaN(value) ? 16 : value });
                    }}
                    className="w-full p-2 border border-gray-300 rounded text-gray-700"
                    required
                    min={16}
                    disabled={disabled}
                />
            </div>

            <button
                type="submit"
                className={`w-full py-2 rounded text-white ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                aria-label={player ? 'Update Player' : 'Add Player'}
                disabled={disabled}
            >
                {player ? 'Update Player' : 'Add Player'}
            </button>
        </form>
    );
}
