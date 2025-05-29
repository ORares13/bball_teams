import { monitorSuspiciousUsers } from './monitorLogs';

export async function startMonitoringJob() {
    console.log(`[${new Date().toISOString()}] Running monitoring job...`);
    try {
        await monitorSuspiciousUsers();
        console.log(`[${new Date().toISOString()}] Monitoring job completed successfully.`);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Monitoring job failed:`, error);
    }
}