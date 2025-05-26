import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import AdminLayout from './layout';

export default function AdminPage() {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-xl mx-auto text-center">
            <h1 className="text-3xl text-red-600 font-extrabold mb-4">Welcome, Admin!</h1>
            <p className="text-black text-lg">
                Manage monitored users and more from this dashboard.
            </p>
        </div>
    );
}
