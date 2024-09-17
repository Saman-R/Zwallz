import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import picturesRoute from './routes/pictureRoutes.js';
import cors from 'cors';


// Load environment variables from .env file

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware to handle CORS policy
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

// Root endpoint
app.get('/', (request, response) => {
    return response.status(200).send('Server is running');
});

// Use the pictures route
app.use('/pictures', picturesRoute);

// Connect Mongoose and start server
mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`App is listening on Port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Database connection error:', error);
    });
