import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AppNavbar from '@/components/layout/Navbar';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Basketball Teams Manager',
};

export default function TeamsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Suspense fallback={<div>Loading navbar...</div>}>
                <AppNavbar />
            </Suspense>
            <main className={`container mx-auto p-4 ${inter.className}`}>
                {children}
            </main>
        </>
    );
}
