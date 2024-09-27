// middleWare/loggerMiddleware.js
import { createLogger, format, transports } from 'winston';

// Create a Winston logger instance
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level}: ${message}`; // Simplified log format
        })
    ),
    transports: [
        new transports.Console(),  // Log to console
        new transports.File({ filename: 'combined.log' }) // Optional: Log to file
    ],
});

// Logging middleware
const logRequests = (req, res, next) => {
    logger.info(`HTTP ${req.method} ${req.url}`);
    
    // Log the request body for POST and PUT requests
    if (req.method === 'POST' || req.method === 'PUT') {
        logger.info(`Request Body: ${JSON.stringify(req.body)}`);
    }
    
    next();
};

export { logger, logRequests };
