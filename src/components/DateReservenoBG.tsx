"use client"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from "react";
import { Dayjs } from "dayjs";

export default function DateReservenoBG({onDateChange} : {onDateChange:Function}) {

    const[bookingDate, setBookingDate] = useState<Dayjs|null>(null)

    return (
        <div className="justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white justify-center w-[100%] rounded-md" value={bookingDate}
                onChange={(value)=>{setBookingDate(value); onDateChange(value) }}/>
            </LocalizationProvider>
        </div>  
    );
}