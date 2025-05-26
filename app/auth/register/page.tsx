'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (password !== passwordConfirm) {
            setError("Passwords don't match");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                setError(errorData.message || 'Registration failed');
                setLoading(false);
                return;
            }

            // Redirect on successful register
            router.push('/auth/login');
        } catch {
            setError('Unexpected error occurred');
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 to-orange-400">
            <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>

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
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                            placeholder="Choose a username"
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
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                            placeholder="Enter a password"
                        />
                    </div>

                    <div>
                        <label htmlFor="passwordConfirm" className="block mb-1 font-semibold text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                            placeholder="Confirm your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-pink-500 text-white font-semibold py-2 rounded-md hover:bg-pink-600 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{' '}
                    <a href="/auth/login" className="text-pink-500 font-semibold hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
