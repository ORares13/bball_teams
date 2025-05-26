import { z } from 'zod';

export const teamSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Team name is required'),
    country: z.string().min(1, 'Country is required'),
    arena: z.string().min(1, 'Arena is required'),
    arenaCapacity: z.number().min(2500, 'Arena capacity must be at least 2500'),
    logo: z.string().min(1, 'Logo URL must be a valid URL'),
    manager: z.string().min(1, 'Manager name is required'),
    competition: z.enum(['euroleague', 'eurocup'])
        .refine(value => ['euroleague', 'eurocup'].includes(value), {
            message: 'Invalid competition type',
        }),
});

export const playerSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Player name is required'),
    position: z.enum(['PG', 'SG', 'SF', 'PF', 'C']),
    age: z.number().min(16, 'Player must be at least 16 years old'),
    teamId: z.string().min(1, 'Team ID is required'),
});


export type Team = z.infer<typeof teamSchema>;
export type Player = z.infer<typeof playerSchema>;
