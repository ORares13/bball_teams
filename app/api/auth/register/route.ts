import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function POST(req: Request) {
    const { username, password } = await req.json();

    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) return NextResponse.json({ error: 'User exists' }, { status: 409 });

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
        data: { username, password: hashed },
    });

    return NextResponse.json({ id: user.id, username: user.username });
}
