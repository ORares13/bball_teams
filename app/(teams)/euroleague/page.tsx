import EuroleagueClient from '@/components/teams/EuroleagueClient';
import { Suspense } from 'react';

export default function EuroleaguePage() {
    return (
        <Suspense fallback={<div>Loading Euroleague teams...</div>}>
            <EuroleagueClient />
        </Suspense>
    );
}
