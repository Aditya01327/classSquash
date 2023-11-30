"use client";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { getSingleMatchDetails } from "@/http/match";
import { useParams, useRouter } from "next/navigation";
import React, {useEffect, useState } from "react";

type PlayerProps = {
    player: {
        name: string;
        _id: string;
    };
    score: number;
};

type MatchDetailsProps = {
    points: number;
    venue: string;
    _id: string;
};

const RunMatch = () => {
    const params = useParams();
    const router = useRouter();
    const matchId = params.id;

    const [player1, setPlayer1] = useState<PlayerProps | null>(null);
    const [player2, setPlayer2] = useState<PlayerProps | null>(null);
    const [matchDetails, setMatchDetails] = useState<MatchDetailsProps | null>(
        null
    );

    const fetchMatch = async () => {
        try {
            const res = await getSingleMatchDetails(matchId as string);
            setMatchDetails(res);
            setPlayer1(res.player1);
            setPlayer2(res.player2);
        } catch (error: any) {
            alert("Match has been ended by the host");
            router.push("/");
        }
    };

    useEffect(() => {
        fetchMatch();
    }, []);

    const refreshScore = async () => {
        console.log("automatic called after 5 sec");
        fetchMatch();
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            refreshScore();
            // console.log("called");
        },5000);
        return ()=>{
            clearTimeout(interval);
        }
    },[])


    if(!matchDetails || !player1 || !player2) return (<div>Loading...</div>);


    return (
        <div className="flex justify-center w-full items-center min-h-[60vh]">
            <div className="flex flex-col min-w-[200px] gap-5 justify-center items-center">
                <Typography>Venue: {matchDetails?.venue}</Typography>
                <div className="flex justify-between gap-10">
                    <div className="flex flex-col gap-5 pr-10 border-r-2 border-black">
                        <Typography>{player1?.player.name}</Typography>
                        <Typography>Score: {player1?.score}</Typography>
                    </div>
                    <div className="flex flex-col gap-5">
                        <Typography>{player2?.player.name}</Typography>
                        <Typography>Score: {player2?.score}</Typography>
                    </div>
                </div>
                <div>
                    <Typography className="text-sm text-red-500">Note : Auto refresh in 5 seconds</Typography>
                </div>
                <div>
                    <Button onClick={refreshScore} >Refesh Score</Button>
                </div>
            </div>
        </div>
    );
};

export default RunMatch;
