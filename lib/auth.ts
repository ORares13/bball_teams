import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
}
const secret = new TextEncoder().encode(process.env.JWT_SECRET);


export function hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
}

export function verifyPassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
}

export async function generateToken(payload: { userId: string; role: string }) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('24h')
        .sign(secret);
}

export async function verifyToken(token: string): Promise<{ userId: string; role: string }> {
    const { payload } = await jwtVerify(token, secret);

    if (typeof payload.userId !== 'string' || typeof payload.role !== 'string') {
        throw new Error('Invalid token payload');
    }

    return payload as { userId: string; role: string };
}

