import mongoose from "mongoose";

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("connected successfully mongodb");
    } catch (error) {
        console.log(error , "error mongodb connection harsh error")
    }
};

const disconnectMongo = async () => {
    try {
        await mongoose.disconnect();
        console.log("disconnected successfully mongodb");
    } catch (error) {
        console.log(error , "error mongodb disconnection harsh error")
    }
};

connectMongo();
export default mongoose;
