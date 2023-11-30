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
        const user = JSON.parse(localStorage.getItem("squashUser")!);

        try {
            const response = await axios.get(
                "api/match/all/"+user._id,
                { headers: { validate: "harsh" } }
            );
            setMatches(response.data);
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
                {matches.length === 0 
                ? 
                <div className="flex justify-center items-center min-h-[40vh]">No Matches Conducted by you</div> 
                : 
                matches.map((match) => {
                    return (
                        <div className="border m-4 p-5 cursor-pointer flex flex-col gap-4" key={match._id}>
                            <Typography>Id: {match?._id}</Typography>
                            <Typography>Venue: {match?.venue}</Typography>
                            <Typography>Time: {match?.time}</Typography>
                            <Button onClick={()=>{router.push("/oldmatches/"+match?._id)}} >Complete Details</Button>
                        </div>
                    );
                })
            }
            </div>
        </div>
    );
};

export default OldMatches;
