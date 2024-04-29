'use client'
import { useState, useEffect } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSession } from "next-auth/react";
import { ShowReviewItem } from "interfaces";
import deleteReview from "@/libs/deleteReview";
import { useRouter } from "next/navigation";
import ReportPopup from "./Reportpopup";
import getUserProfile from "@/libs/getUserProfile";
import Link from "next/link";
import deleteReservation from "@/libs/deleteReservation";
import { Reservation } from "interfaces";
import { fetchData } from "next-auth/client/_utils";

export default function MoreOptionMyReservation(
    {reserve,session} 
    : {reserve:Reservation, session:any}){

    const [showOptions, setShowOptions] = useState(false);
   
    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         if (session && session.user.token){
    //           const userProfile = await getUserProfile(session.user.token);
    //           setProfile(userProfile);
    //         }
            
    //       } catch (error) {
    //         console.error("Error fetching data:", error);
    //       }
    //     };
    //     fetchData();
    // }, []);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    
    async function deleteReservations(token:string, rid:string){
        toggleOptions()
        if(token && rid){
            await deleteReservation(token , rid)
            window.location.reload()
        }
    }

    return(
        <div>
        {reserve.status === 'unpaid' && (
            <div className="text-slate-400 w-fit absolute top-[22px] right-5 text-center">
            <button onClick={toggleOptions}><MoreVertIcon/></button>
            {showOptions && (
                <div className="flex flex-col shadow-md absolute rounded-xl z-10">
                <Link  href={`/reservations/${reserve._id}?hid=${reserve.hotel.id}&name=${reserve.hotel.name}`}>
                <button className="w-[62px] bg-white text-black text-sm hover:bg-slate-100 p-2 rounded-t-xl z-10" onClick={()=>toggleOptions()}>Edit</button></Link>
                <button className="w-[62px] bg-white text-black text-sm hover:bg-slate-100 p-2 rounded-b-xl z-10" onClick={()=>{deleteReservations(session.user.token, reserve._id)}}>Delete</button>
                </div>
            )}
            </div>
        )}
        </div>
    );
}