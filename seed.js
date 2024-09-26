import mongoose from 'mongoose';
import Quiz from './models/Quiz.js';
import MONGODB_URI from './utils/config.js';

const mongoURI = MONGODB_URI; 

const seedQuizzes = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Clear existing quizzes
    await Quiz.deleteMany({});

    // Define new quiz data
    const quizzes = [
      {
        question: "What is the capital of India?",
        options: [
          { text: "Delhi", isCorrect: true },
          { text: "Mumbai", isCorrect: false },
          { text: "Bangalore", isCorrect: false },
          { text: "Chennai", isCorrect: false },
        ],
        categories: ["Geography"],
        difficulty: "easy",
      },
      {
        question: "What is the largest planet in our solar system?",
        options: [
          { text: "Earth", isCorrect: false },
          { text: "Jupiter", isCorrect: true },
          { text: "Mars", isCorrect: false },
          { text: "Saturn", isCorrect: false },
        ],
        categories: ["Astronomy"],
        difficulty: "medium",
      },
      {
        question: "What is the chemical symbol for water?",
        options: [
          { text: "O2", isCorrect: false },
          { text: "H2O", isCorrect: true },
          { text: "CO2", isCorrect: false },
          { text: "H2", isCorrect: false },
        ],
        categories: ["Chemistry"],
        difficulty: "easy",
      },
    ];

    // Insert the quiz data
    await Quiz.insertMany(quizzes);
    console.log('Quizzes inserted successfully');

  } catch (error) {
    console.error('Error inserting quizzes:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
};

seedQuizzes();
