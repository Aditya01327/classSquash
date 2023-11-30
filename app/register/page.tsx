"use client";

import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";

// custom imports
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import Input from "@/components/input";
import { registerUser, verifyUser } from "@/http/user";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
    const router = useRouter();

    const [otpSend, setOtpSend] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            phone: "",
            name: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
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
                const res = await registerUser(values.name, values.email, values.phone);
                if(res){
                    setOtpSend(true);
                }
            } catch (error:any) {
                alert(error.response.data);
            }
        },
    });

    const formik2 = useFormik({
        initialValues: {
            otp: "",
        },
        validationSchema: Yup.object({
            otp: Yup.string()
                .min(6, "Must be 6 digits")
                .max(6, "Must be 6 digits")
                .required("Required"),
        }),
        onSubmit: async (values) => {
            if(formik.values.email === "" || formik.values.phone === "" || formik.values.name === "") {
                alert("Please fill the form first");
                return;
            }
            try {
                const res = await verifyUser(formik.values.name,formik.values.email, formik.values.phone, values.otp);
                if (res.success) {
                    alert("Login Success");
                    localStorage.setItem(
                        "squashUser",
                        JSON.stringify(res.data)
                    );
                    router.push("/");
                }
            } catch (error) {
                alert("Invalid OTP")
            }
        },
    });

    useEffect(() => {
        const user = localStorage.getItem("squashUser");
        if (user) router.push("/");
    }, [router]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col justify-center items-center gap-5 p-10 shadow-form bg-slate-50 rounded-lg">
                <div>
                    <Typography className="font-bold text-3xl jose text-fuchsia-700">Register</Typography>
                </div>
                <form
                    className="flex flex-col justify-center items-center gap-5"
                    onSubmit={formik.handleSubmit}
                >
                    <Input
                        placeholder="Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isError={
                            formik.touched.name && formik.errors.name
                                ? true
                                : false
                        }
                        error={formik.errors.name}
                    />
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
                    />
                    {otpSend && <Typography className="text-sm text-red-400">OTP sent to your register mail</Typography>}
                    <Button type="submit">Request OTP</Button>
                </form>
                <form
                    className="flex flex-col justify-center items-center gap-5"
                    onSubmit={formik2.handleSubmit}
                >
                    <Input
                        placeholder="OTP"
                        name="otp"
                        value={formik2.values.otp}
                        onChange={formik2.handleChange}
                        onBlur={formik2.handleBlur}
                        isError={
                            formik2.touched.otp && formik2.errors.otp
                                ? true
                                : false
                        }
                        error={formik2.errors.otp}
                    />
                    <Button type="submit">Verify OTP</Button>
                </form>
                <Typography className="text-gray-600 text-sm">
                Already have an account? {" "}
                    <Link href={"/login"} className="text-fuchsia-700 font-semibold">
                        Login
                    </Link>
                </Typography>
            </div>
        </div>
    );
};

export default Register;
