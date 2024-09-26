import express from 'express';
import Quiz from '../models/Quiz.js'; 

const router = express.Router();

// Route to get all quizzes
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find(); 
        res.json(quizzes); 
    } catch (err) {
        console.error('Error fetching quizzes:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
