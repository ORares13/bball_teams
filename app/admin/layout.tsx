import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import AppNavbar from '@/components/layout/Navbar';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const inter = Inter({ subsets: ['latin'] });

type AdminLayoutProps = {
    children: ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return (
                <p className="text-red-600 p-4">Unauthorized. Please login.</p>
            );
        }

        const { userId, role } = await verifyToken(token);

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user || role !== 'ADMIN') {
            return (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 max-w-xl mx-auto rounded shadow">
                    <p className="font-bold">Access Denied</p>
                    <p>You do not have permission to view this admin page.</p>
                </div>
            );
        }

        return (
            <>
                <AppNavbar />
                <div className={`flex min-h-[calc(100vh-64px)] bg-gray-100 ${inter.className}`}>
                    {/* Sidebar */}
                    <aside className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h1 className="text-xl font-semibold text-blue-600 tracking-wide">Admin Panel</h1>
                        </div>

                        <nav className="flex-1 px-4 py-6 space-y-4">
                            <div className="text-xs font-semibold text-gray-500 uppercase px-2">Navigation</div>

                            <Link
                                href="/admin"
                                className="block px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-800 font-medium transition-colors"
                            >
                                Dashboard
                            </Link>

                            <Link
                                href="/admin/monitored-users"
                                className="block px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-800 font-medium transition-colors"
                            >
                                Monitored Users
                            </Link>


                        </nav>


                    </aside>


                    {/* Main content */}
                    <main className="flex-1 p-6 overflow-auto">
                        {children}
                    </main>
                </div>
            </>
        );
    } catch {
        return <p className="text-red-600 p-4">Authentication error. Please login again.</p>;
    }
}
