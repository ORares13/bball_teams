import { Suspense } from 'react';
import ClientPlayers from '@/components/players/ClientPlayers';

interface Props {
    params: {
        teamId: string;
    };
}

export default function PlayerPage({ params }: Props) {
    const { teamId } = params;

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
