const express = require('express');
const { CopilotRuntime, GoogleGenerativeAIAdapter, copilotRuntimeNodeHttpEndpoint } = require("@copilotkit/runtime");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors')
const bodyParser = require('body-parser');
const quizRoutes = require('./routes/quizRoutes');
const connectDB = require('./config/db');
const app = express();
const port = 3000;
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.use(cors())

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/quiz', quizRoutes);

// API endpoint to interact with Google Generative AI
app.post("/api", async (req, res) => {

  // Initialize the GoogleGenerativeAIAdapter with the genAI instance
  const serviceAdapter = new GoogleGenerativeAIAdapter({ model: genAI.getGenerativeModel({ model: "gemini-pro" }) });
  
  // Initialize the CopilotRuntime
  const runtime = new CopilotRuntime();

  // Set up the handler for the Copilot Kit endpoint
  const handler = copilotRuntimeNodeHttpEndpoint({
    endpoint: "/api", // Ensure the endpoint matches your request route
    runtime,
    serviceAdapter,
  });

  // Return the handler, which processes the request
  return handler(req, res);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
