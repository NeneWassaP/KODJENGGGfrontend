'use client'
import Image from "next/image";
import InteractiveCard from './InteractiveCard'
import router from "next/router";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import getOneReservation from "@/libs/getOneReservation";
import dayjs, { Dayjs } from "dayjs";
import getUserProfile from "@/libs/getUserProfile";
import { useEffect } from "react";
import { useState } from "react";
import { ReserveJson, Reservation, ReserveOneJson, PaymentJson } from "interfaces";

export default function PromptpayCard({reserve}: {reserve:string}){
    const router = useRouter();
    const { data:session } = useSession()
    //const [profile, setProfile] = useState<any>();
    const [reserveDetail,setReserveDetails] = useState<ReserveOneJson>();

    useEffect(() => {
        const fetchData = async () => {
          if(session && session.user.token){
            try {
              // console.log('lol');
              // const userProfile = await getUserProfile(session.user.token);
              // setProfile(userProfile);

              const revJson:Promise<ReserveOneJson> = await getOneReservation(reserve,session.user.token);
              const revReady:ReserveOneJson = await revJson;
              setReserveDetails(revReady);
              
            } catch (error) {
              console.error("Error fetching data:", error);
            }

          }
        };
    
        fetchData();
      }, []);

    return(
        <main>
            {
            (reserveDetail) ?
          <div>
            <div className="w-full mt-10">
                <h1 className="text-[#363062] text-center mb-4 text-3xl font-bold mt-3" style={{ textDecoration: 'underline' }}>{reserveDetail.data.hotel.name}'s bank account detail</h1>
                <div className=" text-3xl text-center text-[#F99417] font-bold mt-7">{reserveDetail.data.totalPrice} Baht</div> 
              </div>
            <div className="w-[40vw] h-[60vh] mt-4 px-3 py-6 mx-auto mt-30 flex flex-col justify-center bg-white border border-gray-300 rounded-3xl shadow-xl ">
              <div className="ml-[10%] h-[80%] w-[80%] relative ">
                <Image src={reserveDetail.data.hotel.paymentqr} alt='hosImg' fill={true} className="object-contain rounded-lg"/>
                
              </div>
              <div className="text-center text-2xl font-semibold mb-2 text-[#939393]"> Scan to pay</div>
              <div className="text-center text-xl text-[#363062]"> {reserveDetail.data.hotel.paymentname} </div>
              <div className="text-center text-xl mb-2 text-[#363062] "> xxx-x-x{reserveDetail.data.hotel.paymentnum}-x</div>     
            </div>
            <div className="flex justify-center">
              <div className="w-[40%] grid grid-cols-2 gap-3 justify-center left-0 mt-6">
                <button className="bg-[#FFA940] py-2 px-2 text-[#363062] text-lg font-semibold rounded-lg w-[100%]"
                onClick={()=>{router.push(`/payment/${reserveDetail.data._id}`)}}
                >Back</button>

              <button className="bg-[#363062] py-2 px-2 text-white font-semibold text-lg rounded-lg w-[100%] "
              onClick={() => { router.push(`/payment/${reserveDetail.data._id}/mobilebanking/insertslip`); }}
              >Continue</button>
                </div>

            </div>

            
          </div>
        :
        <div className="w-full text-center flex justify-center m-5 items-center text-gray-500 text-md ">Loading...</div>
        }
        </main>

    )
}