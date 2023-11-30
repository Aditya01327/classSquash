import { NextResponse } from "next/server";
import { User } from "@/server/models/userModel";
import mongoose from "@/server/config/connectDb";
import { OldMatche } from "@/server/models/oldMatchModel";


interface ParamsProps{
    profileId:string
}

export async function GET(request:Request,{params}:{params:ParamsProps}){
    
    const user = await User.find({_id:params.profileId}) as any;
    if(!user){
        return new NextResponse("User not found",{status:404});
    }
    // console.log(user[0].matchesPlayed);
    
    const allMatches = await Promise.all(user[0]?.matchesPlayed.map(async (match:any)=>{
        const matchPlayed = await OldMatche.find({_id:match});
        // console.log(matchPlayed);
        return matchPlayed;
    })) as any;

    // console.log(allMatches);
    // user[0].matchesPlayed = allMatches;
    
    return NextResponse.json({user,allMatches},{status:200});
}

