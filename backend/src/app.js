// src/app.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middlewares/errorHandler.js';
// import router from './routes/index.js';

const app = express();

// Security middlewares
app.use(helmet());

// Log requests (only in development)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Enable CORS
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true,
}));

// API Routes
// app.use('/api', router);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

// 404 Middleware
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;
