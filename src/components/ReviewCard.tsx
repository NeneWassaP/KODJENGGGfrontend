'use client'
import { ReviewJson, ShowReviewItem, Reservation } from "interfaces";
import { useEffect, useState } from "react"
import getReviews from "@/libs/getReview";
import { Tags } from "interfaces";
import { Rating } from "@mui/material";
import getHotel from "@/libs/getHotel";
import { getServerSession } from "next-auth"
import getUserProfile from "@/libs/getUserProfile"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { profile } from "console";
import { useSession } from "next-auth/react";
import MoreOption from "./MoreOption";
import MoreOptionReply from "./MoreOptionReply";
import EditHotelReplyPopup from "./EditHotelReplyPopUp";
import ReplyReviewButton from "./ReplyReviewButton";
import { useAppSelector } from "@/redux/store"

export default function ReviewCard({tags,hid,profile}:{tags:Tags,hid:string, profile:any}){
    
    const [reviews, setReviews] = useState<ReviewJson>();
    const [hotelDetail, setHotelDetail] = useState<any>();
    //const [profile, setProfile] = useState<any>();
    const {data:session} = useSession();

    function checkReport(ReportReview:ShowReviewItem){
        if (session){
            return ReportReview.report.includes(session.user._id);
        }
        return false
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
            //console.log(session)
        //   if (session && session.user.token){
        //     const userProfile = await getUserProfile(session.user.token);
        //     setProfile(userProfile);
        //   }
          const [reviewsJson, hotelDetailData] = await Promise.all([
            getReviews(tags, hid),
            getHotel(hid),
          ]);
          setReviews(reviewsJson);
          setHotelDetail(hotelDetailData);
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [tags, hid]);

    return(
        
        <main>
            
            <div className="flex flex-col justify-around">
        {reviews && reviews.data.map((review: ShowReviewItem) => (
            ((review.report.length<10 && !checkReport(review)) || profile?.data.role=="admin" )? (
            <div className="mb-[0px]">
            
            <div className={(review.report.length>=10)? 
            ("h-fit w-[70%] rounded-2xl mx-auto bg-red-100 border-2 border-red-600 shadow-lg relative px-6 pt-10 pb-4 mt-10"):
            ("h-fit w-[70%] rounded-2xl mx-auto bg-white shadow-lg relative px-7 pt-4 lg:pt-10 pb-4 mt-10")}>
            <div className={(review.report.length>=10)?
            ("bg-red-100 text-[#F99417] p-1"):
            ("bg-white text-[#F99417] p-1")}>
                <div>
                    {       
                    session && <MoreOption userid={review.userid._id} rClean={review.cleanliness}
                    rConvin={review.convenience} rFaci={review.facility} rFood={review.food}
                    rService={review.service} rWorth={review.worthiness} rRating={review.stars}
                    rTitle={review.title} rComment={review.comment} rid={review._id} hid={review.hotelid}
                    report={review.report.length>=10}/>
                    }
                </div>
    
                <div className = "flex flex-row-reverse flex-wrap mr-4 lg:mr-0 lg:absolute lg:top-5 lg:right-[50px]">
                    

                        {review.service && (
                            <button className="px-3 py-1 text-sm text-[#F99417] rounded-lg bg-[white] h-[30px] border-2 border-[#F99417] w-fit text-center mx-1 mb-1">
                                service
                            </button>
                        )}

                        {review.food && (
                            <button className="px-3 py-1 text-sm text-[#F99417] rounded-lg bg-[white] h-[30px] border-2 border-[#F99417] w-fit text-center mx-1 mb-1">
                                food
                            </button>
                        )}

                        {review.convenience && (
                            <button className="px-3 py-1 text-sm text-[#F99417] rounded-lg bg-[white] h-[30px] border-2 border-[#F99417] w-fit text-center mx-1 mb-1">
                                convenience
                            </button>
                        )}

                        {review.cleanliness && (
                            <button className="px-3 py-1 text-sm text-[#F99417] rounded-lg bg-[white] h-[30px] border-2 border-[#F99417] w-fit text-center mx-1 mb-1">
                                cleanliness
                            </button>
                        )}

                        {review.facility && (
                            <button className="px-3 py-1 text-sm text-[#F99417] rounded-lg bg-[white] h-[30px] border-2 border-[#F99417] w-fit text-center mx-1 mb-1">
                                facility
                            </button>
                        )}

                        {review.worthiness && (
                            <button className="px-3 py-1 text-sm text-[#F99417] rounded-lg bg-[white] h-[30px] border-2 border-[#F99417] w-fit text-center mx-1 mb-1">
                                worthiness
                            </button>
                        )}
                        
                </div>
                

                <div>
                    <p className="text-md text-[#F99417] italic">{`${review.userid.name}`}</p>
                    <Rating name="read-only" value={review.stars} readOnly/>
                </div>

                <div className="text-[#363062] h-fit w-[100%] font-semibold text-4xl text-wrap ">
                    {review.title}
                </div>
                <div className="flex justify-center items-center my-2">
                <hr className="flex justify-center items-center border-solid border-[#F99417] w-[100%] border-[1.0px]" />
                </div>
                <div className="text-[#363062] h-fit w-[100%] text-lg text-wrap">
                {review.comment}
                </div>
            
            { session && profile?.data.role=='hotelmanager' && profile?.data.hotel.id==hid && (!review.reply?.userreply || !review.reply?.reply )?
                (<ReplyReviewButton replyto={review.userid.name} userreply={session.user._id} reply={""} rid={review._id} hid={review.hotelid}/>)
                :null
            }

            {/* {
                session && <MoreOption userid={review.userid._id} rClean={review.cleanliness}
            rConvin={review.convenience} rFaci={review.facility} rFood={review.food}
            rService={review.service} rWorth={review.worthiness} rRating={review.stars}
            rTitle={review.title} rComment={review.comment} rid={review._id} hid={review.hotelid}
            report={review.report.length>=10}/>
            } */}
             
            </div>
        </div>
        
        {review.reply && review.reply.reply !== "" ? 
        (<div className="h-full w-full flex justify-center mt-2"> 
            <div className="w-[70%] relative">
                <div className="absolute top-1 left-2">
                    <h1 style={{ fontSize: '3vw' }}>↳</h1>
                </div>
                <div className=" w-[92%] ml-[8%] my-1">
                    <h1 className="text-white text-sm italic font-extralight">
                        Reply to {review.userid.name}
                    </h1>
                </div>
                <div className="w-[92%] ml-[8%] rounded-xl bg-[#E9E9E9] shadow-sm p-3 text-wrap relative">
                    <h1 className="text-[#4D4C7D] text-sm italic font-extralight">
                    {hotelDetail.data.name}
                    </h1>
                    <h1 className="text-[#363062] text-lg">
                    {review.reply.reply}
                    </h1>
                    
                    { profile?.data.role=='hotelmanager' && profile?.data.hotel.id==hid ?
                    (<MoreOptionReply replyto={review.userid.name} userreply={review.reply.userreply} reply={review.reply.reply} rid={review._id} hid={review.hotelid}/>
                    ):null}
                    
                </div>
                
            </div>
        </div>)
        :null}
     

        </div>):null
        ))}

    </div>
    
    </main>
);
}
