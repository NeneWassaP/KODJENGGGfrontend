export default async function userRegister(userName:string, userEmail:string, userTel:string, userPassword:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/register`,{
        method : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: userName,
            tel: userTel,
            email: userEmail,
            role:'user',
            password: userPassword,
        }),
    })

    // if(!response.ok){
    //     console.log(response)
    //     console.error(response.body.errors)
    //     alert(response.body)
    // }

    if(!response.ok){
        throw new Error("Failed to register. Please check that this email and telephone number aren't already used.")
    }
    return await response.json()
}