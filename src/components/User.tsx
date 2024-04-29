import Link from "next/link"
import { getServerSession } from "next-auth"
import getUserProfile from "@/libs/getUserProfile"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import dayjs from "dayjs"

export default async function User() {

    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    //var createdAt = new Date(profile.data.session)

    return (
        <div className="fixed h-full w-[25%] top-0 right-0 bottom-0 mt-[50px] border-l-2 border-[#f5f5f5]">
        <div className="w-full h-[15%]">
        <div className="h-[20%] bg-white-200 text-center">
            <div className="text-[#F99417] my-5">{profile.data.role}'s details</div>
            <div className="text-3xl font-semibold text-[#363062]">{profile.data.name}</div>
        </div>
        </div>
        <div className="w-full h-[85%] bg-[#4D4C7D]">
            <br/>
        <div className="m-5 my-5">Name: {profile.data.name}</div>
            <div className="m-5">Tel: {profile.data.tel}</div>
            <div className="m-5">Email: {profile.data.email}</div>
            <div className="m-5">Member Since: {dayjs(profile.data.createdAt).format("YYYY/MM/DD")}</div>
            <div className="absolute bottom-[10%] w-full flex flex-col justify-center items-center">
            {
                // profile.data.role=='admin'? 
                // <Link href='/hotels/add'>
                // <button className="text-xl italic text-center bg-[#F99417] rounded-lg px-10 py-2 mb-4">Add Hotel</button>                
                // </Link>: null
            } 
                <Link href="/api/auth/signout">
                    <button className="text-xl italic text-center bg-[#F99417] rounded-lg px-10 py-2">Sign-Out</button>
                </Link>
            </div>
        </div>
    </div> 
    )
}