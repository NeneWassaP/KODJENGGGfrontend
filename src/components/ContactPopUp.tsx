'use client'
import { useState } from "react";

export default function CancelRevPopUp({rid,session,tel,name}:{rid:string,session:any,tel:string, name:string}){

    const [isVisible,setVisible]=useState(false);

    return(
        <div>
            {isVisible && (
            <div className="fixed top-0 right-0 left-0 bottom-0 z-30 bg-slate-800/50 flex justify-center items-center">

                <div className="text-[#363062] border-[#CC382E]  border-2 rounded-3xl shadow-xl px-6 py-3 mx-auto mt-20 w-[37%] bg-white">
                <div className="flex flex-col justify-center items-center">
                    <div className="text-[#CC382E] font-semibold text-xl py-3">There is something wrong with your payment.</div>
                    <div className="text-[#4D4C7D] font-semibold text-xl py-1">Please contact {name}</div>
                    <div className="text-[#4D4C7D] font text-xl py-1 mb-4">Telephone number: {tel}</div>
                    <button className="px-12 py-2 bg-[#CC382E] rounded-md text-white"  onClick={()=>setVisible(false)}>
                        OK
                    </button>
                </div>
                </div>
            </div>
            )}
        <button className="px-3 py-1 text-white shadow-sm rounded-xl bg-[#CC382E] absolute h-[40px] w-fit right-4 bottom-3"
        onClick={()=>setVisible(true)}>Contact</button>
        </div>
    );
}