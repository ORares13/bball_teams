import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { playerSchema } from '@/domains/teams/schemas';

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    console.log("IN GET FOR PLAYERS");
    try {
        const params = await props.params;
        const searchParams = req.nextUrl.searchParams;
        const search = searchParams.get('search')?.toLowerCase() ?? '';
        const teamid = params.id;
        const players = await prisma.player.findMany({
            where: {
                teamId: teamid,
                name: {
                    contains: search,
                    mode: 'insensitive',
                },
            },
        });

        return NextResponse.json(players);
    } catch (error) {
        console.error('GET /players error:', error);
        return NextResponse.json({ error: 'Failed to fetch players' }, { status: 500 });
    }
}



export async function POST(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const body = await req.json();


    const dataToValidate = { ...body, teamId: params.id };
    const parsed = playerSchema.safeParse(dataToValidate);

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    try {
        const newPlayer = await prisma.player.create({
            data: parsed.data,
        });
        // Logging
        const userId = req.headers.get('x-user-id');
        if (userId) {
            await prisma.log.create({
                data: {
                    userId,
                    action: 'CREATE_PLAYER',
                    entity: 'PLAYER',
                    entityId: newPlayer.id,
                },
            });
        }
        return NextResponse.json(newPlayer, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create player' }, { status: 500 });
    }
}
