'use client'
import { redirect } from "next/navigation";
import userRegister from "@/libs/userRegister";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Resgister(){

    const router = useRouter()

    async function register() {
        //console.log({userName,userEmail,userTel,userPassword})
        let tel = /^\(?([0-9]{3})\)?[-]([0-9]{3})[-]([0-9]{4})$/;
        let email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
        if(userName == ""){ alert("Please enter username.") }
        if(userTel=="" || !tel.test(userTel)){ alert("Please add a telephone number in xxx-xxx-xxxx form.") }
        if(userEmail == "" || !email.test(userEmail)){ alert("Please enter valid email.") }
        if(userPassword == ""){ alert("Please enter password.") }

        if(userName !== "" && userEmail !== "" && userTel !== "" && userPassword !== ""){
            
            try{
                await userRegister(userName, userEmail, userTel, userPassword)
                router.push('/')
            }
            catch(err){
                alert(err)
                //console.error(err)         
            }
        }
    }

    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userTel, setUserTel] = useState("")
    const [userPassword, setUserPassword] = useState("")

    return(
        <main className="m-5 p-5">
    
            <div className="justify-center items-center flex flex-col ">
            <div className="text-4xl font-bold text-center text-[#363062] underline">Registration</div>

            <div className="mx-auto w-2/3">
            <div className="mx-auto block items-center w-3/4 my-2">
                <label className="w-auto block text-[#363062]" htmlFor="name">Username: </label>
                <input type="text" required id="name" name="name" placeholder="Username"
                className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                onChange={(data)=>setUserName(data.target.value)}/>
            </div>
            <div className="mx-auto block items-center w-3/4 my-2">
                <label className="w-auto block text-[#363062]" htmlFor="tel">Telephone Number: </label>
                <input type="text" required id="tel" name="tel" placeholder="xxx-xxx-xxxx"
                className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                onChange={(data)=>setUserTel(data.target.value)}/>
            </div>
            <div className="mx-auto block items-center w-3/4 my-2">
                <label className="w-auto block text-[#363062]" htmlFor="email">Email: </label>
                <input type="text" required id="email" name="email" placeholder="Email"
                className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                onChange={(data)=>setUserEmail(data.target.value)}/>
            </div>
            <div className="mx-auto block items-center w-3/4 my-2">
                <label className="w-auto block text-[#363062]" htmlFor="password">Password: </label>
                <input type="password" required id="password" name="password" placeholder="Password"
                className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                onChange={(data)=>setUserPassword(data.target.value)}/>
            </div>
            <button className="mx-auto block bg-[#F99417] text-white border-2 border-[#F99417] p-2 rounded w-[75%] hover:bg-white hover:text-[#F99417]"
            onClick={()=>register()}>Register</button>
            </div>

            </div>
    
        </main>
    )
}