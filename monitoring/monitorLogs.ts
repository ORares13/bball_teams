import { prisma } from '@/lib/prisma';
import { subMinutes } from 'date-fns';

const ACTION_THRESHOLD = 10;
const WINDOW_MINUTES = 5;

export async function monitorSuspiciousUsers() {
    const since = subMinutes(new Date(), WINDOW_MINUTES);


    const suspiciousUsers = await prisma.log.groupBy({
        by: ['userId'],
        where: {
            timestamp: {
                gte: since,
            },
            action: {
                in: [
                    'DELETE_TEAM', 'DELETE_PLAYER',
                    'CREATE_TEAM', 'CREATE_PLAYER',
                    'UPDATE_TEAM', 'UPDATE_PLAYER'
                ],
            },
        },
        _count: {
            userId: true,
        },
        having: {
            userId: {
                _count: {
                    gt: ACTION_THRESHOLD,
                },
            },
        },
    });

    console.log(suspiciousUsers);
    for (const user of suspiciousUsers) {
        const exists = await prisma.monitoredUser.findUnique({
            where: { userId: user.userId },
        });
        console.log(exists);
        if (!exists) {
            console.log(user.userId)
            await prisma.monitoredUser.create({
                data: {
                    userId: user.userId,
                    reason: `High activity: ${user._count.userId} actions in ${WINDOW_MINUTES} minutes`,
                },
            });
        }
    }
}
