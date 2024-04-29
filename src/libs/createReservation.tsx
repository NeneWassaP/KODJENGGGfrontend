import { ReservationItem } from "interfaces"

export default async function createReservation(token: string,reserveItem: ReservationItem) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels/${reserveItem.hotelId}/reservations/`,{
        method : "POST",
        headers: {
            authorization : `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            revDate: reserveItem.revDate,
            nightNum: reserveItem.nightNum,
            status: 'unpaid',
            room: reserveItem.room,
            totalPrice: reserveItem.price
        }),
    })

    if(!response.ok){
        console.log(response.status)
        //throw new Error("Failed to create reservation")
        alert('One account can only made up to 3 nights reservation.')
    }
    return await response.json()
}