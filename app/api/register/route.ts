import { NextResponse } from "next/server";
import { User } from "@/server/models/userModel";
import { Otp } from "@/server/models/otpModel";
import { cMail } from "@/server/config/nodeMailer";
import mongoose from "@/server/config/connectDb";

export async function GET(request:Request){
    if(request.headers.get('validate') != "harsh"){
        return new NextResponse("Invalid Request",{status:400});
    }
    const allUsers = await User.find({});
    return NextResponse.json(allUsers,{status:200});
}
export async function DELETE(request:Request){
    if(request.headers.get('validate') != "harsh"){
        return new NextResponse("Invalid Request",{status:400});
    }
    const deleteAllUsers = await User.deleteMany({});
    return NextResponse.json(deleteAllUsers,{status:200});

}



export async function POST(request: Request) {
    const body = await request.json();
    const {email,name,phone} = body;

    // regex for email validation
    const phoneRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if(!emailRegex.test(email) || !phoneRegex.test(phone)){
        return new NextResponse("Invalid email or phone ",{status:400});
    }

    if(!email || !name || !phone){
        return new NextResponse("Missing info ",{status:400});
    }
    let details = await User.findOne({ $or: [{ email: email }, { phone: phone }] });
    if (details) {
        return NextResponse.json("Email or phone already exists",{status:401})
    }

    let OTPDetails = await Otp.findOne({ $or: [{ email: email }, { phone: phone }] });

    if(OTPDetails){
        //update otp and resend information
        const OTP = Math.floor(100000 + Math.random() * 900000);
        const query = { 
            email:email,
            phone:phone,
            otp:OTP
        }
        try {
            await Otp.findOneAndUpdate({ $or: [{ email: email }, { phone: phone }] },query,{
                upsert: true,
            });
        } catch (error) {
            console.log(error,"error mongodb harsh");
        }
        cMail(email,"OTP for registration",`Your OTP for registration is ${OTP}`);
        return NextResponse.json("OTP Resent Successfully",{status:201})
    }


    const OTP = Math.floor(100000 + Math.random() * 900000);
    const query = { 
        email:email,
        phone:phone,
        otp:OTP
    }

    const newOTP = new Otp(query);
    var data;
    try {
        data = await newOTP.save();
        
    } catch (error) {
        console.log(error,"error mongodb harsh");
    }
    if(!data){
        return new NextResponse("something error with mongodb ",{status:502});
    }
    cMail(email,"OTP for registration",`Your OTP for registration is ${OTP}`);
    return NextResponse.json({"success":true,data:data},{status:200})
}