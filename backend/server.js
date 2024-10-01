const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const quizRoutes = require('./routes/quizRoutes');
const connectDB = require('./config/db');
const app = express();
const port = 3000;

app.use(cors())

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/quiz', quizRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
