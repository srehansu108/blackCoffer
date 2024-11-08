import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './Config/db.js';
import dataRoutes from './Router/authRouter.js';

dotenv.config();
dbConnect();

const app = express();

// Enable CORS with default settings
app.use(cors());

app.use(express.json());

// Root route for basic API info
app.get('/', (req, res) => {
   res.send('Welcome to the API! Use /api/data to get data.');
});

// Routes for data
app.use('/api', dataRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
