"use client";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { endMatchApi, getSingleMatchDetails, updateMatch } from "@/http/match";
import { useParams, useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

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

    const [matchTime, setMatchTime] = useState<number>(0);

    const fetchMatch = async () => {
        try {
            const res = await getSingleMatchDetails(matchId as string);
            setMatchDetails(res);
            setPlayer1(res.player1);
            setPlayer2(res.player2);
        } catch (error: any) {
            alert(error.response.data);
            router.push("/match/new");
        }
    };

    const winRally = async (user: number) => {
        if(!player1 || !player2) return;

        const p1Score = player1.score;
        const p2Score = player2.score;
        const p1Id = player1.player._id;
        const p2Id = player2.player._id;
        if(user === 1) {
            try {
                const res = await updateMatch(matchId as string, p1Score+1,p2Score,p1Id,p2Id);
                setPlayer1(res.player1);
                if(matchDetails?.points !== undefined &&(p1Score + 1 >= matchDetails?.points && p1Score > p2Score)) {
                    endMatch();
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const res = await updateMatch(matchId as string, p1Score,p2Score+1,p1Id,p2Id);
                setPlayer2(res.player2);
                if(matchDetails?.points !== undefined &&(p2Score + 1 >= 11 && p2Score > p1Score)) {
                    endMatch();
                }
            } catch (error) {
                console.log(error);
            }
        }
        
        
    }

    const endMatch = async () => {
        const hour = Math.floor(matchTime/3600) == 0 ? '00' : Math.floor(matchTime/3600) < 10 ? `0${Math.floor(matchTime/3600)}` : Math.floor(matchTime/3600);
        const minutes = Math.floor(matchTime/60) == 0 ? '00' : Math.floor(matchTime/60) < 10 ? `0${Math.floor(matchTime/60)}` : Math.floor(matchTime/60);
        const seconds = matchTime%60 == 0 ? '00' : matchTime%60 < 10 ? `0${matchTime%60}` : matchTime%60;
        const time = `${hour}:${minutes}:${seconds}`;
        try {
            const res = await endMatchApi(matchId as string, time);
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMatch();
    }, []);

    useEffect(() => {
        if(!matchDetails) return;
        const timer = setInterval(() => {
            setMatchTime((prev) => prev + 1);
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [matchDetails]);
    if(!matchDetails || !player1 || !player2) return (<div>Loading...</div>);


    return (
        <div className="flex justify-center w-full items-center min-h-[60vh]">
            <div className="flex flex-col min-w-[200px] gap-5 justify-center items-center">
                <Typography>Match Time : {matchTime}</Typography>
                <Typography>Venue: {matchDetails?.venue}</Typography>
                <div className="flex justify-between gap-10">
                    <div className="flex flex-col gap-5 pr-10 border-r-2 border-black">
                        <Typography>{player1?.player.name}</Typography>
                        <Typography>Score: {player1?.score}</Typography>
                        <Button onClick={()=>{winRally(1)}} >Win Rally</Button>
                    </div>
                    <div className="flex flex-col gap-5">
                        <Typography>{player2?.player.name}</Typography>
                        <Typography>Score: {player2?.score}</Typography>
                        <Button onClick={()=>{winRally(2)}}>Win Rally</Button>
                    </div>
                </div>
                <div className="mt-10">
                    <Button className="bg-slate-50 border-2 border-red-600 text-red-500 hover:bg-red-600 hover:text-slate-50 transition-colors duration-200" onClick={endMatch}>Abort Match</Button>
                </div>
            </div>
        </div>
    );
};

export default RunMatch;
