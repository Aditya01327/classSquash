import mongoose from "@/server/config/connectDb";

import { Match } from "@/server/models/matchModel";
import { User } from "@/server/models/userModel";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    if (request.headers.get("validate") != "harsh") {
        return new NextResponse("Invalid Request", { status: 400 });
    }

    const allMatches = await Match.find({});

    if (!allMatches) {
        return new NextResponse("something error with mongodb ", {
            status: 502,
        });
    }
    if (allMatches.length == 0) {
        return new NextResponse("No matches found", { status: 200 });
    }
    // https://mongoosejs.com/docs/populate.html#populate_multiple_documents
    // https://mongoosejs.com/docs/populate.html#deep-populate

    await Promise.all(
        allMatches.map(async (match) => {
            // Populate player1
            const Player1 = await User.findOne({ _id: match.player1.player });
            // Populate player2
            const Player2 = await User.findOne({ _id: match.player2.player });

            match.player1.player = Player1;
            match.player2.player = Player2;
            return match;
        })
    );

    return NextResponse.json(allMatches, { status: 200 });
}

export async function DELETE(request: Request) {
    if (request.headers.get("validate") != "harsh") {
        return new NextResponse("Invalid Request", { status: 400 });
    }
    const deleteAllMatches = await Match.deleteMany({});
    return NextResponse.json(deleteAllMatches, { status: 200 });
}

export async function PUT(request: Request) {
    if (request.headers.get("validate") != "harsh") {
        return new NextResponse("Invalid Request", { status: 400 });
    }
    const body = await request.json();
    const { matchId,player1,player2, player1Point,player2Point } = body;

    if (!matchId) {
        return new NextResponse("Missing info ", { status: 400 });
    }
    const updateMatch = await Match.findOneAndUpdate(
        { _id: matchId },
        {
            player1: {
                player: player1,
                score: player1Point,
            },
            player2: {
                player: player2,
                score: player2Point,
            }
        },
        {
            new: true,
        }
    );
    if (!updateMatch) {
        return new NextResponse("Match Not found", {
            status: 404,
        });
    }
    // Populate player1
    const Player1 = await User.findOne({ _id: updateMatch.player1.player });
    // Populate player2
    const Player2 = await User.findOne({ _id: updateMatch.player2.player });

    updateMatch.player1.player = Player1;
    updateMatch.player2.player = Player2;

    return NextResponse.json(updateMatch, { status: 200 });
}


export async function POST(request: Request) {
    const body = await request.json();
    const { player1, player2, venue, points,user } = body;

    if (!player1 || !player2 || !venue || !points) {
        return new NextResponse("Missing info ", { status: 400 });
    }
    if (
        !mongoose.Types.ObjectId.isValid(player1) ||
        !mongoose.Types.ObjectId.isValid(player2)
    ) {
        return new NextResponse("Invalid player id ", { status: 400 });
    }
    if (player1 == player2) {
        return new NextResponse("player1 and player2 can't be same ", {
            status: 400,
        });
    }
    if (points < 0) {
        return new NextResponse("points can't be negative ", { status: 400 });
    }

    const newMatch = new Match({
        player1: {
            player: player1,
            score: 0,
        },
        player2: {
            player: player2,
            score: 0,
        },
        venue: venue,
        points: points,
        user:user
    });

    let savedMatch = null;
    try {
        savedMatch = await newMatch.save();
    } catch (error) {
        console.log(error, "error mongodb harsh");
    }
    if (!savedMatch) {
        return new NextResponse("something error with mongodb ", {
            status: 502,
        });
    }

    console.log(savedMatch, "savedMatch");
    // populate player1
    const Player1 = await User.findOne({ _id: savedMatch.player1.player });
    // populate player2
    const Player2 = await User.findOne({ _id: savedMatch.player2.player });

    savedMatch.player1.player = Player1;
    savedMatch.player2.player = Player2;
    return NextResponse.json(savedMatch, { status: 200 });
}
