import { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSession } from "next-auth/react";
import FlagIcon from '@mui/icons-material/Flag';
import EditHotelReplyPopup from "./EditHotelReplyPopUp";
import { ShowReviewItem } from "interfaces";
import deleteReview from "@/libs/deleteReview";
import { useRouter } from "next/navigation";
import { ReviewJson, ReviewItem } from "interfaces";
import updateReply from "@/libs/updateReply";

export default function MoreOptionReply(
    {replyto, userreply, reply, rid, hid} 
    : {replyto:string, userreply:string, reply:string, rid:string, hid:string}){
    
    const { data: session } = useSession();
    const [isVisible, setVisible] = useState(false);
    const router = useRouter()
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleEdit = () => {
        toggleOptions()
        setVisible(!isVisible);
        console.log('Edit clicked');
    };

    const handleReport = () => {
        console.log('Report clicked');
    }

    const deleteReply = async() => {
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
                    userreply:session.user._id,
                    reply:"",
                    date : new Date(Date.now())
                }
                
            }
            const response = await updateReply(session?.user?.token, rid, item)
            console.log(response)
            window.location.reload()
        }
    }

    if(userreply === session?.user._id)
    return(
        <div>
        {isVisible ?(
        <div>
        <EditHotelReplyPopup replyto={replyto} userreply={userreply} reply={reply} rid={rid} hid={hid}
                visible={setVisible}></EditHotelReplyPopup>
        </div>
        ):null}
        <div className="text-slate-400 w-fit absolute top-[15px] right-3">
            <button onClick={toggleOptions}><MoreVertIcon/></button>
            {showOptions && (
                <div className="flex flex-col absolute shadow-md rounded-xl">
                <button className="bg-white text-black text-sm hover:bg-slate-100 p-2 rounded-t-xl" onClick={handleEdit}>Edit</button>
                <button className="bg-white text-black text-sm hover:bg-slate-100 p-2 rounded-b-xl" onClick={()=>(deleteReply())}>Delete</button>
                </div>
            )}
        </div>
        </div>
    );
    
}