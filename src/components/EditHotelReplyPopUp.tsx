'use client'
import React, { useState } from "react";
import { useEffect } from "react"
import updateReply from "@/libs/updateReply";
import { useSession } from "next-auth/react";
import { Rating } from '@mui/material';
import ReviewTags from "@/components/ReviewTags";
import { ReviewJson, ReviewItem } from "interfaces";
import { useRouter } from "next/navigation";


export default function EditReplyPopup(
    {replyto, userreply, reply, rid, hid, visible} 
    : {replyto:string, userreply:string, reply:string, rid:string, hid:string, visible:Function}){

    const { data: session } = useSession();
    const router = useRouter()

    const [replyHotel, setReplyHotel] = useState(reply);

    const editReply = async() => {
        if(rid && session?.user?.token){
            const item:ReviewItem = {
                hotelid: "",
                stars: 0,
                comment: "",
                title: "",
                userid: "",
                report: [],
                service: true,
                food: true,
                convenience: true,
                cleanliness: true,
                facility: true,
                worthiness: true,
                reply:{
                    userreply:session?.user._id,
                    reply:replyHotel,
                    date : new Date(Date.now())
                }      
            }
            const response = await updateReply(session?.user?.token, rid, item)
            console.log(response)
            visible(false);
            window.location.reload()
        }
    }

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-30 w-full h-full bg-slate-800/50">
      <div className="fixed top-[20%] left-[10%] right-[10%] h-fit w-[80%] z-30">
      
      <div className="h-[100%] w-[100%] rounded-xl mx-auto bg-white shadow-sm relative p-5 mb-[20px]"> 
            <h1 className="text-[#F99417] text-sm italic font-extralight">{`Reply to ${replyto}`}</h1>
            <textarea
                placeholder="add a comment..."
                className="relative bg-gray-200 rounded-md w-full h-[60%] top-2 placeholder:text-[#4D4C7D] minRows={5} hover:shadow
                focus:outline-none focus:ring-0 border border-transparent focus:border-gray-200 text-[#363062] pl-2 pt-1"
                defaultValue={replyHotel}
                onChange={(data) => setReplyHotel(data.target.value)}
                required
            />
            <div className="w-[100%] flex justify-end left-0 mt-4">
          <button className="bg-[#363062] px-3 py-1 mr-3 text-white text-md rounded-lg
          hover:bg-[#4D4C7D]
          disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none
           shadow-indigo-500/50"
           onClick={()=>{visible(false); router.push(`/hotels/${hid}`)}}
          >Cancel</button>

          <button className="bg-[#363062] px-3 py-1 text-white text-md rounded-lg
          hover:bg-[#4D4C7D]
          disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none
           shadow-indigo-500/50"
          disabled={!replyHotel}
          onClick={editReply}
          >Submit</button>
        </div>
        </div>

          
      </div>
      
    </div>
    </>
  );
}
