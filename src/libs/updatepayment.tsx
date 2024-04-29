import { ReservationItem } from "interfaces";

export default async function updatepayment( payment : string , token : string , reserveId : string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reservations/${reserveId}`,{
        method : "PUT",
        headers: {
            authorization : `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            payment:payment,
        }),
    })

    if(!response.ok){
        console.log(response.status)
        throw new Error("Failed to edit reservation")
    }
    return await response.json()
}
