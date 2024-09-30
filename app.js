// Import necessary modules
import express from 'express';
import cors from 'cors';
import { connectDB } from './database.js';
import quizRoutes from './routes/quizRoutes.js';
import notFoundMiddleware from './middleWare/notFoundMiddleware.js';
import { logRequests } from './middleWare/loggerMiddleware.js'; // Import the logging middleware

// Initialize the Express app
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Use the custom logging middleware
app.use(logRequests); // Add logging middleware here


// Protect quiz routes with JWT middleware
app.use('/api/quizzes', quizRoutes);

// Error handling middleware for unexpected errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Error handling for 404
app.use(notFoundMiddleware);

// Export the app
export default app;
