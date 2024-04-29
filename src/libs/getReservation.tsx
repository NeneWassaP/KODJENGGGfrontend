export default async function getReservation(token: string) {
    const response = await fetch (`${process.env.BACKEND_URL}/api/v1/reservations`,{
        next: {tags: ['reservations']},
        cache: 'no-store',
        method: "GET",
        headers: {
            authorization : `Bearer ${token}`
        }
    })
    
    if(!response.ok){
        console.log(response.json)
        throw new Error("Failed to get reservations")
    }
    return await response.json()
}