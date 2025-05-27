import { Suspense } from 'react';
import EurocupClient from '@/components/teams/EurocupClient';

export default function EurocupPage() {
    return (
        <Suspense fallback={<div>Loading Eurocup teams...</div>}>
            <EurocupClient />
        </Suspense>
    );
}
