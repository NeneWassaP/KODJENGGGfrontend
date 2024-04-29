import { resolve } from "path"

export default async function getHotel(id:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels/${id}`, {
        cache: 'no-store'
    })
    if(!response.ok){
        console.log(response.json);
        throw new Error ('Failed to fetch hotel')
    }
    return await response.json()
}