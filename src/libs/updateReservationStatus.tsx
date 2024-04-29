import { Reservation } from "interfaces"

export default async function updateReservationStatus(token: string, reserveId:string, reserveItem: Reservation) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reservations/${reserveId}`,{
        method : "PUT",
        headers: {
            authorization : `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: reserveItem.status
        }),
    })

    if(!response.ok){
        console.log(response.status)
        throw new Error("Failed to edit status")
    }
    return await response.json()
}