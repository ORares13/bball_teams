import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
    const userRole = req.headers.get('x-user-role');

    if (userRole !== 'ADMIN') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const monitoredUsers = await prisma.monitoredUser.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                },
            },
        },
    });

    return NextResponse.json(monitoredUsers);
}
