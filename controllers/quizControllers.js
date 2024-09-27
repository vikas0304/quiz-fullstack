import Quiz from "../models/Quiz.js";
import { info , errors} from '../utils/logger.js'

export const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find(); 
        res.json(quizzes); 
    } catch (err) {
        errors('Error fetching quizzes:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getQuizByID = async(req , res) => {
    const { id } = req.params; 
    try {
        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return res.status(404).json({ message: `No quiz found with id: ${id}` });
        }
        res.json(quiz);
    } catch (err) {
        errors(`Error fetching quiz with id ${id}:`, err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getQuizByCategory = async ( req , res ) => {
    const { category } = req.params;
    try {
        const quizzes = await Quiz.find({ categories: { $regex: new RegExp(category, 'i') } });
        if (!quizzes || quizzes.length === 0) {
            return res.status(404).json({ message: `No quizzes found for category: ${category}` });
        }
        res.json(quizzes);
    } catch (err) {
        errors(`Error fetching quizzes for category ${category}:`, err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createQuiz = async (req, res) => {
    const { question, options, categories, difficulty } = req.body;
    try {
        // Validate input fields
        if (!question || !options || !categories || !difficulty) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (options.length !== 4) {
            return res.status(400).json({ message: 'There must be exactly 4 options' });
        }

        // Check if the question already exists
        const existingQuiz = await Quiz.findOne({ question });
        if (existingQuiz) {
            return res.status(400).json({ message: 'A quiz with this question already exists' });
        }

        // Create a new quiz
        const newQuiz = new Quiz({
            question,
            options,
            categories,
            difficulty
        });

        // Save the new quiz
        const savedQuiz = await newQuiz.save();
        res.status(201).json(savedQuiz);
    } catch (err) {
        errors('Error saving quiz:', err.message); // Log the exact error
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}


export const updateQuiz = async ( req , res ) => {
    const { id } = req.params;
    const { question, options, categories, difficulty } = req.body;

    try {
        // Check if the quiz exists
        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return res.status(404).json({ message: `No quiz found with id: ${id}` });
        }

        // Update the quiz fields
        quiz.question = question !== undefined ? question : quiz.question;
        quiz.options = options !== undefined ? options : quiz.options;
        quiz.categories = categories !== undefined ? categories : quiz.categories;
        quiz.difficulty = difficulty !== undefined ? difficulty : quiz.difficulty;

        // Save the updated quiz
        const updatedQuiz = await quiz.save();
        res.json(updatedQuiz);
    } catch (err) {
        errors(`Error updating quiz with id ${id}:`, err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deleteQuiz = async (req , res) => {
    const { id } = req.params;

    try {
        // Check if the quiz exists
        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return res.status(404).json({ message: `No quiz found with id: ${id}` });
        }

        // Delete the quiz
        await Quiz.findByIdAndDelete(id);
        res.json({ message: 'Quiz deleted successfully' });
    } catch (err) {
        errors(`Error deleting quiz with id ${id}:`, err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}