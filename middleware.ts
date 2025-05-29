import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        const isApiRoute = req.nextUrl.pathname.startsWith('/api');
        return isApiRoute
            ? NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
            : NextResponse.redirect(new URL('/auth/login', req.url));
    }

    try {
        console.log(token);
        const user = await verifyToken(token);
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set('x-user-id', user.userId);
        requestHeaders.set('x-user-role', user.role);

        return NextResponse.next({ request: { headers: requestHeaders } });
    } catch (err) {
        console.error("Token verification failed:", err);
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

}

export const config = {
    matcher: ['/api/protected/:path*', '/euroleague', '/eurocup'],
};

