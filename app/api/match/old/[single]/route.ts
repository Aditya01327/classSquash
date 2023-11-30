import mongoose from "@/server/config/connectDb";

import { OldMatche } from "@/server/models/oldMatchModel";
import { User } from "@/server/models/userModel";
import { NextResponse } from "next/server";

interface ParamsProps{
    single:string
}



export async function GET(request: Request,{params}:{params:ParamsProps}) {

    const singleMatchDetails = await OldMatche.findById({_id:params.single});

    if (!singleMatchDetails) {
        return new NextResponse("Match Not found", {
            status: 502,
        });
    }
        const Player1 = await User.findOne({ _id: singleMatchDetails.player1.player });
        // Populate player2
        const Player2 = await User.findOne({ _id: singleMatchDetails.player2.player });

        singleMatchDetails.player1.player = Player1;
        singleMatchDetails.player2.player = Player2;


    return NextResponse.json(singleMatchDetails,{ status: 200});
}


