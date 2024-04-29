import BookingList from "@/components/BookingList";
import User from "@/components/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import Image from "next/image";
import Link from "next/link";
import { Reservation } from "interfaces";
import { useSession } from "next-auth/react";
import SelectPayment from "@/components/SelectPayment";

export default async function Payment({params}:{params:{reserveid:string}}){
    return(  
        <SelectPayment reserve={params.reserveid}/>
    )
}