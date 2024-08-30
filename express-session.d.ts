import session from 'express-session';

declare module 'express-session' {
    interface SessionData {
        sessionID: string;
        history: { query: string, timestamp: Date }[];
    }
}
