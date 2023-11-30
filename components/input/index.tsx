import { cn } from "@/lib/cn";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    placeholder?: string;
    value?: string;
    label?: string;
    error?: string;
    isError?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
    className,
    placeholder,
    value,
    label,
    error,
    isError,
    onChange,
    ...otherProps
}) => {
    return (
        <div>
            {label && <label className="" htmlFor="">
                {label}
            </label>}
            <input
                className={cn(
                    "border border-gray-800 p-2 px-6 rounded-full outline-none",
                    className,
                    isError && "border border-red-500"

                )}
                onChange={onChange}
                placeholder={placeholder}
                value={value}
                {...otherProps}
            />
            {
                isError && 
                <div className="text-red-500 text-sm font-amsiProLight">
                    {error}
                </div>
            }
        </div>
    );
};

export default Input;
