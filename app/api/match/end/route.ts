import mongoose from "@/server/config/connectDb";

import { Match } from "@/server/models/matchModel";
import { OldMatche } from "@/server/models/oldMatchModel";
import { User } from "@/server/models/userModel";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    if (request.headers.get("validate") != "harsh") {
        return new NextResponse("Invalid Request", { status: 400 });
    }

    const allMatches = await OldMatche.find({});

    return NextResponse.json(allMatches, { status: 200 });
}
export async function DELETE(request: Request) {
    if (request.headers.get("validate") != "harsh") {
        return new NextResponse("Invalid Request", { status: 400 });
    }

    const allMatches = await OldMatche.deleteMany({});

    return NextResponse.json(allMatches, { status: 200 });
}


export async function POST(request:Request){
    const body = await request.json();
    const {matchId,time} = body;
    if(!matchId){
        return new NextResponse("Missing info ", { status: 400 });
    }
    
    const findMatch = await Match.findOne({_id:matchId});
    if(!findMatch){
        return new NextResponse("Match Not found", {
            status: 404,
        });
    }

    const endMatch = new OldMatche({
        player1:findMatch.player1,
        player2:findMatch.player2,
        venue:findMatch.venue,
        points:findMatch.points,
        user:findMatch.user,
        time:time,
        winner:findMatch.player1.score>findMatch.player2.score?findMatch.player1.player:findMatch.player2.player
    });

    // updating the user data
    const Player1 = await User.findOneAndUpdate({_id:findMatch.player1.player},{
        $inc:{
            totalMatchesPlayed:1,
            totalPoints:findMatch.player1.score
        },
        $push:{
            matchesPlayed:endMatch._id
        }
    },{new:true});

    const Player2 = await User.findOneAndUpdate({_id:findMatch.player2.player},{
        $inc:{
            totalMatchesPlayed:1,
            totalPoints:findMatch.player2.score
        },
        $push:{
            matchesPlayed:endMatch._id
        }
    },{new:true});

    if(findMatch.player1.score>findMatch.player2.score){
        await User.findOneAndUpdate({_id:findMatch.player1.player},{
            $inc:{
                totalMatchesWon:1
            }
        });
        await User.findOneAndUpdate({_id:findMatch.player2.player},{
            $inc:{
                totalMatchesLost:1
            }
        });
    }
    else if(findMatch.player1.score<findMatch.player2.score){
        await User.findOneAndUpdate({_id:findMatch.player2.player},{
            $inc:{
                totalMatchesWon:1
            }
        });
        await User.findOneAndUpdate({_id:findMatch.player1.player},{
            $inc:{
                totalMatchesLost:1
            }
        });
    }
    else{
        await User.findOneAndUpdate({_id:findMatch.player1.player},{
            $inc:{
                totalMatchesDrawn:1
            }
        });
        await User.findOneAndUpdate({_id:findMatch.player2.player},{
            $inc:{
                totalMatchesDrawn:1
            }
        });
    }
    // console.log("-======================================================-");

    // console.log(Player1,"Player one");
    // console.log(Player2,"Player two");

    try{
        await endMatch.save();
        await Match.deleteOne({_id:matchId});
    }
    catch(err){
        return new NextResponse("Something went wrong", {
            status: 500,
        });
    }

    return NextResponse.json({endMatch,time}, { status: 200 });
}