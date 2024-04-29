'use client'
import { useState } from "react";
import deleteReservation from "@/libs/deleteReservation";
export default function CancelRevPopUp({rid,session}:{rid:string,session:any}){

    const [isVisible,setVisible]=useState(false);
    const [isCheckboxChecked, setCheckboxChecked] = useState(false);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckboxChecked(event.target.checked);
    };

    async function deleteReserve(token:string, rid:string){
        if(token && rid){
            await deleteReservation(token , rid)
            window.location.reload()
        }
    }

    return(
        <div>
            {isVisible && (
            <div className="fixed top-0 right-0 left-0 z-30 w-full h-full bg-slate-800/50">
                <div className="text-[#363062] border border-gray-300 rounded-3xl shadow-xl px-6 py-3 mx-auto mt-20 w-[37%] bg-white">
                <div className="flex flex-col justify-center items-center">
                    <div className="font-extrabold text-[#363062] text-[28px] underline py-3">Cancellation Policy</div>
                    <div className="font-extrabold text-[#CC382E] text-[28px] italic py-3 underline">NO DEPOSIT REFUND</div>
                    <p className="pt-6 text-[#4D4C7D]">Once a reservation is made, there will</p>
                    <p className="text-[#4D4C7D]">be no refunds for cancellations or no-</p>
                    <p className="text-[#4D4C7D]">shows. We appreciate your </p>
                    <p className="pb-6 text-[#4D4C7D]">understanding.</p>
                    <div className="flex flex-row justify-start ">
                        <input type="checkbox" className="bg-gray-300" onChange={handleCheckboxChange}/>
                        <div className="ml-4">I accept the cancellation policy *</div>
                    </div>
                    <div className="text-[#4D4C7D] font-bold text-xl py-3">still want to cancel reservation?</div>
                    <div className="flex flex-row py-3">
                        <button className="px-12 py-2 bg-[#908EA5] rounded-md text-white mr-7" onClick={()=>{setVisible(false);;setCheckboxChecked(false)}}>
                            No
                        </button>
                        <button className={`px-12 py-2 bg-[#CC382E] rounded-md text-white ml-7 ${!isCheckboxChecked && "opacity-50 cursor-not-allowed"}`} disabled={!isCheckboxChecked}
                        onClick={()=>{setVisible(false);setCheckboxChecked(false);deleteReserve(session?.user.token,rid)}}>
                            Yes
                        </button>
                    </div>
                </div>
                </div>
            </div>
            )}
        <button className="px-3 py-1 text-white shadow-sm rounded-xl bg-[#908EA5] absolute h-[40px] w-fit right-4 bottom-3"
        onClick={()=>setVisible(true)}>Cancel</button>
        </div>
    );
}

{/* <h1 className="text-center mb-4 text-2xl" style={{ textDecoration: 'underline' }}>Report</h1>
                <div className="flex flex-col items-start justify-start relative top-6">
                    <div className="radio-row p-[20px]">
                    <input type="radio" name="report" id="option1" value="option1" />
                    <label htmlFor="option1" className="pl-[7px]">Contain unwanted commercial content or spam</label>
                    </div>
                    <div className="radio-row p-[20px]">
                    <input type="radio" name="report" id="option2" value="option2" />
                    <label htmlFor="option2" className="pl-[7px]">Content that is obscene or sexually explicit</label>
                    </div>
                    <div className="radio-row p-[20px]">
                    <input type="radio" name="report" id="option3" value="option3" />
                    <label htmlFor="option3" className="pl-[7px]">Content that contain hate speech or violence</label>
                    </div>
                    <div className="radio-row p-[20px]">
                    <input type="radio" name="report" id="option4" value="option4" />
                    <label htmlFor="option4" className="pl-[7px]">Contain threat or bullying text</label>
                    </div>
                    <div className="radio-row p-[20px] mb-8">
                    <input type="radio" name="report" id="option5" value="option5" />
                    <label htmlFor="option5" className="pl-[7px]">Providing incorrect information</label>
                    </div>
                </div> */}