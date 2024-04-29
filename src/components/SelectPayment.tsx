'use client'
import Image from "next/image";
import { useSession } from "next-auth/react";
import getOneReservation from "@/libs/getOneReservation";
import dayjs, { Dayjs } from "dayjs";
import getUserProfile from "@/libs/getUserProfile";
import { useEffect } from "react";
import { useState } from "react";
import { ReserveJson, Reservation, ReserveOneJson, PaymentJson } from "interfaces";
import router from "next/router";
import { useRouter } from "next/navigation";
import createCardPayment from "@/libs/createCardPayment";
import createPromtpay from "@/libs/createPromtpay";
import {loadStripe} from '@stripe/stripe-js';


//import Stripe from "stripe";


export default function SelectPayment({reserve}: {reserve:string}){
  
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
      // console.log('nowlhor')
      // reserveDetail ?
      // console.log(reserveDetail.data) : null
      // console.log(profile)
    
    async function cardPayment() {
      const stripe = await loadStripe('pk_test_51P6oXZHub7hok82f8hRRPD09HnSEtvidGSIY3RTjcjzncAKKsV5sOXL3F7IhvGS9cTmAaW75KuJuyqnr1LmkH9Fa00aLlfJ6tt');

      console.log("request payment")

      if(session && session.user.token && reserveDetail){
        
        const cardPaymentJson:Promise<PaymentJson> = await createCardPayment(session.user.token, reserveDetail.data._id);
        const cardPaymentReady:PaymentJson = await cardPaymentJson;

        console.log(cardPaymentReady)

        //stripe.redirectToCheckout({ sessionId });

        try{
          stripe?.redirectToCheckout({
            sessionId: cardPaymentReady.id
          })
        }
        catch(err){
          console.log(err);
        }
  
      }    
    }

    async function PromtpayPayment() {

      const stripe = await loadStripe('pk_test_51P6oXZHub7hok82f8hRRPD09HnSEtvidGSIY3RTjcjzncAKKsV5sOXL3F7IhvGS9cTmAaW75KuJuyqnr1LmkH9Fa00aLlfJ6tt');

      if(session && session.user.token && reserveDetail){
        const PromtpayPaymentJson:Promise<PaymentJson> = await createPromtpay(session.user.token, reserveDetail.data._id);
        const PromtpayPaymentReady:PaymentJson = await PromtpayPaymentJson;

        try{
          stripe?.redirectToCheckout({
            sessionId: PromtpayPaymentReady.id
          })
        }
        catch(err){
          console.log(err);
        }
  
      }    
    }

    
    return (
        
        <main >
          {
            (reserveDetail) ?
            <div className="w-[100%] flex flex-col items-center space-y-4">
              <div className="text-4xl font-semibold text-[#4D4C7D] underline mt-10">Payment Information</div>
              <div className="text-3xl font-bold text-[#F99417] py-5">Your Deposit: {reserveDetail.data.totalPrice} Baht</div>
            
            <div className="bg-[#4D4C7D] my-10 rounded-lg w-[60%] h-fit relative flex justify-between shadow-lg">
            <div className="flex flex-col">
            <div className="w-full">
            <div className="text-lg mx-2 my-4 relative left-6  font-normal">
                {reserveDetail && (
                    <div>
                        <div>User: {reserveDetail.data.user.name}</div>
                        <div>Hotel: {reserveDetail.data.hotel.name}</div>
                        <div>Room Type: {reserveDetail.data.room.roomtype}</div>
                        <div>Reservation date: {dayjs(reserveDetail.data.revDate).format("YYYY/MM/DD")}</div>
                        <div>Total nights: {reserveDetail.data.nightNum}</div>
                        <div>Total payment: {reserveDetail.data.totalPrice} Baht</div>
                    </div>
                )}
            </div>
            </div>
            </div> 
            <div className="w-[35%] relative rounded-lg">
                {reserveDetail && (
                <Image src={reserveDetail.data.hotel.picture} alt='hosImg' fill={true} className="object-cover rounded-r-lg"/>
                )} 
            </div>             
            </div>
            <div className="text-4xl font-semibold text-[#363062] mt-7 pt-7">Select Payment Method</div>
            <div className="text-xl font-light text-[#4D4C7D] my-7 w-[70%] text-center">
            This payment will include just total of your deposit and you will have to proceed the rest of your payment at your hotel the day you stay. Thank you for you understanding. 
            </div>
            <div className="flex flex-row justify-center pt-6 w-full">
            <button className="block w-1/6 bg-[#F99417] text-[#363062] text-xl font-bold border-2 border-[#F99417] px-6 py-2 mx-3 rounded hover:bg-white hover:text-[#F99417]"
            onClick={() => { cardPayment()}}>Credit/Debit Card</button>
            <button className="block w-1/6 bg-[#F99417] text-[#363062] text-xl font-bold border-2 border-[#F99417] px-6 py-2 mx-3 rounded hover:bg-white hover:text-[#F99417]"
            onClick={() => { PromtpayPayment()}}>Promptpay</button>
            <button className="block w-1/6 bg-[#F99417] text-[#363062] text-xl font-bold border-2 border-[#F99417] px-6 py-2 mx-3 rounded hover:bg-white hover:text-[#F99417]"
            onClick={() => { router.push(`${reserveDetail.data._id}/mobilebanking`);}}>QR Code</button>
            </div>
            </div>
             :
             <div className="w-full text-center flex justify-center m-5 items-center text-gray-500 text-md ">Loading...</div>
          }
            
        </main>
    )
}