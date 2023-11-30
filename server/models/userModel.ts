import mongoose from "../config/connectDb";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        matchesPlayed: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "OldMatche",
            },
        ],
        totalMatchesPlayed: {
            type: Number,
            default: 0,
        },
        totalMatchesWon: {
            type: Number,
            default: 0,
        },
        totalMatchesLost: {
            type: Number,
            default: 0,
        },
        totalMatchesDrawn: {
            type: Number,
            default: 0,
        },
        totalPoints: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export const User =
    mongoose.models["User"] || mongoose.model("User", userSchema);
