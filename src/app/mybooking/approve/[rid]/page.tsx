import User from "@/components/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import RecieptApprove from "@/components/RecieptApprove";
import getPayment from "@/libs/getPayment";
export default async function ManageReservations({params}:{params:{rid:string}}){
    const sessionReady = await getServerSession(authOptions) ;
    
    if ( !sessionReady || !sessionReady.user.token) return null
    const payment = await getPayment(params.rid,sessionReady.user.token) ;
    console.log(sessionReady)


    return(
        <main>
            <Suspense fallback={<p className="mt-10 text-[#363062] text-center">Loading...<LinearProgress/></p>}>
            <RecieptApprove session={sessionReady} payment={payment}/>
            </Suspense>
        </main>
    )
}