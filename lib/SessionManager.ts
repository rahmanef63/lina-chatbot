type Session = {
    id: string;
    data: { [key: string]: any };
    lastAccess: number;
};

const sessions: { [key: string]: Session } = {};

export function getSession(sessionId: string): Session {
    const session = sessions[sessionId];
    if (session) {
        session.lastAccess = Date.now();
        return session;
    }
    const newSession = { id: sessionId, data: {}, lastAccess: Date.now() };
    sessions[sessionId] = newSession;
    return newSession;
}

export function updateSession(sessionId: string, data: { [key: string]: any }) {
    const session = getSession(sessionId);
    session.data = { ...session.data, ...data };
    sessions[sessionId] = session;
}
