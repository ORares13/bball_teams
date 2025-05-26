import { Team } from "@/domains/teams/types";

export const mockTeams: Team[] = [
    {
        id: '1',
        name: 'Fenerbahçe Istanbul',
        country: 'Turkey',
        arena: 'Ülker Arena',
        logo: '/logos/fenerbahce.png',
        manager: 'Dimitris Itoudis',
        competition: 'euroleague',
        arenaCapacity: 0
    },
    {
        id: '2',
        name: 'Partizan Belgrade',
        country: 'Serbia',
        arena: 'Stark Arena',
        logo: '/logos/partizan.png',
        manager: 'Željko Obradović',
        competition: 'euroleague',
        arenaCapacity: 0
    },
    {
        id: '3',
        name: 'U-BT Cluj-Napoca',
        country: 'Romania',
        arena: 'BT Arena',
        logo: '/logos/ubt.png',
        manager: 'Mihai Silvasan',
        competition: 'eurocup',
        arenaCapacity: 0
    }
];

export const fetchTeamsByLeague = async (league: 'euroleague' | 'eurocup') => {
    return mockTeams.filter(team => team.competition === league);
};