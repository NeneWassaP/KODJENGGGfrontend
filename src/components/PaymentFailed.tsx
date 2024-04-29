'use client'
import Image from "next/image";
import { useSession } from "next-auth/react";
import getOneReservation from "@/libs/getOneReservation";
import dayjs, { Dayjs } from "dayjs";
import getUserProfile from "@/libs/getUserProfile";
import { useEffect } from "react";
import { useState } from "react";
import { ReserveJson, Reservation, ReserveOneJson } from "interfaces";
import router from "next/router";
import { useRouter } from "next/navigation";

export default function PaymentFailed({reserve}: {reserve:string}){
    
    const router = useRouter();
    const { data:session } = useSession()
    //const [profile, setProfile] = useState<any>();
    const [reserveDetail,setReserveDetails] = useState<ReserveOneJson>();

    useEffect(() => {
        const fetchData = async () => {
          try {
            // if (session && session.user.token){
            //     console.log('lol');
            //   const userProfile = await getUserProfile(session.user.token);
            //   setProfile(userProfile);
            // }
            if(session && session.user.token){
                const [revJson] = await Promise.all([
                    getOneReservation(reserve,session.user.token)
                  ]);
                setReserveDetails(revJson);
                
            }
            
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);
      console.log('nowlhor')
      reserveDetail ?
      console.log(reserveDetail.data) : null
      //console.log(profile)

      

    
    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-5xl font-semibold text-[#4D4C7D] text-center mt-[10%]">❌
            Payment Failed</div>
            
            <div className="bg-[#4D4C7D] mb-10 rounded-lg w-[70%] h-fit relative flex justify-between shadow-lg">
            <div className="flex flex-col">
            <div className="w-full">
            <div className="text-lg p-4 m-2 relative  font-normal">
                {reserveDetail && (
                    <div>
                        <div>User: {reserveDetail.data.user.name}</div>
                        <div>Hotel: {reserveDetail.data.hotel.name}</div>
                        <div>Room Type: {}</div>
                        <div>Reservation date: {dayjs(reserveDetail.data.revDate).format("YYYY/MM/DD")}</div>
                        <div>Total nights: {reserveDetail.data.nightNum}</div>
                        <div>Total payment: {}</div>
                    </div>
                )}
            </div>
            </div>
            </div> 
            <div className="w-[40%] relative rounded-lg">
                {reserveDetail && (
                <Image src={reserveDetail.data.hotel.picture} alt='hosImg' fill={true} className="object-cover rounded-r-lg"/>
                )} 
            </div>             
            </div>
            
            <div className="text-xl font-light text-[#4D4C7D] mt-7 w-[70%] text-center">
            Your payment was not successfully processed. 
            </div>
            <div className="flex flex-row">
            <button className="block bg-[#F99417] text-[#363062] text-xl font-bold border-2 border-[#F99417] px-6 py-2 mx-3 rounded hover:bg-white hover:text-[#F99417]"
            onClick={() => { router.push(`/mybooking`);}}>Try Again</button>
            </div>
        </main>
    )
}