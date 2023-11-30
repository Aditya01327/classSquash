import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
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
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
    },
    venue:{
        type: String,
        required: true,
    },
    points:{
        type: Number,
        required: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    time:{
        type:String,
        required:true
    }
},
{
    timestamps: true,
}
);

export const OldMatche = mongoose.models["oldMatch"] || mongoose.model("oldMatch", matchSchema);
