import express from 'express';
import cors from 'cors';
import { connectDB } from './database.js';
import quizRoutes from './routes/quizRoutes.js';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/quizzes', quizRoutes);

export default app;