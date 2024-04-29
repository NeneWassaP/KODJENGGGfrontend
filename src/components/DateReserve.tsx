"use client"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from "react";
import { Dayjs } from "dayjs";

export default function DateReserve({onDateChange} : {onDateChange:Function}) {

    const[bookingDate, setBookingDate] = useState<Dayjs|null>(null)

    return (
        <div className="bg-[#4D4C7D] rounded-lg space-x-5 space-y-2 w-fix px-10 py-5 flex flex-row justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white w-[100%]" value={bookingDate}
                onChange={(value)=>{setBookingDate(value); onDateChange(value) }}/>
            </LocalizationProvider>
        </div>  
    );
}