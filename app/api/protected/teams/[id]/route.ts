import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { teamSchema } from '@/domains/teams/schemas';

export async function PUT(req: NextRequest) {
    const userId = req.headers.get('x-user-id');
    const body = await req.json();

    const parsed = teamSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const id = extractIdFromUrl(req.url);
    if (!id) {
        return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    try {
        const updated = await prisma.team.update({
            where: { id },
            data: parsed.data,
        });

        //Log the update
        if (userId) {
            await prisma.log.create({
                data: {
                    userId,
                    action: 'UPDATE_TEAM',
                    entity: 'TEAM',
                    entityId: id,
                },
            });
        }

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'Team not found or update failed' }, { status: 404 });
    }
}

export async function DELETE(req: NextRequest) {
    const userId = req.headers.get('x-user-id');
    const id = extractIdFromUrl(req.url);
    if (!id) {
        return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    try {
        await prisma.team.delete({
            where: { id },
        });

        // Log the delete
        if (userId) {
            await prisma.log.create({
                data: {
                    userId,
                    action: 'DELETE_TEAM',
                    entity: 'TEAM',
                    entityId: id,
                },
            });
        }

        return NextResponse.json({ message: 'Team deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Team not found or delete failed' }, { status: 404 });
    }
}

function extractIdFromUrl(url: string): string | null {
    const match = url.match(/\/api\/(?:protected\/)?teams\/([^\/\?]+)/);
    return match ? match[1] : null;
}
