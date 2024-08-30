import fs from 'fs';
import path from 'path';

export function storeFeedback(sessionId: string, feedback: string) {
    const logPath = path.join(process.cwd(), 'feedback_log.json');
    const logData = { sessionId, feedback, timestamp: Date.now() };

    fs.appendFileSync(logPath, JSON.stringify(logData) + '\n');
}
