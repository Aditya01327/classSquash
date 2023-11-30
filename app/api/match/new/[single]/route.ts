import mongoose from "@/server/config/connectDb";

import { Match } from "@/server/models/matchModel";
import { User } from "@/server/models/userModel";
import { NextResponse } from "next/server";

interface ParamsProps{
    single:string
}

interface MatchBody {
    matchId: string;
    player1: string;
    player2: string;
    player1Point: number;
    player2Point: number;
}


export async function GET(request: Request,{params}:{params:ParamsProps}) {

    const singleMatchDetails = await Match.findById({_id:params.single});

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


