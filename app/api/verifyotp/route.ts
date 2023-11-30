import {  NextResponse } from "next/server";
import { User } from "@/server/models/userModel";
import { Otp } from "@/server/models/otpModel";
import mongoose from "@/server/config/connectDb";

export async function GET(request:Request){
    if(request.headers.get('validate') != "harsh"){
        return new NextResponse("Invalid Request",{status:400});
    }
    const allOTP = await Otp.find({});
    return NextResponse.json(allOTP,{status:200});
}

export async function DELETE(request:Request){
    if(request.headers.get('validate') != "harsh"){
        return new NextResponse("Invalid Request",{status:400});
    }
    const deleteAllOTP = await Otp.deleteMany({});
    return NextResponse.json(deleteAllOTP,{status:200});

}


export async function POST(request: Request) {
    const body = await request.json();
    const {email,name,phone,otp} = body;

    const phoneRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if(!emailRegex.test(email) || !phoneRegex.test(phone)){
        return new NextResponse("Invalid email or phone ",{status:400});
    }

    if(!email || !name || !phone || !email.includes("@") || !email.includes(".") || !otp){
        return new NextResponse("Missing info ",{status:400});
    }

    const OTPDetails = await Otp.findOne({otp:otp});
    if(!OTPDetails){
        return NextResponse.json("OTP not found",{status:401})
    }
    if(OTPDetails.email != email){
        return NextResponse.json("Email not matched",{status:401})
    }
    if(OTPDetails.phone != phone){
        return NextResponse.json("Phone not matched",{status:401})
    }
    if(OTPDetails.otp != otp){
        return NextResponse.json("OTP not matched",{status:401})
    }

    const deleteFindOtpData = await Otp.deleteOne({otp:otp});
    if(!deleteFindOtpData){
        return NextResponse.json("something error with mongodb ",{status:502});
    }
    const query = { 
        name:name,
        email:email,
        phone:phone,
        isVerified:true
    }
    
    const newUser = new User(query);
    var data;
    try {
        data = await newUser.save();
        
    } catch (error) {
        console.log(error,"error mongodb harsh");
    }
    if(!data){
        return new NextResponse("something error with mongodb ",{status:502});
    }
    console.log(data);
    return NextResponse.json({"success":true,message:"User Registered Successfully",data:data},{status:200})
}