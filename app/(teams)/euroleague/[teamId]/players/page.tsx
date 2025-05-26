import { Player } from '@/domains/teams/types';
import PlayerCard from '@/components/players/PlayerCard';
import AddPlayerModal from '@/components/players/AddPlayerModal';
import PlayerAgeChart from '@/components/players/PlayerAgeChart';
import { Suspense } from 'react';
import ClientPlayers from '@/components/players/ClientPlayers';

interface PageProps {
    params: { teamId: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}


export default async function PlayersPage({ params }: PageProps) {
    const { teamId } = await params;


    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto p-4">
                <Suspense fallback={<p>Loading players...</p>}>

                    <ClientPlayers teamId={teamId} />
                </Suspense>
            </div>
        </div>
    );
}
