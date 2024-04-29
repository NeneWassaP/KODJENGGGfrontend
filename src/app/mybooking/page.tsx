import BookingList from "@/components/BookingList";
import User from "@/components/User";
import getReservation from "@/libs/getReservation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import getUserProfile from "@/libs/getUserProfile";

export default async function ManageReservations(){
    const sessionReady = await getServerSession(authOptions) ;
    if ( !sessionReady || !sessionReady.user.token) return null

    const profile = await getUserProfile(sessionReady.user.token)

    return(
        <main>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
            <BookingList session={sessionReady} profile={profile}/>
            <User/>
            </Suspense>
        </main>
    )
}