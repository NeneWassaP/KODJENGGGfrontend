'use client'
import Image from "next/image";
import Link from "next/link";
import { ReserveJson, Reservation } from "interfaces";
import dayjs, { Dayjs } from "dayjs";
import getReservation from "@/libs/getReservation";
import { useEffect } from "react";
import { useState } from "react";
import CircleIcon from '@mui/icons-material/Circle';
import MoreOptionMyReservation from "./MoreOptionMyReservation";
import { pink } from "@mui/material/colors";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CancelRevPopUp from "./CancelRevPopUp";
import { useSession } from "next-auth/react";
import ContactPopUp from "./ContactPopUp";
import getUserProfile from "@/libs/getUserProfile";
import { ReservationItem } from "interfaces";
import updateReservationStatus from "@/libs/updateReservationStatus";
import { useRouter } from "next/navigation";


export default function BookingList ({session, profile}:{session:any, profile:any}) {

    const router = useRouter();

    //const [showOptions, setShowOptions] = useState(false);
    //const [profile, setProfile] = useState<any>();

    async function editStatus(token: string, rid:string,reserve:Reservation,status:string){
        //console.log(token);
        console.log(rid)
        console.log(reserve)
        console.log(status)
        if(rid && session?.user?.token){
            const item:Reservation = {
                _id: reserve._id,
                revDate : reserve.revDate,
                nightNum: reserve.nightNum,
                user: {
                    _id: reserve.user._id,
                    name: reserve.user.name
                },
                hotel: {
                    _id: reserve.hotel._id,
                    name: reserve.hotel.name,
                    province: reserve.hotel.province,
                    tel: reserve.hotel.tel,
                    picture: reserve.hotel.picture,
                    id: reserve.hotel.id,
                    paymentqr: reserve.hotel.paymentqr,
                    paymentname: reserve.hotel.paymentname,
                    paymentnum: reserve.hotel.paymentnum,
                },
                room: {
                    _id: reserve.room._id,
                    roomtype: reserve.room.roomtype,
                    bedtype: reserve.room.bedtype,
                    roomcap: reserve.room.roomcap
                },
                totalPrice: reserve.totalPrice,
                status: status,
                createdAt: new Date(Date.now()),
                __v: reserve.__v
                
            }
            const response = await updateReservationStatus(token, rid, item)
            console.log(response);
            if(status=="reviewed"){
                router.push(`/review?hid=${reserve.hotel.id}&name=${reserve.hotel.name}`);
            }
            else{
                window.location.reload();
            }
        }
    }
    
    async function data() {
        await new Promise((resolve) => setTimeout(resolve,500))
        const reserveJson:Promise<ReserveJson> = await getReservation(session.user.token)
        const reserveJsonReady:ReserveJson = await reserveJson
        setReservations(reserveJsonReady)
    }

    

    const [reservations, setReservations] = useState<ReserveJson>()

    useEffect(() => {
        data()
        // const fetchData = async () => {
        //     try {
        //       if (session && session.user.token){
        //         const userProfile = await getUserProfile(session.user.token);
        //         setProfile(userProfile);
        //       } 
        //     } catch (error) {
        //       console.error("Error fetching data:", error);
        //     }
        //   };
      
        //   fetchData();
    }, []);

    return (
        <div>
            <div className="text-[#363062] flex flex-col items-center justify-center my-10 mr-[20%]">
            <div className="font-semibold text-5xl m-10">Your Reservations</div>

            { (!reservations || !profile) ?
            (<div className="absolute inset-0 flex justify-center items-center text-gray-500 mr-[20%]">Loading...</div>)
            : (reservations.data.length == 0) ?
            (<div className="absolute inset-0 flex justify-center items-center text-gray-500 mr-[20%]">No reservation</div>)
            :(
                reservations.data.map((reserve:Reservation) => (
                    <div className="bg-white mb-10 rounded-lg w-[77%] h-[200px] relative flex flex-row shadow-lg" key={reserve._id}>
                            <div className="h-full w-[30%] relative rounded-lg">
                                <Image src={reserve.hotel.picture} alt='hosImg' fill={true} className="object-cover rounded-l-lg"/>
                            </div>
                            <div className="flex flex-col ">
                                <div className="flex flex-row text-4xl font-semibold underline relative left-7 top-2"> {reserve.hotel.name}</div>
                                <div className="text-lg m-2 relative left-6 top-1 font-medium">
                                    <div>User: {reserve.user.name}</div>
                                    <div>Reservation Date: {dayjs(reserve.revDate).format("YYYY/MM/DD")}</div>
                                    <div>Total Night: {reserve.nightNum}</div>
                                    <div>Room type: {reserve.room.roomtype}</div>
                                    <div>Total Price: {reserve.totalPrice}</div>
                                </div>
                            </div>
                        
                            <MoreOptionMyReservation reserve={reserve} session={session}/>
                            
                            {reserve.status === 'unpaid'&& (
                                <div className="text-[#CC382E] text-md absolute right-12 top-5">
                                    <CircleIcon sx={{ fontSize: 8 }} className="mx-1"/>
                                    unpaid
                                </div>
                            )}
                            {(reserve.status === 'unpaid' && profile?.data.role!=="hotelmanager")&& (
                               <Link href={`/payment/${reserve._id}`}>
                               <button className="px-3 py-1 text-white shadow-sm rounded-xl bg-green-600 absolute h-[40px] w-[80px] right-4 bottom-3"
                               >Pay</button>
                               </Link>
                            )}
                            {reserve.status === 'pending'&& (
                                <div className="text-[#F99417] text-md absolute right-8 top-2">
                                    <CircleIcon sx={{ fontSize: 8 }} className="mx-1"/>
                                    pending
                                </div>
                            )}
                            {/* {reserve.status === 'pending'&& profile?.data.role === 'admin' &&(
                                <Link href={`/payment/${reserve._id}`}>
                                    <button className="px-3 py-1 text-white shadow-sm rounded-xl bg-[#F99417] absolute h-[40px] w-fit right-4 bottom-3">Upload</button>
                                </Link>
                            )} */}
                            {reserve.status === 'pending'&& profile?.data.role === 'hotelmanager' &&(
                                <Link href={`/mybooking/approve/${reserve._id}`}>
                                    <button className="px-3 py-1 text-white shadow-sm rounded-xl bg-[#F99417] absolute h-[40px] w-fit right-4 bottom-3" onClick={() => {}}>
                                        Check</button>
                                </Link>
                            )}
                            {reserve.status === 'reserved'&&(
                                <div className="text-[#1EB012] text-md absolute right-8  top-2">
                                <CircleIcon sx={{ fontSize: 8 }} className="mx-1"/>
                                reserved
                                </div>
                            )}
                            {(reserve.status === 'reserved' && profile?.data.role!=="hotelmanager")&&(
                                <CancelRevPopUp rid={reserve._id} session={session}/>
                            )}
                            {(reserve.status === 'reserved' && profile?.data.role==="hotelmanager")&&(
                                <button className="px-3 py-1 text-white shadow-sm rounded-xl bg-[#1EB012] absolute h-[40px] w-fit right-4 bottom-3 text-center"
                                onClick={()=>editStatus(session?.user.token,reserve._id,reserve,'completed')}>Complete</button>
                            )}
                            {reserve.status === 'completed'&&(
                                <div className="text-[#339CFC] text-md absolute right-8  top-2">
                                <CircleIcon sx={{ fontSize: 8 }} className="mx-1"/>
                                completed
                                </div>
                            )}
                            {(reserve.status === 'completed'&&profile?.data.role==='user')&&(
                                <button className="px-3 py-1 text-white shadow-sm rounded-xl bg-[#339CFC] absolute h-[40px] w-fit right-4 bottom-3"
                                onClick={()=>{editStatus(session?.user.token,reserve._id,reserve,'reviewed'); }}>Review</button>
                            )}
                            {reserve.status === 'disapproved'&& (
                                <div className="text-[#CC382E] text-md absolute right-8 top-2">
                                    <CircleIcon sx={{ fontSize: 8 }} className="mx-1"/>
                                    disapproved
                                </div>
                            )}
                            {(reserve.status === 'disapproved' && profile?.data.role==='hotelmanager')&&(
                                <Link href={`/mybooking/approve/${reserve._id}`}><button className="px-3 py-1 text-white shadow-sm rounded-xl bg-[#CC382E] absolute h-[40px] w-fit right-4 bottom-3"
                                >Recheck</button></Link>
                            )}
                            {(reserve.status === 'disapproved' && profile?.data.role!=='hotelmanager')&&(
                                <ContactPopUp rid={reserve._id} session={session} tel={reserve.hotel.tel} name={reserve.hotel.name}/>   
                            )}
                    </div>
                ))
            )
            }
            </div>

        </div>
    )
}