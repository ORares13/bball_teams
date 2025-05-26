import { Interface } from "readline";

export type Competition = 'euroleague' | 'eurocup';
export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C';
export interface Team {
    id: string;
    name: string;
    country: string;
    arena: string;
    arenaCapacity: number;
    logo: string;
    manager: string;
    competition: Competition;
}

export interface Player {
    id: string;
    name: string;
    position: Position;
    age: number;
    teamId: string;
}



export type TeamFormValues = Omit<Team, 'id'>;
export type PlayerFormValues = Omit<Player, 'id' | 'teamId'>