import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'Ue8$@14kFz!9nVxZ';
const secret = new TextEncoder().encode(JWT_SECRET);

export function hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
}

export function verifyPassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
}

export async function generateToken(payload: { userId: string; role: string }) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(secret);
}

export async function verifyToken(token: string): Promise<{ userId: string; role: string }> {
    const { payload } = await jwtVerify(token, secret);
    return payload as { userId: string; role: string };
}
