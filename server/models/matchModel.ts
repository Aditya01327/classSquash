import mongoose from "../config/connectDb";

const matchSchema = new mongoose.Schema(
    {
        player1: {
            player: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            score: {
                type: Number,
                required: true,
                default: 0,
            },
        },
        player2: {
            player: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            score: {
                type: Number,
                required: true,
                default: 0,
            },
        },
        venue: {
            type: String,
            required: true,
        },
        points: {
            type: Number,
            required: true,
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps: true,
    }
);

export const Match =
    mongoose.models["match"] || mongoose.model("match", matchSchema);
