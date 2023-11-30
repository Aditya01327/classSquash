import axios from "axios";



export async function createMatch(player1:string,player2:string,points:string,venue:string,user:string){
    const response = await axios.post("/api/match/new",{
        player1,
        player2,
        points,
        venue,
        user
    })
    return response.data;   
}

export async function getSingleMatchDetails(matchId:string){
    const response = await axios.get(`/api/match/new/${matchId}`);
    return response.data;
}

export async function updateMatch(matchId:string,player1Point:number,player2Point:number,player1:string,player2:string){
    const response = await axios.put(`/api/match/new`,{
        matchId,
        player1Point,
        player2Point,
        player1,
        player2
    },
    {
        headers:{
            validate:"harsh"
        }
    }
    )
    return response.data;
}


export async function endMatchApi(matchId:string,time:string){
    const response = await axios.post(`/api/match/end`,{
        matchId,
        time
    })
    return response.data;
}