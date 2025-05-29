import { startMonitoringJob } from '@/monitoring/cron';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    await startMonitoringJob();

    return NextResponse.json({ status: 'Monitoring job ran' });
}
