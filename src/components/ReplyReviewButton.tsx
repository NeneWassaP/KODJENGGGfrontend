import { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSession } from "next-auth/react";
import EditHotelReplyPopup from "./EditHotelReplyPopUp";
import { useRouter } from "next/navigation";
import { ReviewJson, ReviewItem } from "interfaces";
import updateReply from "@/libs/updateReply";

export default function ReplyReviewButton(
    {replyto, userreply, reply, rid, hid} 
    : {replyto:string, userreply:string, reply:string, rid:string, hid:string}){
    
    const { data: session } = useSession();
    const [isVisible, setVisible] = useState(false);
        
    return(
        <div>
        {isVisible ?(
        <div>
        <EditHotelReplyPopup replyto={replyto} userreply={userreply} reply={reply} rid={rid} hid={hid}
                visible={setVisible}></EditHotelReplyPopup>
        </div>
        ):null}
        <div>
            <button className="px-7 py-1 mt-3 text-sm text-[#8F8F8F] rounded-lg bg-[white] h-[30px] border-2 border-[#8F8F8F] w-fit text-center mx-1"
            onClick={()=>setVisible(!isVisible)}>Reply</button>
        </div>
        </div>
    );
    
}