import mongoose from 'mongoose';
import MONGODB_URI from './utils/config.js';

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};
