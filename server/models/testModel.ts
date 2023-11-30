import mongoose from "mongoose";

const testSchema  = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    }
})

export const Test = mongoose.models["tests"] || mongoose.model("tests",testSchema);
