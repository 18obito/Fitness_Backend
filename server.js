const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({origin: "https://glittery-concha-fc39dd.netlify.app"}));

// Ensure this line is correct
app.use('/api/auth', require('./routes/authRoutes')); 
app.use('/api/workouts', require('./routes/workoutRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
