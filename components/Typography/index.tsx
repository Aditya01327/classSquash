import { cn } from "@/lib/cn";
import React from "react";



type TypographyProps = {
    children: React.ReactNode;
    className?: string;
};



const Typography:React.FC<TypographyProps> = ({children,className}) => {
    return (
        <h1 className={cn('',className)} >
            {children}
        </h1>
    );
};

export default Typography;
