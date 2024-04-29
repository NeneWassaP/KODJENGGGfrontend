export default async function getOneReservation(id:string, token: string) {
    const response = await fetch (`${process.env.BACKEND_URL}/api/v1/reservations/${id}`,{
        next: {tags: ['reservations']},
        cache: 'no-store',
        method: "GET",
        headers: {
            authorization : `Bearer ${token}`
        }
    })
    
    if(!response.ok){
        console.log(response.json)
        throw new Error("Failed to get reservation")
        
    }
    return await response.json()
}