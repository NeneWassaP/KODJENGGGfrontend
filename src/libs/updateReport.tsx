// import { ReviewItem } from "interfaces"
require('dotenv').config();

export default async function updateReport(token: string, reviewid:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reviews/report/${reviewid}`,{
        method : "PUT",
        headers: {
            authorization : `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    })  

    if(!response.ok){
        console.log(response.status)
        throw new Error("Failed to report")
    }
    return await response.json()
}