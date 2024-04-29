import BookingList from "@/components/BookingList";
import User from "@/components/User";
import getReservation from "@/libs/getReservation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import AddReview from "@/components/AddReview";
import getUserProfile from "@/libs/getUserProfile"

export default async function review(){
    const session = await getServerSession(authOptions) ;
    if ( !session || !session.user.token) return null

    return(
        <main >
            <AddReview/>
            <User/>
        </main>
    )
}