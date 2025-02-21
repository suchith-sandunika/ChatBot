import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

const HF_API_KEY = process.env.HUGGING_FACE_ACCESS_TOKEN_KEY;
const API_URL = process.env.HUGGINGFACE_MODEL2; // Free QA Model ...

router.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required." });
        }

        // 🔹 Company Context: Add more details for better responses
        const companyInfo = process.env.COMPANY_DETAILS;

        // 🔹 Send request to Hugging Face API
        const response = await axios.post(
            API_URL,
            { question: message, context: companyInfo },
            { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
        );

        let reply = response.data?.answer || "";
        let confidenceScore = response.data?.score || 0;

        console.log("Raw Model Response:", response.data); // Debugging

        // 🔹 Check if message is company-related
        const companyKeywords = process.env.COMPANY_KEYWORDS ? process.env.COMPANY_KEYWORDS.split(',') : [];
        const isCompanyRelated = companyKeywords.some(keyword => message.toLowerCase().includes(keyword));
        console.log(isCompanyRelated);
        // 🔹 If the response is empty, too short, or confidence is low
        if (!reply || reply.length < 3 || confidenceScore < 0.3) {
            // If the question is company-related, provide a more general response
            if (isCompanyRelated) {
                reply = "Gamage Recruiters is a recruitment agency specializing in staffing solutions. For more details, visit https://xyzcompany.com.";
            } else {
                // If it's unrelated, return the default message
                reply = "I'm sorry, but I can only provide information about Gamage Recruiters. Please visit https://xyzcompany.com for more details.";
            }
        }

        console.log("Final Reply:", reply, "| Confidence Score:", confidenceScore);
        res.status(200).send(reply);

    } catch (error) {
        console.error("Error from Hugging Face API:", error.response ? error.response.data : error.message);
        res.status(500).send("Chatbot is currently unavailable.");
    }
});

export default router;
