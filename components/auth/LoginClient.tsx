'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginClient() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);


        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include',
            });


            if (!res.ok) {
                const errorData = await res.json();
                setError(errorData.message || 'Login failed');
                setLoading(false);
                return;
            }

            router.push('/euroleague');
        } catch {
            setError('Unexpected error occurred');
            setLoading(false);
        }
    }

    return (
        <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>

            {error && (
                <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="username" className="block mb-1 font-semibold text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
                        placeholder="Enter your username"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block mb-1 font-semibold text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-500 text-white font-semibold py-2 rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <p className="mt-6 text-center text-gray-600">
                Don't have an account?{' '}
                <a href="/auth/register" className="text-orange-500 font-semibold hover:underline">
                    Register
                </a>
            </p>
        </div>
    );
}
