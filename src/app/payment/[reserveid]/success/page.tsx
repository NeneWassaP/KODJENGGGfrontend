import PaymentSuccess from "@/components/PaymentSuccess";

export default async function Payment({params}:{params:{reserveid:string}}){
    return(  
        <PaymentSuccess reserve={params.reserveid}/>
    )
}