import PaymentFailed from "@/components/PaymentFailed";

export default async function Payment({params}:{params:{reserveid:string}}){
    return(  
        <PaymentFailed reserve={params.reserveid}/>
    )
}