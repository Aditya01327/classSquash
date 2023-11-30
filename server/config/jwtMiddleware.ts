import { NextRequest, NextResponse } from "next/server";

// middleware.js
const logMiddleware = (req:NextRequest, res:NextResponse, next:()=>{}) => {
    console.log(`Request received at ${new Date()}`);
    next(); // Call next to proceed to the next middleware or the route handler
};

export default logMiddleware;
