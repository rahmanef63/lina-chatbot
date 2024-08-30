import express from 'express';
import { chatbotRoute } from './routes/chatbot';
import { feedbackRoute } from './routes/feedback';

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Rute API
app.use('/api/chatbot', chatbotRoute);
app.use('/api/feedback', feedbackRoute);

// Jalankan server di port tertentu
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
