// middleware/notFound.js
const validRoutes = [
    '/api/quizzes',
    '/api/quizzes/category/:category',
    '/api/quizzes/:id',
    // Add more routes as needed
];

const notFoundMiddleware = (req, res, next) => {
    const requestedUrl = req.originalUrl;

    // Find similar routes
    

    res.status(404).json({
        message: 'Route not found',
        url: requestedUrl,
        suggestions: validRoutes
    });
};

export default notFoundMiddleware;
