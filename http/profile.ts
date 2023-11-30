import axios from "axios";




export async function getPersonalDetails(_id:string){
    const response = await axios.get("/api/user/"+_id);
    return response.data;
}