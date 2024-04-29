export default async function getPayment(reservid:string, token:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/payment/${reservid}`,{
        cache: 'no-store',
        method: "GET",
        headers: {
            authorization : `Bearer ${token}`
        }
    })
    if(!response.ok){
        //console.log(response.json);
        console.log(reservid)
        throw new Error ('Failed to fetch payment')
    }
    return await response.json()
}