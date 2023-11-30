"use client";

import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";

// custom imports
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import Input from "@/components/input";
import { loginUser } from "@/http/user";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: "",
            phone: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
            phone: Yup.string()
                .min(10, "Must be 10 digits")
                .max(10, "Must be 10 digits")
                .required("Required"),
        }),
        onSubmit: async (values) => {
            try {
                const res = await loginUser(values.email, values.phone);
                if (res.success) {
                    alert("Login Success");
                    localStorage.setItem(
                        "squashUser",
                        JSON.stringify(res.data)
                    );
                    router.push("/");
                }
            } catch (error:any) {
                alert(error.response.data);
            }
        },
    });

    useEffect(() => {
        const user = localStorage.getItem("squashUser");
        if (user) router.push("/");
    }, [router]);

    return (
        <div className="flex justify-center items-center my-12">
            <div className="flex flex-col justify-center items-center gap-5 p-10 shadow-form bg-slate-50 rounded-lg">
                <div>
                    <Typography className="font-bold text-3xl jose text-fuchsia-700">Login</Typography>
                </div>
                <form
                    className="flex flex-col justify-center items-center gap-5"
                    onSubmit={formik.handleSubmit}
                >
                    {/* //TODO insert icon in input */}
                    <Input
                        placeholder="Email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isError={
                            formik.touched.email && formik.errors.email
                                ? true
                                : false
                        }
                        error={formik.errors.email}
                        className="w-full"
                    />
                    <Input
                        placeholder="Phone"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isError={
                            formik.touched.phone && formik.errors.phone
                                ? true
                                : false
                        }
                        error={formik.errors.phone}
                        className="w-full"
                    />
                    <Button type="submit">Login</Button>
                </form>
                <Typography className="text-gray-600 text-sm">
                Don{"'"}t have an account? {" "}
                    <Link href={"/register"} className="text-fuchsia-700 font-semibold">
                        Register
                    </Link>
                </Typography>
                {/* <Button
                    variant="secondary"
                    onClick={() => router.push("/register")}
                >
                    Register
                </Button> */}
            </div>
        </div>
    );
};

export default Login;
