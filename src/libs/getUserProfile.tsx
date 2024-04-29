export default async function getUserProfile(token: string) {
    try{
       // console.log(1)
        const response = await fetch (`${process.env.BACKEND_URL}/api/v1/auth/me`,{
            method: "GET",
            headers: {
                authorization : `Bearer ${token}`
            },
        })
       // console.log(2)
        console.log(response)
        if(!response.ok){
            //console.log(1)
            console.log(response)
            //console.log(12)
            throw new Error("Failed to get user profile")
        }
        return await response.json()
    }
    catch(err){
        console.log(err)
    }
}