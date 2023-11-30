import mongoose from "@/server/config/connectDb";

import { OldMatche } from "@/server/models/oldMatchModel";
import { NextResponse } from "next/server";

interface ParamsProps{
    id:string
}




export async function GET(request: Request,{params}:{params:ParamsProps}) {
    if (request.headers.get("validate") != "harsh") {
        return new NextResponse("Invalid Request", { status: 400 });
    }

    if (!params.id) {
        return new NextResponse("Missing info ", { status: 400 });
    }
    
    const allMatches = await OldMatche.find({user:params.id});

    return NextResponse.json(allMatches, { status: 200 });
}
