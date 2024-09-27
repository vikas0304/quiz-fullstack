import express from 'express';
import { getAllQuizzes , getQuizByID , getQuizByCategory  , createQuiz , updateQuiz , deleteQuiz } from '../controllers/quizControllers.js';

const router = express.Router();

// Route to get all quizzes
router.get('/' , getAllQuizzes)

// Route to get quizzes by ID
router.get('/:id', getQuizByID);

// Route to get quizzes by category (case-insensitive)
router.get('/category/:category', getQuizByCategory);

// Route to add a new quiz
router.post('/', createQuiz );


// Route to update a quiz by ID
router.put('/:id', updateQuiz );

// Route to delete a quiz by ID
router.delete('/:id', deleteQuiz );

export default router;
