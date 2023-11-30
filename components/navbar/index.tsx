"use client";

import React, { use, useEffect, useState } from "react";
import Button from "../Button";
import { usePathname, useRouter } from "next/navigation";
import Typography from "../Typography";

import { CiLogout } from "react-icons/ci";

import Image from "next/image";
import logoImg from "public/images/logo.png"

const Navbar = () => {
    const router = useRouter();
    const handleLogout = () => {
        console.log("logout");
        localStorage.removeItem("squashUser");
        router.push("/login");
    };
    const [name, setName] = useState("");
    const pathname = usePathname();

    useEffect(() => {
        const logedInUser = JSON.parse(localStorage.getItem("squashUser")!);
        setName(logedInUser?.name);
    }, [pathname]);

    return (
        <div className="w-full flex justify-between items-center p-5 md:px-12 bg-slate-50 shadow-nav">
            <div
                onClick={() => {
                    router.push("/");
                }}
                className="cursor-pointer text-2xl font-semibold jose text-fuchsia-700 flex items-center gap-1"
            >
                {" "}
                <Image src={logoImg} alt="logo" className="w-6 -translate-y-[3px] logo"/>
                Squash{" "}
            </div>
            <div className="flex justify-center items-center gap-2">
                <div>
                    {pathname !== "/login" && pathname !== "/register" && (
                        <Typography>{name}</Typography>
                    )}
                </div>
                {pathname !== "/login" && pathname !== "/register" && (
                    <div className="logout cursor-pointer">
                        <CiLogout onClick={handleLogout} size={30}/>
                    </div>
                    // <Button onClick={handleLogout}>Logout</Button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
