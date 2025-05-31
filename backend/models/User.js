import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // assuming you have this already

    bio: { type: String, default: '' },
    profileImageUrl: { type: String, default: '' },

    contentStats: {
        totalGenerated: { type: Number, default: 0 },
        lastUsedType: { type: String, default: '' },
        mostUsedTone: { type: String, default: '' },
        toneCounts: {
            type: Map,
            of: Number,
            default: {}
        }
    }
});


export default mongoose.model("User", userSchema);
// module.exports = mongoose.model("User", userSchema);
