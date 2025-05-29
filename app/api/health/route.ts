import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        await prisma.$queryRaw`SELECT 1`;  // simple DB ping query
        return NextResponse.json({ status: 'ok', db: 'connected' });
    } catch (error: unknown) {
        // Narrow the type to check if it's an Error instance
        let message = 'Unknown error';
        if (error instanceof Error) {
            message = error.message;
        }
        return NextResponse.json({ status: 'error', message }, { status: 500 });
    }
}

