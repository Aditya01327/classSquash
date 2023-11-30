import { NextResponse } from "next/server";
import { User } from "@/server/models/userModel";

import mongoose from "@/server/config/connectDb";


export async function POST(request: Request) {
    const body = await request.json();
    const {email,phone} = body;

    // regex for email validation
    const phoneRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if(!emailRegex.test(email) || !phoneRegex.test(phone)){
        return new NextResponse("Invalid email or phone ",{status:400});
    }

    if(!email || !phone){
        return new NextResponse("Missing info ",{status:400});
    }
    let data = await User.findOne({ email: email });
    if (!data) {
        return NextResponse.json("User doesn't exsist",{status:401})
    }
    if(data.email != email){
        return NextResponse.json("Email not matched",{status:401})
    }
    if(data.phone != phone){
        return NextResponse.json("Phone not matched",{status:401})
    }
    return NextResponse.json({"success":true,data:data},{status:200})
}