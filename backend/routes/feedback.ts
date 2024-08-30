import { Router } from 'express';
import { processFeedback } from '../controllers/feedbackController';

export const feedbackRoute = Router();

feedbackRoute.post('/', async (req, res) => {
    const { feedback } = req.body;
    await processFeedback(feedback);
    res.status(200).send('Feedback received');
});
