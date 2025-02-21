import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import chatbotRoute from "./routes/chatbotRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000; // Use the PORT from .env, fallback to 5000 if undefined

// Middleware
app.use(cors());
app.use(express.json());

// Routes ...
app.use('/api/', chatbotRoute);

// Test Route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
