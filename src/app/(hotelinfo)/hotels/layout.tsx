import React from "react";
import ReduxProvider from "@/redux/ReduxProvider";
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"

export default function ReservationLayout({children}: {children: React.ReactNode}){
    return(    
        <div>
        <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
        {children}
        </Suspense>     
        </div>   
    )
}