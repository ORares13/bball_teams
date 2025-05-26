import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(req: Request) {
    const { username, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const valid = await verifyPassword(password, user.password);
    if (!valid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const token = await generateToken({ userId: user.id, role: user.role });

    const response = NextResponse.json({ success: true });
    response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
    });

    return response;
}
