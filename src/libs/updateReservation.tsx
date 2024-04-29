import { ReservationItem } from "interfaces"

export default async function updateReservation(token: string, reserveId:string, reserveItem: ReservationItem) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reservations/${reserveId}`,{
        method : "PUT",
        headers: {
            authorization : `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            revDate: reserveItem.revDate,
            nightNum: reserveItem.nightNum
        }),
    })

    if(!response.ok){
        console.log(response.status)
        throw new Error("Failed to edit reservation")
    }
    return await response.json()
}