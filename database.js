import mongoose from 'mongoose';
import MONGODB_URI from './utils/config.js';
import { info , errors} from './utils/logger.js'

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        info('Connected to MongoDB');
    } catch (err) {
        errors('Error connecting to MongoDB:', err);
    }
};
