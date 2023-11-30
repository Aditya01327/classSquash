"use client";

import Button from "@/components/Button";
import DropDown from "@/components/DropDown";
import Input from "@/components/input";
import Typography from "@/components/Typography";
import { createMatch } from "@/http/match";
import { getAllUsers } from "@/http/user";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

type optionProp = {
    label: string;
    value: string;
};

const NewMatch = () => {
    const router = useRouter();
    const [users, setUsers] = useState<optionProp[]>([]);
    const [player1, setPlayer1] = useState<optionProp | null>(null);
    const [player2, setPlayer2] = useState<optionProp | null>(null);
    const [points, setPoints] = useState<optionProp | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const pointsObj = [
        { label: "11", value: 11 },
        { label: "21", value: 21 },
    ];

    const fetchAllUsers = async () => {
        try {
            setIsLoading(true);
            const res = await getAllUsers();
            const obj = res.map((user: any) => {
                return {
                    label: user.name,
                    value: user._id,
                };
            });
            setUsers(obj);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);
    const handlePlayer1Change = (e: any) => {
        setPlayer1(e);
    };
    const handlePlayer2Change = (e: any) => {
        setPlayer2(e);
    };
    const handlePointsChange = (e: any) => {
        setPoints(e);
    };
    const [btnDisabled, setBtnDisabled] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            venue: "",
        },
        validationSchema: yup.object({
            venue: yup.string().required("Required"),
        }),
        onSubmit: async(values) => {
            if(!player1 || !player2){
                alert("Please select players");
                return;
            }
            if(player1.value === player2.value){
                alert("Please select different players");
                return;
            }
            if(!points){
                alert("Please select Points");
                return;
            }
            
            const logedInUser = JSON.parse(localStorage.getItem("squashUser")!);
            const data = { 
                player1: player1.value,
                player2: player2.value,
                points: points.value,
                venue: values.venue,
                user: logedInUser._id
            }
            setBtnDisabled(true);
            try {
                const response = await createMatch(player1.value, player2.value, points.value, values.venue, logedInUser._id);
                router.push("/match/new/"+response._id);
            } catch (error) {
                console.log(error);
            }
            setBtnDisabled(false);
        },
    });

    if(btnDisabled) return <div className="flex justify-center items-center min-h-screen">Starting New Match...</div>

    return (
        <div className="flex justify-center items-center my-8">
            <div className="flex justify-center items-center min-w-[200px] flex-col gap-6 p-10 shadow-form bg-slate-50 rounded-lg">
                <div>
                    <Typography className="font-bold text-3xl jose text-fuchsia-700">New Match</Typography>
                </div>
                <form className="flex justify-center items-center flex-col gap-6" onSubmit={formik.handleSubmit}>
                    <DropDown placeholder="Player 1" isLoading={isLoading} options={users}
                    handleChange={handlePlayer1Change}
                    />
                    <DropDown placeholder="Player 2" isLoading={isLoading} options={users} handleChange={handlePlayer2Change} />
                    <DropDown placeholder="Points" isLoading={isLoading} options={pointsObj} handleChange={handlePointsChange} />
                    <Input
                        placeholder="Venue"
                        id="venue"
                        name="venue"
                        type="text"
                        value={formik.values.venue}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.venue}
                        isError={
                            formik.touched.venue && formik.errors.venue
                                ? true
                                : false
                        }
                    />
                    <Button disabled={btnDisabled} type="submit" >Start Match</Button>
                </form>
            </div>
        </div>
    );
};

export default NewMatch;
