import { JSX, Suspense } from 'react';
import ClientPlayers from '@/components/players/ClientPlayers';

type PlayerPageProps = {
    params: Promise<{
        teamId: string;
    }>;
};

export default async function PlayerPage({ params }: PlayerPageProps): Promise<JSX.Element> {
    const resolvedParams = await params;
    const { teamId } = resolvedParams;
    console.log("IN PLAYERPAGE");

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
