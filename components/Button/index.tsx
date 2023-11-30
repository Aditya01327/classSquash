import { cn } from "@/lib/cn";
import { type } from "os";
import React from "react";



type  ButtonProps = {
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "danger" | "success";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;


const Button:React.FC<ButtonProps> = ({children,variant,className,...otherProps}) => {
    return (
        <button className={cn(`border py-2 px-10  w-full rounded-full lato bg-fuchsia-700 text-slate-50 font-semibold border-fuchsia-700`,
        variant === "primary" && "bg-slate-300",
        variant === "secondary" && "bg-slate-100",
        className)} {...otherProps}>
            {children}
        </button>
    );
};

export default Button;
