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

// Route to get quizzes by category (case-insensitive)
router.get('/:category', async (req, res) => {
    const { category } = req.params;
    try {
        // Use regular expression for case-insensitive search within the categories array
        const quizzes = await Quiz.find({ categories: { $regex: new RegExp(category, 'i') } });
        if (!quizzes || quizzes.length === 0) {
            return res.status(404).json({ message: `No quizzes found for category: ${category}` });
        }
        res.json(quizzes);
    } catch (err) {
        console.error(`Error fetching quizzes for category ${category}:`, err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
