"use client";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { getPersonalDetails } from "@/http/profile";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";


import { MdOutlinePercent, MdOutlineSportsTennis } from "react-icons/md";
const Profile = () => {
  const router = useRouter();
  const [personalDetails, setPersonalDetails] = React.useState({} as any);
  const [matchesPlayed, setMatchesPlayed] = React.useState<any[]>([]);
  const fetchPersonalDetails = async () => {
    const logedInUser = JSON.parse(localStorage.getItem("squashUser")!);
    try {
      const res = await getPersonalDetails(logedInUser._id);
      setPersonalDetails(res.user[0]);
      setMatchesPlayed(res.allMatches);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPersonalDetails();
  }, []);

  if (!personalDetails) return <div>Loading...</div>;

  return (
    <div className="flex items-center p-5 min-h-[80vh] w-5/6 md:w-4/6 mx-auto">
      <div className="flex flex-col gap-10 justify-center w-full">
        {/* TODO make a component */}
        <div className="flex flex-col gap-1 w-full bg-slate-50 p-5 shadow-form rounded-xl">
            <div className="details flex flex-col gap-4 justify-between px-2 md:px-8">
                <div className="namebox flex flex-col justify-center">
                    <Typography className="text-2xl font-bold">{personalDetails?.name}</Typography>
                </div>
                <div className="detailbox w-1/2 flex flex-col gap-2 text-xs">
                    <div className="single-details flex flex-col">
                        <Typography className="text-gray-600 text-xs  uppercase">Email</Typography>
                        <Typography className="font-semibold md:text-lg">{personalDetails?.email}</Typography>
                    </div>
                    <div className="single-details flex flex-col">
                        <Typography className="text-gray-600 text-xs uppercase">Phone</Typography>
                        <Typography className="font-semibold md:text-lg">{personalDetails?.phone}</Typography>
                    </div>
                    <div className="single-details flex flex-col">
                        <Typography className="text-gray-600 text-xs uppercase">User ID</Typography>
                        <Typography className="font-semibold md:text-lg">{personalDetails?._id}</Typography>
                    </div>
                </div>
            </div>
            <div className="line w-full h-[1px] bg-gray-300 my-4"></div>
            <div className="stats-top flex justify-between px-2 md:px-8 gap-4 flex-col md:flex-row">
                <div className="statbox flex flex-1 flex-col">
                    <Typography className="text-center bg-green-600 items-center rounded-xs text-slate-50 font-semibold">Wins</Typography>
                    <Typography className="text-center">{personalDetails?.totalMatchesWon}</Typography>
                </div>
                <div className="statbox flex flex-1 flex-col">
                    <Typography className="text-center bg-gray-500 items-center rounded-xs text-slate-50 font-semibold">Draws</Typography>
                    <Typography className="text-center">{personalDetails?.totalMatchesDrawn}</Typography>
                </div>
                <div className="statbox flex flex-1 flex-col">
                    <Typography className="text-center bg-red-600 items-center rounded-xs text-slate-50 font-semibold">Loses</Typography>
                    <Typography className="text-center">{personalDetails?.totalMatchesLost}</Typography>
                </div>
            </div>
            <div className="line w-full h-[1px] bg-gray-300 mt-2 mb-4"></div>
            <div className="stats-bottom px-2 md:px-8 flex flex-col gap-2">
                <div className="flex justify-between">
                    <div className="flex gap-1">
                        <div className="icon bg-green-600 rounded-full p-1">
                            <MdOutlinePercent color="white" className=""/>
                        </div>
                        <Typography className="text-sm font-semibold">Win Rate</Typography>
                    </div>
                    <Typography className="text-sm font-semibold">{Math.floor((personalDetails?.totalMatchesWon / personalDetails?.totalMatchesPlayed)*100) }%</Typography>
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-1">
                        <div className="icon bg-gray-800 rounded-full p-1">
                            <MdOutlineSportsTennis color="white" className=""/>
                        </div>
                        <Typography className="text-sm font-semibold">Points Scored</Typography>
                    </div>
                    <Typography className="text-sm font-semibold text-center">{personalDetails?.totalPoints}</Typography>
                </div>
            </div>
        </div>
        <div className=" flex flex-col gap-10 justify-center items-center w-full">
          
          <Typography className="font-bold text-3xl jose text-fuchsia-700">Matches Played</Typography>

          {matchesPlayed.length === 0 ? (
            <div>No Matches Played</div>
          ) : (
            <div className="w-full">
              {matchesPlayed.map((match: any) => {
                return (
                  <div
                    className="border m-4 p-5 cursor-pointer flex flex-col gap-4"
                    key={match[0]._id}
                  >
                    <Typography>Id: {match[0]._id}</Typography>
                    <Button
                      onClick={() => {
                        router.push("/oldmatches/" + match[0]._id);
                      }}
                      className="px-0"
                    >
                      Complete Details
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
