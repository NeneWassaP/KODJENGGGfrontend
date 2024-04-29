'use client'

import { useState } from "react"
import ReviewTags from "@/components/ReviewTags";
import { RatingStar } from "./RatingStar";
import { Rating } from '@mui/material';
import { ReviewItem } from "interfaces";
import { useSession } from "next-auth/react";
import addReview from "@/libs/addReview"
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";


export default function ReviewBox(){

    const { data: session } = useSession();
    const urlParams = useSearchParams();
    const hid = urlParams.get('hid');
    const name = urlParams.get('name')
    const router = useRouter();


    const [cleanliness,setCleanliness] = useState(false);
    const [convinience,setConvinience] = useState(false);
    const [facility,setFacility] = useState(false);
    const [food,setFood] = useState(false);
    const [service,setService] = useState(false);
    const [worthiness,setWorthiness] = useState(false);
    const [ rating, setRating ] = useState(0);
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");

    async function createReview(){
        console.log(title);
        console.log(comment);
        console.log(session);
        console.log(hid);
        if(!title){
            alert('Please add some reviw title.')
        }
        if(!comment){
            alert('Please add some comment.')
        }
        if(session && title && comment && hid){
            const item:ReviewItem = {
                hotelid: hid,
                stars: rating,
                comment: comment,
                title: title,
                userid: session?.user?._id,
                report: [],
                service: service,
                food: food,
                convenience: convinience,
                cleanliness: cleanliness,
                facility: facility,
                worthiness: worthiness,
                reply:{
                    userreply:"",
                    reply:"",
                    date : new Date(Date.now())
                }
            }
            const response = await addReview(session?.user?.token,item);
            console.log(response);
            router.push(`/hotels/${hid}`)
        }
    }

    return(
        <main className="h-fit w-[100%] bg-slate-100">
            <div className="h-[250px] w-[80%] rounded-xl mx-auto bg-white shadow-sm relative p-5 mb-[20px]"> 
                <div className="h-[20%]">
                    <div>
                        <div className="text-[#4D4C7D] text-lg italic">{session?.user.name}</div>
                        <Rating className="h-[10%]" value={(rating==undefined)? 0:rating}
                        onChange={(e,newValue)=>{if(newValue!=null) setRating(newValue)}}/>
                    </div>
                    <div className="flex flex-row-reverse w-[65%] absolute top-5 right-5">
                        <ReviewTags tagsName="Cleanliness" value={cleanliness} isUse={setCleanliness}/>
                        <ReviewTags tagsName="Convinience" value={convinience} isUse={setConvinience}/>
                        <ReviewTags tagsName="Facility" value={facility} isUse={setFacility}/>
                        <ReviewTags tagsName="Food" value={food} isUse={setFood}/>
                        <ReviewTags tagsName="Service" value={service} isUse={setService}/>
                        <ReviewTags tagsName="Worthiness" value={worthiness} isUse={setWorthiness}/>
                    </div>
                </div>
                <div className="h-[80%]">
                <div className="relative bg-gray-200 w-full h-[25%] top-4 flex items-center justify-start rounded-md hover:shadow">
                    <input
                        placeholder="add a title..."
                        className="relative bg-gray-200 rounded-md w-[90%] left-2 placeholder:text-[#4D4C7D]
                        focus:outline-none focus:ring-0 border border-transparent focus:border-gray-200 text-[#363062] font-bold overflow-"
                        onChange={(data) => setTitle(data.target.value)}
                        required
                    />
                    </div>
                    <hr className="border-solid border-[#F99417] w-full mt-6 border-[1.5px]" />
                    <textarea
                        placeholder="add a comment..."
                        className="relative bg-gray-200 rounded-md w-full h-[60%] top-2 placeholder:text-[#4D4C7D] minRows={3} hover:shadow
                        focus:outline-none focus:ring-0 border border-transparent focus:border-gray-200 text-[#363062] pl-2 pt-1"
                        onChange={(data) => setComment(data.target.value)}
                        required
                    />
                </div>
            </div>
            
            <div className="w-fit ml-[83%]">
                <button className="bg-[#363062] px-3 py-1 text-white text-md rounded-lg
                hover:bg-[#4D4C7D]
                disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none
                shadow-md shadow-indigo-500/50"
                disabled={!(cleanliness||convinience||facility||food||service||worthiness) || !rating || !title || !comment}
                onClick={()=>createReview()
                }>Submit</button>
            </div>
        </main>
    );
}