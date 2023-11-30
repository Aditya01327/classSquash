'use client';

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SingleOldMatch = () => {

    const router = useRouter();
    const [matches, setMatches] = React.useState<any>();

    const params = useParams();
    const fetchSingleOldMatch = async () => {
        try {
            const response = await axios.get("/api/match/old/"+params.single);
            console.log(response.data);
            setMatches(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{fetchSingleOldMatch()},[]);
    return (
        <div className="flex flex-col justify-center items-center mt-12">
            <div className="flex flex-col justify-center items-center gap-6 w-5/6 md:w-4/6 lg:w-1/2 bg-slate-50 p-8 shadow-form rounded-xl">
                <div>
                    <Typography className="font-bold text-3xl jose text-fuchsia-700">Match Details</Typography>
                </div>
                <div>
                    <Typography>Match Venue : {matches?.venue}</Typography>
                    <Typography>Match Time : {matches?.time}</Typography>
                    <Typography>Match Date : {matches?.createdAt.slice(0,10)}</Typography>
                </div>
                <div className="flex flex-col justify-center items-center gap-10">
                    <div className="border px-10 py-2 flex flex-col gap-3">
                        <Typography>Player 1 : {matches?.player1?.player.name}</Typography>
                        <Typography>Player 1 Points : {matches?.player1?.score}</Typography>
                        <Typography>Win Status: {matches?.winner === matches?.player1?.player._id ? 'Won' : 'Lost'}</Typography>
                        <Button onClick={()=>{router.push("/profile/"+matches?.player1.player._id)}} >View Profile</Button>
                    </div>
                    <div className="border px-10 py-2 flex flex-col gap-3">
                        <Typography>Player 2 : {matches?.player2?.player.name}</Typography>
                        <Typography>Player 2 Points : {matches?.player2?.score}</Typography>
                        <Typography>Win Status: {matches?.winner === matches?.player2?.player._id ? 'Won' : 'Lost'}</Typography>
                        <Button onClick={()=>{router.push("/profile/"+matches?.player2.player._id)}} >View Profile</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleOldMatch;
