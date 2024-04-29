'use client'
import { useState, useEffect } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSession } from "next-auth/react";
import FlagIcon from '@mui/icons-material/Flag';
import EditReplyPopup from "./EditReplyPopUp";
import { ShowReviewItem } from "interfaces";
import deleteReview from "@/libs/deleteReview";
import { useRouter } from "next/navigation";
import ReportPopup from "./Reportpopup";
import getUserProfile from "@/libs/getUserProfile";

export default function MoreOption(
    {userid, rClean, rConvin, rFaci, rFood, rService, rWorth, rRating, rTitle, rComment, rid, hid,profile} 
    : {userid:string,rClean:boolean, rConvin:boolean, rFaci:boolean, rFood:boolean, rService:boolean, rWorth:boolean, rRating:number, rTitle:string, rComment:string, rid:string, hid:string,profile:any}){
    

    const { data: session } = useSession();
    const [isVisible, setVisible] = useState(false);
    const [isVisibleReport, setVisibleReport] = useState(false);
    const router = useRouter()
    const [showOptions, setShowOptions] = useState(false);
    //const [profile, setProfile] = useState<any>();

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         if (session && session.user.token){
    //           const userProfile = await getUserProfile(session.user.token);
    //           setProfile(userProfile);
    //         }
            
    //       } catch (error) {
    //         console.error("Error fetching data:", error);
    //       }
    //     };
    
    //     fetchData();
    //   }, []);


    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleEdit = () => {
        toggleOptions()
        setVisible(!isVisible);
        console.log('Edit clicked');
    };

    
    async function deletes(){
        toggleOptions()
        if(session?.user.token && rid){
            console.log(rid)
            console.log(session?.user.token)
            await deleteReview(session?.user.token , rid)
            window.location.reload()
        }
    }
    
    async function handleReport(){
        setVisibleReport(!isVisibleReport);
    }

    if(userid === session?.user._id || profile?.data.role === 'admin'){
    return(
        <div>
        {isVisible ?(
        <div>
        <EditReplyPopup rClean={rClean}
                rConvin={rConvin} rFaci={rFaci} rFood={rFood}
                rService={rService} rWorth={rWorth} rRating={rRating}
                rTitle={rTitle} rComment={rComment} rid={rid} hid={hid}
                visible={setVisible}></EditReplyPopup>
        </div>
        ):null}
        <div className="text-slate-400 w-fit absolute top-[22px] right-5">
            <button onClick={toggleOptions}><MoreVertIcon/></button>
            {showOptions && (
                <div className="flex flex-col absolute shadow-md rounded-xl">
                <button className="bg-white text-black text-sm hover:bg-slate-100 p-2 rounded-t-xl" onClick={handleEdit}>Edit</button>
                <button className="bg-white text-black text-sm hover:bg-slate-100 p-2 rounded-b-xl" onClick={()=>(deletes())}>Delete</button>
                </div>
            )}
        </div>
        </div>
    );
}
    
    return(
        <div>
            {isVisibleReport?(
            <div>
            <ReportPopup rid={rid}/>
            </div>
        ):null}
        <div className="text-red w-fit absolute top-[15px] right-4">
            <button className="bg-white text-slate-500 hover:text-red-500 rounded-xl" onClick={handleReport}><FlagIcon sx={{ fontSize: 35 }}/></button>
        </div>
        </div>
    );
}