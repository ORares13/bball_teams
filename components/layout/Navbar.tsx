'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SearchIcon } from '../icons';
import { debounce } from 'lodash';

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');

    const isEuroleague = pathname?.startsWith('/euroleague');
    const isEurocup = pathname?.startsWith('/eurocup');

    const debouncedSearch = debounce((searchTerm: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (searchTerm) {
            params.set('search', searchTerm);
        } else {
            params.delete('search');
        }
        router.replace(`${pathname}?${params.toString()}`);
    }, 300);

    useEffect(() => {
        debouncedSearch(searchTerm);

        return () => {
            debouncedSearch.cancel();
        };
    }, [searchTerm, pathname, router, searchParams]);

    function handleLogout() {
        // Delete the 'token' cookie by setting expiry in the past
        document.cookie = 'token=; Max-Age=0; path=/;';

        // Redirect to login page
        router.push('/auth/login');
    }

    return (
        <nav className={`${isEuroleague ? 'bg-[#E67E22]' : isEurocup ? 'bg-[#3498DB]' : 'bg-gray-800'} text-white p-4 shadow-md`}>
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-6">
                    <Link href="/euroleague" className={`text-xl font-bold ${isEuroleague ? 'underline' : ''}`} aria-label="Euroleague Teams">
                        Euroleague Teams
                    </Link>
                    <Link href="/eurocup" className={`text-xl font-bold ${isEurocup ? 'underline' : ''}`} aria-label="Eurocup Teams">
                        Eurocup Teams
                    </Link>
                </div>

                <div className="flex items-center space-x-4 w-full sm:w-auto">
                    <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
                        <input
                            type="text"
                            placeholder="Search teams..."
                            className="w-full pl-10 pr-4 py-2 rounded text-black"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Search teams"
                        />
                        <SearchIcon className="absolute left-3 top-2.5 text-gray-500" />
                    </div>
                    <Link
                        href="/add-team"
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900 transition-colors"
                        aria-label="Add a new team"
                    >
                        Add Team
                    </Link>

                    {/* Logout button */}
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition-colors"
                        aria-label="Logout"
                        type="button"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}
