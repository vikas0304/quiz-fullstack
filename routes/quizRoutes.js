import express from 'express';
import Quiz from '../models/Quiz.js'; // Import your Quiz model

const router = express.Router();

// Route to get all quizzes
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find(); // Fetch all quizzes from the database
        res.json(quizzes); // Send quizzes as JSON response
    } catch (err) {
        console.error('Error fetching quizzes:', err);
        res.status(500).json({ message: 'Internal Server Error' }); // Send error response
    }
});

export default router;
