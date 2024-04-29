import { ReservationItem } from "interfaces"

export default async function deleteReservation(token: string, reserveId : string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reservations/${reserveId}`,{
        method : "DELETE",
        headers: {
            authorization : `Bearer ${token}`,
        }
    })

    if(!response.ok){
        console.log(response)
        throw new Error("Failed to delete reservation")
    }
    return await response.json()
}