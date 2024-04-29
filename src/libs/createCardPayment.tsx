import Stripe from "stripe";

export default async function createCardPayment(token: string, reserveId : string) {
    try{
        //const stripe = new Stripe("...");
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/payment/card/${reserveId}`,{
            method : "PUT",
            headers: {
                authorization : `Bearer ${token}`,
            }
        })
    
        if(!response.ok){
            console.log(response)
            throw new Error("Failed to request card payment")
        }

        return await response.json()

    }
    catch(err){
        console.log(err)
        throw new Error("Failed to request card payment")
    }
}