import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

export default MONGODB_URI;
