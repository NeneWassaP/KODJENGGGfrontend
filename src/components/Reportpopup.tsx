'use client'
import React, { useState, useEffect } from "react";
import updateReport from "@/libs/updateReport";
import { useSession } from "next-auth/react";

export default function ReportPopup({rid}:{rid:string}) {

  const [isVisible, setIsVisible] = useState(true);
  const { data: session } = useSession();


  const editReport = async() => {
    const selectedcheckbox = document.querySelector('input[name="report"]:checked');
    if (!selectedcheckbox) {
      alert("Please select a reason for the report.");
      return;
    }
    if(session?.user?.token){
      const response = await updateReport(session?.user?.token,rid);
      console.log(response);
      setIsVisible(false);
      window.location.reload();
    }
  };

  return (
    <>
    {isVisible && (
      <div className="fixed top-0 right-0 left-0 z-30 w-full h-full bg-slate-800/50">
        <div className="text-[#363062] border border-gray-300 rounded-3xl shadow-xl px-3 py-6 mx-auto mt-20 w-[37%] bg-white">
          <h1 className="text-center mb-4 text-2xl" style={{ textDecoration: 'underline' }}>Report</h1>
          <div className="flex flex-col items-start justify-start relative top-6">
            <div className="checkbox-row p-[20px]">
              <input type="checkbox" name="report" id="option1" value="option1" />
              <label htmlFor="option1" className="pl-[7px]">Contain unwanted commercial content or spam</label>
            </div>
            <div className="checkbox-row p-[20px]">
              <input type="checkbox" name="report" id="option2" value="option2" />
              <label htmlFor="option2" className="pl-[7px]">Content that is obscene or sexually explicit</label>
            </div>
            <div className="checkbox-row p-[20px]">
              <input type="checkbox" name="report" id="option3" value="option3" />
              <label htmlFor="option3" className="pl-[7px]">Content that contain hate speech or violence</label>
            </div>
            <div className="checkbox-row p-[20px]">
              <input type="checkbox" name="report" id="option4" value="option4" />
              <label htmlFor="option4" className="pl-[7px]">Contain threat or bullying text</label>
            </div>
            <div className="checkbox-row p-[20px] mb-8">
              <input type="checkbox" name="report" id="option5" value="option5" />
              <label htmlFor="option5" className="pl-[7px]">Providing incorrect information</label>
            </div>
          </div>
          <div className="text-[#363062] flex justify-end space-x-6 mt-8 mr-5">
            <button onClick={()=>setIsVisible(false)}>Cancel</button>
            <button onClick={editReport}>Report</button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
