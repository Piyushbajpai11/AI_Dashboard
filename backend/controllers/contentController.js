import Content from "../models/Content.js";
// Placeholder: Replace with actual Grok API integration
import generateContentFromGrok from "../utils/grokHelper.js";

export const createContent = async (req, res) => {
    const { type, topic, tone, length } = req.body;

    try {
        const generated = await generateContentFromGrok({ type, topic, tone, length });

        const newContent = await Content.create({
            user: req.user.id,
            type,
            topic,
            tone,
            length,
            content: generated
        });

        res.status(201).json(newContent);
    } catch (error) {
        console.error("Error generating content:", error.message);
        res.status(500).json({ message: "Failed to generate content." });
    }
};

export const getAllContent = async (req, res) => {
    try {
        const userContent = await Content.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(userContent);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch history." });
    }
};

export const deleteContent = async (req, res) => {
    const { id } = req.params;

    try {
        const content = await Content.findOneAndDelete({ _id: id, user: req.user.id });

        if (!content) {
            return res.status(404).json({ message: "Content not found or unauthorized." });
        }

        res.status(200).json({ message: "Content deleted successfully." });
    } catch (error) {
        console.error("Error deleting content:", error.message);
        res.status(500).json({ message: "Failed to delete content." });
    }
};

// export default { createContent, getAllContent };

// module.exports = { createContent, getAllContent };
