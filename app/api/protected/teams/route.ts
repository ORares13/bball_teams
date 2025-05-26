import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { teamSchema } from '@/domains/teams/schemas';
import { Competition } from '@/lib/generated/prisma';

export async function POST(req: Request) {
    const body = await req.json();

    const parsed = teamSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const team = await prisma.team.create({
        data: parsed.data,
    });

    // Extract userId from custom header (set by middleware)
    const userId = req.headers.get('x-user-id');

    // Log the creation action
    if (userId) {
        await prisma.log.create({
            data: {
                userId,
                action: 'CREATE_TEAM',
                entity: 'TEAM',
                entityId: team.id,
            },
        });
    }

    return NextResponse.json(team);

}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const competitionParam = searchParams.get('competition');
    const search = searchParams.get('search') ?? undefined;
    const sort = searchParams.get('sort') ?? 'asc';
    let competitionFilter;
    if (competitionParam) {

        const competitionValue = competitionParam as Competition;


        if (Object.values(Competition).includes(competitionValue)) {
            competitionFilter = { equals: competitionValue };
        } else {
            return NextResponse.json(
                { error: 'Invalid competition value' },
                { status: 400 }
            );
        }
    }
    const teams = await prisma.team.findMany({
        where: {
            competition: competitionFilter,
            name: search ? { contains: search, mode: 'insensitive' } : undefined,
        },
        orderBy: {
            name: sort === 'desc' ? 'desc' : 'asc',
        },
    });

    return NextResponse.json(teams);
}
