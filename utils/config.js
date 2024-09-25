import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export const PORT = 3001;
const MONGODB_URI = process.env.MONGODB_URI;

export default MONGODB_URI;
