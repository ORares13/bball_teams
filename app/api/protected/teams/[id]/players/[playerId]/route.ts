import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { playerSchema } from '@/domains/teams/schemas';

export async function PUT(req: NextRequest, { params }: { params: { playerId: string; id: string } }) {
    const body = await req.json();

    const dataToValidate = { ...body, teamId: params.id };
    const parsed = playerSchema.safeParse(dataToValidate);

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    try {
        const updatedPlayer = await prisma.player.update({
            where: { id: params.playerId },
            data: parsed.data,
        });
        // Logging
        const userId = req.headers.get('x-user-id');
        if (userId) {
            await prisma.log.create({
                data: {
                    userId,
                    action: 'UPDATE_PLAYER',
                    entity: 'PLAYER',
                    entityId: params.playerId,
                },
            });
        }
        return NextResponse.json(updatedPlayer);
    } catch (error) {
        return NextResponse.json({ error: 'Player not found or update failed' }, { status: 404 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { playerId: string } }) {
    try {
        await prisma.player.delete({
            where: { id: params.playerId },
        });

        // Logging
        const userId = req.headers.get('x-user-id');
        if (userId) {
            await prisma.log.create({
                data: {
                    userId,
                    action: 'DELETE_PLAYER',
                    entity: 'PLAYER',
                    entityId: params.playerId,
                },
            });
        }

        return NextResponse.json({ message: 'Player deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Player not found or delete failed' }, { status: 404 });
    }
}

