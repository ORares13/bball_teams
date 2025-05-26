'use client';

import { useEffect, useState } from 'react';

type MonitoredUser = {
    id: string;
    reason: string;
    detectedAt: string;
    user: {
        id: string;
        username: string;
    };
};

export default function MonitoredUsersPage() {
    const [users, setUsers] = useState<MonitoredUser[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUsers() {
            const res = await fetch('/api/protected/admin/monitored-users');
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            } else {
                setError('Failed to load monitored users');
            }
        }
        fetchUsers();
    }, []);

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-2xl mx-auto mt-6">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Monitored Users</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-600 border-b">
                        <tr>
                            <th className="px-6 py-3">Username</th>
                            <th className="px-6 py-3">Reason</th>
                            <th className="px-6 py-3">Detected At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="px-6 py-4 text-center text-gray-500 italic"
                                >
                                    No monitored users found.
                                </td>
                            </tr>
                        ) : (
                            users.map((mu) => (
                                <tr
                                    key={mu.id}
                                    className="hover:bg-gray-50 transition-colors border-b"
                                >
                                    <td className="px-6 py-4 font-medium">{mu.user.username}</td>
                                    <td className="px-6 py-4">{mu.reason}</td>
                                    <td className="px-6 py-4">
                                        {new Date(mu.detectedAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
