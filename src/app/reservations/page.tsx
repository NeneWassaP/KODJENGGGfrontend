'use client'
import DateReserve from "@/components/DateReserve";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ReservationItem, Room, RoomJson } from "../../../interfaces";
import { MenuItem, Select, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import createReservation from "@/libs/createReservation";
import { useRouter } from "next/navigation";
import getRooms from "@/libs/getRooms";

export default function Reservations(){

    const urlParams = useSearchParams()
    const hid = urlParams.get('id') || ""
    const name = urlParams.get('name') || ""

    const router = useRouter();

    
    const { data: session } = useSession();

    async function data() {
        const roomJson:Promise<RoomJson> = await getRooms(hid)
        const roomReady:RoomJson = await roomJson
        setRooms(roomReady)
    }

    const [rooms, setRooms] = useState<RoomJson>()

    useEffect(() => {
        data()
    }, []);

    
        const [revDate, setRevDate] = useState<Dayjs|null>(null)
        const [nightNum, setnightNum] = useState<number>(1)
        const [room, setRoom] = useState<string|null>(null)
    
    const makeReservation = async() => {
        if(!revDate){
            alert("Please select reservation date.")
            if(dayjs().isAfter(dayjs(revDate))){
                alert("Please select new date.")
            }
        }
        if(dayjs().isAfter(dayjs(revDate))){
            alert("Please select new date.")
        }
        if(!nightNum){
            alert("Please select number of nights.")
        }
        if(!room){
            alert("Please select room.")
        }
    
        if(hid && revDate && nightNum && session?.user?.token && room && rooms && !dayjs().isAfter(dayjs(revDate))){
            const item:ReservationItem = {
                hotelId: hid,
                revDate: dayjs(revDate).format("YYYY/MM/DD"),
                nightNum: nightNum,
                room: room,
                price: nightNum * rooms.data.filter(({ _id }) => _id === room )[0]?.price
            }
            const response = await createReservation(session?.user?.token,item)
            console.log(response)
            router.push('/mybooking')
        }
    }

    return(
        <main >
            {
                rooms?
                <div className="w-[100%] flex flex-col items-center space-y-4">
                    <div className="text-4xl mt-10 underline text-[#363062] font-medium">{name}</div>
                    <div className="text-xl italic font-medium text-[#4D4C7D]">New Reservation</div>
                    <div className="w-1/3 space-y-4">
                    <div>
                        <div className="text-xl font-bold text-left text-[#363062]">
                        Pick your check-in date :
                        </div>
                        <DateReserve onDateChange={(value:Dayjs)=>{setRevDate(value)}}/>
                    </div>
                
                    <div className="text-xl mt-[20px] font-bold text-left text-[#363062] items-end justify-start align-middle">
                        <div className="mb-[12px]">Number of nights : </div>
                        {/*<input type="number" required id="nightNum" name="nightNum" 
                        placeholder="(Minimun 1 night, Maximum 3 nights)" min={1} max={3}
                            className="bg-white border-2 border-gray-200 rounded text-gray-700 focus:outline-none h-fit p-2 w-[100%] focus:border-[#363062]"/>*/}
                        { <TextField id="nightNum" name="nightNum" type="number"
                        label="(Minimun 1 night, Maximum 3 nights)" variant="outlined" 
                        className="h-fit w-[100%] focus:border-[#363062]"
                        value={nightNum} onChange={(e)=>{
                            var num = Number(e.currentTarget.value)
                            if(num<1){num = 1;}
                            else if(num>3){num = 3;}
                            setnightNum(num)}}/> }
                    </div>
                    
                    <div className="text-xl mt-[20px] font-bold text-left text-[#363062] items-end justify-start align-middle">
                        <div className="mb-[12px]">Room : </div>
                        <Select name="room" id="room" className="h-14 w-full text-[#FFFFFF] border-[#F99417] justify-items-center"
                        value={room} onChange={(e)=>{setRoom(e.target.value)}}>
                        {
                            rooms?.data.map((room:Room)=>(
                                <MenuItem value={room._id}>
                                    <div className="flex flex-row w-[100%] justify-between">
                                    <div className="mx-2 text-md font-semibold text-left text-[#363062]">{room.roomtype}</div>
                                    <div className="mx-2 text-md font-semibold text-right text-[#363062]">{room.price} Bath</div>
                                    </div>
                                </MenuItem>
                            ))
                        }
                    </Select>
                    </div>

                    <div>
                        <div className="text-md underline text-left text-[#363062]">Reservation Summary</div>
                        <div className="text-md text-left text-[#363062]">
                            Hotel : {name} <br/>
                            User's name : {session?.user?.name}  <br/>
                            Reservation date (check-in date) : {dayjs(revDate).format("YYYY/MM/DD")} <br/>
                            Number of nights : {nightNum} <br/>
                            Room : { //room
                            rooms.data.filter(({ _id }) => _id === room )[0]?.roomtype
                            }<br/>
                            Total Price : {(nightNum * rooms.data.filter(({ _id }) => _id === room )[0]?.price) | 0 }
                        </div>
                    </div>
                    <button className='w-[100%] bg-[#F99417] text-white border-2 border-[#F99417] font-semibold py-2  mt-5 rounded
                    hover:bg-white hover:text-[#F99417]'
                    onClick={makeReservation}>
                    Make this reservation
                    </button>
                </div>
                </div>
                : <div className="text-xl italic font-medium text-[#4D4C7D] w-full text-center my-10">Loading...</div>
            }
            
            
        </main>
    );
}