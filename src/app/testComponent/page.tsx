'use client'

import { useEffect, useState } from "react"
import ReviewTags from "@/components/ReviewTags";
import SearchTags from "@/components/SearchTags";
import User from "@/components/User";
import { Tags } from "interfaces";
import { Select, MenuItem, colors } from "@mui/material";
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ReviewCard from "@/components/ReviewCard";
import InsertSlipBox from "@/components/InsertSlipBox";


const BootstrapInput = styled(InputBase)(({ theme }) => ({
    color: 'white',
    background: '#F99417',
    '& .MuiInputBase-input': {
      borderRadius: 4,
      border: '2px solid #F99417',
    '&:focus': {
        borderRadius: 4,
        borderColor: '#F99417',
      },
    },
}));

export default function testComponent({params}:{params:{reserveid:string}}){

    const [cleanliness,setCleanliness] = useState(false);
    const [convenience,setConvenience] = useState(false);
    const [facility,setFacility] = useState(false);
    const [food,setFood] = useState(false);
    const [service,setService] = useState(false);
    const [worthiness,setWorthiness] = useState(false);
    const [stars,setStars] = useState<string>("0")

    const reviewTags:Tags = {
        service:service,
        food:food,
        convenience:convenience,
        cleanliness:cleanliness,
        facility:facility,
        worthiness:worthiness,
        stars: stars==="0"? null : parseInt(stars)
    }

    return(
        <main>
            <div>
            <div className="flex flex-row flex-wrap w-full justify-center">
                <SearchTags tagsName="Cleanliness" value={cleanliness} isUse={setCleanliness}/>
                <SearchTags tagsName="Convenience" value={convenience} isUse={setConvenience}/>
                <SearchTags tagsName="Facility" value={facility} isUse={setFacility}/>
                <SearchTags tagsName="Food" value={food} isUse={setFood}/>
                <SearchTags tagsName="Service" value={service} isUse={setService}/>
                <SearchTags tagsName="Worthiness" value={worthiness} isUse={setWorthiness}/>
                
            </div>
            <div className="text-md text-center flex flex-row space-x-4 items-center justify-center h-[50px]">
                    <Select name="stars" id="stars" className="h-[2em] w-3/4 text-[#F99417] border-[#F99417]"
                    input={<BootstrapInput />}
                    value={stars} onChange={(e)=>{setStars(e.target.value)}}>
                        <MenuItem value="0">All stars</MenuItem>
                        <MenuItem value="5">5 Stars</MenuItem>
                        <MenuItem value="4">4 Stars</MenuItem>
                        <MenuItem value="3">3 Stars</MenuItem>
                        <MenuItem value="2">2 Stars</MenuItem>
                        <MenuItem value="1">1 Stars</MenuItem>
                    </Select>
                </div>
            <div >
                <h1 className="text-black"> {`${worthiness} ${service} ${food} ${facility} ${convenience} ${cleanliness}` }</h1>
            </div>
            <InsertSlipBox reserve={params.reserveid}/>
            </div>  
        </main>
        
    )
}