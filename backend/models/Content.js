import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["blog", "tweet", "linkedin"],
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    tone: {
        type: String,
        default: "professional"
    },
    length: {
        type: String,
        enum: ["short", "medium", "long"],
        default: "medium"
    },
    content: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Content", contentSchema);
// module.exports = mongoose.model("Content", contentSchema);
