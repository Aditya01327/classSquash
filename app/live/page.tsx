"use client";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const OldMatches = () => {
    const [matches, setMatches] = React.useState<any[]>([]);
    const router = useRouter();

    const fetchAllOldMatches = async () => {
        try {
            const response = await axios.get("api/match/new/", {
                headers: { validate: "harsh" },
            });
            console.log(response.data);
            if (response.data === "No matches found") {
                setMatches([]);
            } else {
                setMatches(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllOldMatches();
    }, []);

    return (
        <div>
            <div>
                {matches.length === 0 ? (
                    <div className="flex justify-center items-center min-h-[40vh]">
                        No Matches Live
                    </div>
                ) : (
                    matches.map((match) => {
                        return (
                            <div
                                className="border m-4 p-5 cursor-pointer flex flex-col gap-4"
                                key={match._id}
                            >
                                <Typography>Id: {match?._id}</Typography>
                                <Typography>Venue: {match?.venue}</Typography>
                                <Typography>Player 1: {match?.player1.player.name} , Score: {match?.player1.score}</Typography>
                                <Typography>Player 2: {match?.player2.player.name} , Score: {match?.player2.score}</Typography>
                                <Button
                                    onClick={() => {
                                        router.push(
                                            "/live/" + match?._id
                                        );
                                    }}
                                >
                                    Complete Details
                                </Button>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default OldMatches;
