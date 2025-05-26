import cron from 'node-cron';
import { monitorSuspiciousUsers } from './monitorLogs';

export function startMonitoringJob() {
    cron.schedule('*/5 * * * *', async () => {
        console.log(`[${new Date().toISOString()}] Running monitoring job...`);
        try {
            await monitorSuspiciousUsers();
            console.log(`[${new Date().toISOString()}] Monitoring job completed successfully.`);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Monitoring job failed:`, error);
        }
    });
}
