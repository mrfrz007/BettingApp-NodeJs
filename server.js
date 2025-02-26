const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// const customerRoutes = require('./routes/customerRoutes');
// const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies
// Middleware
// app.use(express.json());
// app.use(cors());

// Routes
app.use('/api/auth' , require('./routes/authRoutes'));
app.use('/api/matches' , require('./routes/matchRoutes'));
// app.use('/api/bets' , require('./routes/betRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`);
})