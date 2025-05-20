import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const generateContentFromGrok = async ({ type, topic, tone, length }) => {
    const prompt = `Write a ${length} ${type} on "${topic}" in a ${tone} tone.`;

    try {
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "meta-llama/llama-4-scout-17b-16e-instruct",
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.GROK_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error("Grok API Error:", error.response?.data || error.message);
        throw new Error("AI content generation failed");
    }
};

export default generateContentFromGrok;

// module.exports = generateContentFromGrok;
