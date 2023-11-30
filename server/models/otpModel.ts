import mongoose from "mongoose";


const otpSchema  = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    otp:{
        type:Number
    }
})

export const Otp = mongoose.models["otp"] || mongoose.model("otp",otpSchema);