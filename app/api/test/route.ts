import { NextResponse } from "next/server";
import { Test } from "@/server/models/testModel";
import mongoose from "@/server/config/connectDb";


export async function POST(request: Request) {
    const body = await request.json();
    const {email,name} = body;

    if(!email || !name){
        return new NextResponse("Missing info ",{status:400});
    }
    let details = await Test.findOne({ email });
    if (details) {
        return NextResponse.json("already exists",{status:401})
    }
    const query = { 
        name:name,
        email:email
    }
    const newTestUser = new Test(query);
    var data;
    try {
        data = await newTestUser.save();
        
    } catch (error) {
        console.log(error,"error mongodb harsh");
    }
    if(!data){
        return new NextResponse("something error with mongodb ",{status:502});
    }
    console.log(data);
    return NextResponse.json({"success":true,test:data},{status:200})
}