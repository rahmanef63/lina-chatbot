import { Router } from 'express';
import { processChatbotQuery } from '../controllers/chatbotController';

export const chatbotRoute = Router();

chatbotRoute.post('/', async (req, res) => {
    const { query } = req.body;
    const response = await processChatbotQuery(query);
    res.json({ response });
});
