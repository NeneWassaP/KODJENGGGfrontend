'use client'
import { useSearchParams } from "next/navigation";
import ReviewBox from "./ReviewBox";


export default function AddReview(){

    const urlParams = useSearchParams();
    const name = urlParams.get('name')

    return(
        <div className="w-[75%] bg-slate-100 h-screen">
            <div className="items-center">
                <h1 className="text-[#F99417] text-3xl font-light text-center pt-20 mb-5">{name}</h1>
                <h1 className="text-[#363062] text-3xl font-semibold text-center mb-5">Thank you for choosing us!</h1>
                <p className="block text-[#4D4C7D] text-xl text-center">We're grateful for your support and the opportunity to serve you as a</p>
                <p className="block text-[#4D4C7D] text-xl text-center">valued client. Thank you for choosing us and for giving us the chance to</p>
                <p className="block text-[#4D4C7D] text-xl text-center">grow together. Your trust and loyalty are indispensable to our success, and</p>
                <p className="block text-[#4D4C7D] text-xl text-center">we're committed to providing exceptional products and services in return.</p>
            </div>
            <div className="pt-[50px]">
                <h4 className="text-[#1E1E1E] italic ml-[12%] mb-[10px]">How’s your experience? Please review. Your opinion always matter!</h4>
                <ReviewBox/>
            </div>
        </div>
    );
}