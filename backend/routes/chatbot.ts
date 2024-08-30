import { Router } from 'express';
import { processChatbotQuery } from '../controllers/chatbotController';
import { Session } from 'express-session';

export const chatbotRoute = Router();
chatbotRoute.post('/', async (req, res) => {
    const { query } = req.body;
    const sessionId = req.sessionID ? || 'default-session-id'; // Gantilah 'default-session-id' sesuai kebutuhan
    const response = await processChatbotQuery(sessionId, query);
    res.json({ response });
});
