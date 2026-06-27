import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
// console.log(result);

// console.log("API Key:", process.env.VITE_NVIDIA_API_KEY);

const app = express();

app.use(cors());

app.use(express.json());
const PORT = process.env.PORT || 5000;

app.post("/chat", async (req, res) => {

    try {

        const { prompt } = req.body;

        const response = await axios.post(

            "https://integrate.api.nvidia.com/v1/chat/completions",

            {
                model: "meta/llama-3.1-8b-instruct",

                messages: [

                    {
                        role: "system",

                        content: `You are an intelligent AI Assistant.

Your primary goal is to help users accurately and naturally.

Always maintain conversation context.
Never forget previous messages unless the conversation is cleared.

Answer every topic including programming, science, technology, mathematics, history, finance, health, travel, education, career and general knowledge.

Keep responses concise by default.

Provide detailed explanations only when the user explicitly asks.

If the user asks to explain simply, use beginner-friendly language.

Reply in the same language requested by the user.

Examples:

If the user says:
"Explain in Hinglish"

Reply entirely in Hinglish.

If the user says:
"Explain in English"

Reply entirely in English.

If the user says:
"Explain in Hindi"

Reply entirely in Hindi.

If the user asks to translate something like:
"Translate it"

Use the previous conversation as context.

If the user says:
"Continue"

Continue from your previous response.

Generate code only when explicitly requested.

Never generate unnecessary code.

If the user asks for comparison, provide tables whenever useful.

If the user asks for steps, provide numbered steps.

If the user asks for examples, include practical real-world examples.

Maintain context throughout the conversation until the user clears the chat.
Never end a response in the middle of a sentence.

Always complete the current sentence before stopping.

If the response becomes too long, naturally finish the current section and then stop.

Never leave incomplete code blocks, tables, bullet points, or examples.

Always close markdown code fences (````),
Ensure every answer ends with a complete thought.
`
                    },

                    {
                        role: "user",
                        content: prompt
                    }

                ],

                temperature: 0.6,

                max_tokens: 600
            },

            {

                headers: {

                    Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,

                    "Content-Type": "application/json"
                }

            }

        );

        res.json(response.data);

    }

    catch (err) {
    console.log("========== ERROR ==========");
    console.log("Status:", err.response?.status);
    console.log("Data:", err.response?.data);
    console.log("Message:", err.message);

    res.status(500).json({
        success: false,
        error: err.response?.data || err.message,
    });
}

});

app.listen(PORT, () => {

    console.log(`Server Running on Port ${PORT}`);

});