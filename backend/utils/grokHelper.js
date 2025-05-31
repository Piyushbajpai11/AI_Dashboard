import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const generateContentFromGrok = async ({ type, topic, tone = "neutral", length = "medium" }) => {
    let prompt = "";

    const baseInstructions = `
You are an expert ${type} content creator. Your goal is to generate high-quality, human-like content that is engaging, relevant, and formatted professionally.
Topic: "${topic}"
Tone: ${tone}
Length: ${length}
`;

    switch (type.toLowerCase()) {
        case "blog":
            prompt = `
${baseInstructions}

**Formatting & Style Guidelines:**
- Format using strict Markdown
- Title: Use '# ' (only once at the top)
- Headings: Use '##' for sections and '###' for subpoints (if necessary)
- Avoid all non-standard formatting (like '====', asterisks for emphasis, etc.)
- Use normal paragraphs; bullet points only where they enhance clarity
- Line breaks should be clean and natural
- Use emojis only in friendly or casual tones (avoid overuse)
- Content must include natural keyword usage
- Write in a conversational, engaging tone
- End with a thought-provoking question or CTA to invite comments

`;
            break;

        case "tweet":
        case "x":
            prompt = `
${baseInstructions}

**X/Twitter Content Guidelines:**
- Max 280 characters
- No Markdown, formatting, or emoji abuse
- Keep it sharp, witty, platform-appropriate
- Use trending or niche-relevant hashtags
- Make every word count

`;
            break;

        case "linkedin":
            prompt = `
${baseInstructions}

**LinkedIn Content Guidelines:**
- Begin with a strong hook (1–2 sentences)
- Use short, impactful paragraphs (1–3 lines)
- No Markdown or formatting symbols
- Keep it professional yet personal
- Include relevant takeaways, insights, or lessons
- End with a CTA or open question to drive engagement
`;
            break;

        default:
            prompt = `
${baseInstructions}

**General Content Guidelines:**
- Ensure tone and structure are aligned with type: "${type}"
- Keep language clear, impactful, and reader-friendly
- Structure the content meaningfully
`;
    }

    try {
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "meta-llama/llama-4-scout-17b-16e-instruct",
                messages: [
                    {
                        role: "user",
                        content: prompt.trim(),
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROK_API_KEY}`,
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
