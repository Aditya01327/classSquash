import axios from "axios";




export async function loginUser(email: string, phone: string) {
    const response = await axios.post("/api/login", { email, phone });
    return response.data;
}

export async function registerUser(name: string, email: string,phone:string) {
    const response = await axios.post("/api/register", { email, phone,name });
    return response.data;
}

export async function verifyUser(name:string,email: string, phone: string, otp: string) {
    const response = await axios.post("/api/verifyotp", { name,email, phone, otp });
    return response.data;
}

export async function getAllUsers() {
    const response = await axios.get("/api/register",{headers:{validate:"harsh"}});
    return response.data;
}