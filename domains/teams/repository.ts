import { Team, TeamFormValues, Competition } from './types';
import { teamSchema } from './schemas';

class TeamRepository {
    private static instance: TeamRepository;
    private teams: Team[] = [
        {
            id: '1',
            name: 'Fenerbahçe',
            country: 'Turkey',
            arena: 'Ülker Arena',
            arenaCapacity: 7500,
            logo: '/logos/fenerbahce.png',
            manager: 'Dimitris Itoudis',
            competition: 'euroleague'
        },
        {
            id: '2',
            name: 'AS Monaco',
            country: 'France',
            arena: 'Salle Gaston Médecin',
            arenaCapacity: 5000,
            logo: '/logos/monaco.png',
            manager: 'Sasa Obradovic',
            competition: 'euroleague'
        },
        {
            id: '3',
            name: 'U-BT Cluj-Napoca',
            country: 'Romania',
            arena: 'BT Arena',
            arenaCapacity: 10000,
            logo: '/logos/clujnapoca.png',
            manager: 'Mihai Silvasan',
            competition: 'eurocup'
        },
        {
            id: '4',
            name: 'FC Barcelona',
            country: 'Spain',
            arena: 'Palau Blaugrana',
            arenaCapacity: 8900,
            logo: '/logos/barcelona.png',
            manager: 'Roger Grimau',
            competition: 'euroleague'
        },
        {
            id: '5',
            name: 'Virtus Bologna',
            country: 'Italy',
            arena: 'Virtus Segafredo Arena',
            arenaCapacity: 9000,
            logo: '/logos/virtus.png',
            manager: 'Luca Banchi',
            competition: 'euroleague'
        },
        {
            id: '6',
            name: 'Cedevita Olimpija',
            country: 'Slovenia',
            arena: 'Arena Stožice',
            arenaCapacity: 3400,
            logo: '/logos/cedevita.png',
            manager: 'Jurica Golemac',
            competition: 'eurocup'
        },
        {
            id: '7',
            name: 'Partizan Belgrade',
            country: 'Serbia',
            arena: 'Štark Arena',
            arenaCapacity: 20000,
            logo: '/logos/partizan.png',
            manager: 'Željko Obradović',
            competition: 'euroleague'
        }
    ];

    private constructor() { }

    static getInstance(): TeamRepository {
        if (!TeamRepository.instance) {
            TeamRepository.instance = new TeamRepository();
        }
        return TeamRepository.instance;
    }

    async getByLeague(league: Competition, search = ''): Promise<Team[]> {
        return this.teams
            .filter(team => team.competition === league)
            .filter(team =>
                team.name.toLowerCase().includes(search.toLowerCase()) ||
                team.country.toLowerCase().includes(search.toLowerCase())
            );
    }

    async getById(id: string): Promise<Team | undefined> {
        return this.teams.find(team => team.id === id);
    }

    async create(team: TeamFormValues): Promise<Team> {
        // Validate input using Zod schema
        const result = teamSchema.safeParse(team);
        if (!result.success) {
            throw new Error(`Validation failed: ${result.error.message}`);
        }

        const newTeam = {
            ...team,
            id: Math.random().toString(36).substring(2, 9),
        };

        this.teams.push(newTeam);
        return newTeam;
    }

    async update(id: string, updates: Partial<TeamFormValues>): Promise<Team | null> {

        const result = teamSchema.safeParse(updates);
        if (!result.success) {
            throw new Error(`Validation failed: ${result.error.message}`);
        }

        const index = this.teams.findIndex(team => team.id === id);
        if (index === -1) return null;
        this.teams[index] = { ...this.teams[index], ...updates };
        return this.teams[index];
    }

    async delete(id: string): Promise<boolean> {
        const index = this.teams.findIndex(team => team.id === id);
        if (index === -1) return false;
        this.teams.splice(index, 1);
        return true;
    }
}

export default TeamRepository.getInstance();
