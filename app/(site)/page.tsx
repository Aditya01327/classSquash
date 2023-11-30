"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";  

import newImg from "/public/images/newmatch.jpg";
import oldImg from "/public/images/old.jpg";
import live from "/public/images/live.jpg"
import profile from "/public/images/profile.jpg"

import Image from "next/image";


import { GiTennisRacket, GiTrophyCup } from "react-icons/gi";
import { MdLiveTv } from "react-icons/md";

const Home = () => {
    const router = useRouter();
    useEffect(() => {
        const user = localStorage.getItem("squashUser");
        if (!user) router.push("/login");
    }, [router]);

    return (
        <div className="flex justify-center items-center w-4/6 mx-auto my-12">
            <div className="flex justify-items-start items-center gap-7 flex-col w-full">
                {/* //TODO make component of this and custom shadow for icon */}
                <div className="top w-full flex gap-4 h-auto flex-col lg:flex-row">
                    <div className="menu-btn flex flex-col group rounded-2xl overflow-hidden shadow-xl cursor-pointer w-full" onClick={()=>{router.push("/match/new")}}>
                        <Image src={newImg} alt="new match" className="w-full group-hover:scale-105 transition duration-300 ease-in-out"/>
                        <div className="menu-bottom relative">
                            <div className="icon absolute left-[47%] -translate-y-1/2 p-3 rounded-full bg-slate-50 shadow-icon">
                                <GiTennisRacket className="text-fuchsia-700"/>
                            </div>
                            <Button className="w-full rounded-none border-none py-6 bg-slate-50 text-fuchsia-700 font-normal text-md md:text-xl">New Match</Button>
                        </div>
                    </div>
                    <div className="menu-btn flex flex-col group rounded-2xl overflow-hidden shadow-xl cursor-pointer w-full" onClick={()=>{router.push("/oldmatches")}}>
                        <Image src={oldImg} alt="old match" className="w-full group-hover:scale-105 transition duration-300 ease-in-out"/>
                        <div className="menu-bottom relative">
                            <div className="icon absolute left-[47%] -translate-y-1/2 p-3 rounded-full bg-slate-50 shadow-icon">
                                <GiTrophyCup className="text-fuchsia-700"/>
                            </div>
                        </div>
                        <Button className="w-full rounded-none border-none py-6 bg-slate-50 text-fuchsia-700 font-normal text-md md:text-xl" >Old Matches</Button>
                    </div>                    
                    
                </div>
                <div className="bottom w-full flex flex-col lg:flex-row gap-4">
                    <div className="menu-btn group rounded-2xl overflow-hidden relative shadow-xl cursor-pointer w-full flex" onClick={()=>{router.push("/live")}}>
                        <Image src={live} alt="new match" className="w-1/2 group-hover:scale-110 transition duration-300 ease-in-out"/>
                        <div className="icon absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-50 shadow-icon">
                            <MdLiveTv className="text-fuchsia-700"/>
                        </div>
                        <Button className="w-full rounded-none border-none py-6 bg-slate-50 text-fuchsia-700 font-normal text-md md:text-xl">Live Matches</Button>
                    </div>

                    <div className="menu-btn group rounded-2xl overflow-hidden relative shadow-xl cursor-pointer w-full flex"  onClick={()=>{router.push("/profile")}}>
                        <Image src={profile} alt="new match" className="w-1/2 group-hover:scale-110 transition duration-300 ease-in-out"/>
                        <div className="icon absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-50 shadow-icon">
                            <GiTennisRacket className="text-fuchsia-700"/>
                        </div>
                        <Button className="w-full rounded-none border-none py-6 bg-slate-50 text-fuchsia-700 font-normal text-md md:text-xl" >Profile</Button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Home;
