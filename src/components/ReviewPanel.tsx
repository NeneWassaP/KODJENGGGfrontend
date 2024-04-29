'use client'

import { useState } from "react"
import SearchTags from "@/components/SearchTags";
import {Rating} from "@mui/material";

import { ReviewJson, Tags } from "interfaces";
import { Select, MenuItem, colors } from "@mui/material";
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ReviewCard from "./ReviewCard";
import { useEffect } from "react";
import getReviews from "@/libs/getReview";

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

export default function ReviewPanel({hid}:{hid:string}){

    const [cleanliness,setCleanliness] = useState(false);
    const [convenience,setConvenience] = useState(false);
    const [facility,setFacility] = useState(false);
    const [food,setFood] = useState(false);
    const [service,setService] = useState(false);
    const [worthiness,setWorthiness] = useState(false);
    const [stars,setStars] = useState<string>("0");

    const [reviewsJson5, setReviewsJson5] = useState<ReviewJson>();
    const [reviewsJson4, setReviewsJson4] = useState<ReviewJson>();
    const [reviewsJson3, setReviewsJson3] = useState<ReviewJson>();
    const [reviewsJson2, setReviewsJson2] = useState<ReviewJson>();
    const [reviewsJson1, setReviewsJson1] = useState<ReviewJson>();
    
    const reviewTags:Tags = {
        service: service,
        food: food,
        convenience: convenience,
        cleanliness: cleanliness,
        facility: facility,
        worthiness: worthiness,
        stars: stars === "0" ? null : parseInt(stars)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [data1,data2,data3,data4,data5] = await Promise.all([
                    getReviews(reviewTags,hid,1) ,
                    getReviews(reviewTags,hid,2) ,
                    getReviews(reviewTags,hid,3) ,
                    getReviews(reviewTags,hid,4) ,
                    getReviews(reviewTags,hid,5) 
                ]);
                
                setReviewsJson5(data5);
                
                setReviewsJson4(data4);
                
                setReviewsJson3(data3);
                
                setReviewsJson2(data2);
                
                setReviewsJson1(data1);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, []);

    const avg =
    (((reviewsJson5?.count ?? 0)*5) +
      ((reviewsJson4?.count ?? 0)*4) +
      ((reviewsJson3?.count ?? 0)*3) +
      ((reviewsJson2?.count ?? 0)*2) +
      ((reviewsJson1?.count ?? 0)*1)) / (((reviewsJson5?.count ?? 0)) +
      ((reviewsJson4?.count ?? 0)) +
      ((reviewsJson3?.count ?? 0)) +
      ((reviewsJson2?.count ?? 0)) +
      ((reviewsJson1?.count ?? 0))) || 0 ;
    ;
      return(
        <main>
            <div className="w-full bg-[#4D4C7D] p-5">
            <div className="text-[50px] font-medium relative text-center text-white pt-20 italic">Reviews</div>
            <div className="flex flex-row justify-center items-center h-fit">
                <div className="text-[150px] mr-[2%] font-extrabold italic h-fit">{avg.toPrecision(2)}</div>
                <div className="flex flex-col ml-[2%]">
                    <div className="text-xl flex items-center"><Rating name="5stars" value={5} readOnly/>({reviewsJson5?.count ??0})</div>
                    <div className="text-xl flex items-center"><Rating name="4stars" value={4} readOnly/>({reviewsJson4?.count ??0})</div>
                    <div className="text-xl flex items-center"><Rating name="3stars" value={3} readOnly/>({reviewsJson3?.count ??0})</div>
                    <div className="text-xl flex items-center"><Rating name="2stars" value={2} readOnly/>({reviewsJson2?.count ??0})</div>
                    <div className="text-xl flex items-center"><Rating name="1stars" value={1} readOnly/>({reviewsJson1?.count ??0})</div>
                </div>
            </div>
            <div className=" w-full flex flex-col justify-center self-center content-center items-center my-2">
                <hr className="flex justify-center items-center w-[70%] border-solid border-[#908EA5] border-[0.5px]" />
                <p className="ml-[15%] text-sm text-[#908EA5] self-start mt-2 p-1">View reviews by :</p>
            </div>
            
            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-2 gap-y-2 w-[70%] place-content-center">
                    <SearchTags tagsName="Cleanliness" value={cleanliness} isUse={setCleanliness}/>
                    <SearchTags tagsName="Convenience" value={convenience} isUse={setConvenience}/>
                    <SearchTags tagsName="Facility" value={facility} isUse={setFacility}/>
                    <SearchTags tagsName="Food" value={food} isUse={setFood}/>
                    <SearchTags tagsName="Service" value={service} isUse={setService}/>
                    <SearchTags tagsName="Worthiness" value={worthiness} isUse={setWorthiness}/>
                    
                </div>
            </div>
            
            <div className="flex justify-center">
                <div className="text-md text-center flex flex-row space-x-4 w-[70%] items-center justify-items-center justify-center h-[50px]">
                    <Select name="stars" id="stars" className="h-[2em] w-full text-[#FFFFFF] border-[#F99417] justify-items-center"
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
            </div>
            <div className="flex justify-center items-center my-4">
            <hr className="flex justify-center items-center border-solid border-[#908EA5] w-[70%] border-[0.5px]" />
            </div>
                {/* <div >
                    <h1 className="text-black"> {`${worthiness} ${service} ${food} ${facility} ${convenience} ${cleanliness}` }</h1>
                </div> */}
            <ReviewCard tags={reviewTags} hid={hid}/>
            </div>  
            
        </main>
        
    )
}