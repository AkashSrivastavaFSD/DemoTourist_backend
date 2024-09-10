// backend/server.js
import express from 'express';
import adminRouter from './routes/adminRouter.js';
import userRouter from './routes/users.routes.js';
import cors from 'cors';
import session from 'express-session';
import connectDB from './db/connectdb.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || '8000';

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // Allow frontend to access backend with cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Use environment variable for session secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS in production
      httpOnly: true,
    },
  })
);

// Routes setup
app.use('/user', userRouter);
app.use('/admin', adminRouter);

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});