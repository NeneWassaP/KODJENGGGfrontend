'use client'
import { Rating } from '@mui/material';
import { useState } from 'react';

export function RatingStar () {
    const [ rating, setRating ] = useState(0)
    return (
        <div>
            <Rating className="w-full h-[10%]" value={(rating==undefined)? 0:rating}
            onChange={(e,newValue)=>{if(newValue!=null) setRating(newValue)}}/>
        </div>
        
        
    )
}