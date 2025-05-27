import { Suspense } from 'react';
import AddTeamClient from '@/components/teams/AddTeamClient';

export default function AddTeamPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AddTeamClient />
        </Suspense>
    );
}
