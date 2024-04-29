import Image from "next/image"
import getHotel from "@/libs/getHotel"
import Link from "next/link";
import ReviewPanel from "@/components/ReviewPanel";
import getRooms from "@/libs/getRooms";
import RoomCatalog from "@/components/RoomCatalog";
import ReduxProvider from "@/redux/ReduxProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
export default async function HospitalDetailPage({params}:{params:{hid:string}}){
    const sessionReady = await getServerSession(authOptions) ;
    if ( !sessionReady || !sessionReady.user.token) return null

    const profile = await getUserProfile(sessionReady.user.token)
    const hosDetail = await getHotel(params.hid)
    const roomDetail = await getRooms(params.hid)

    return(
        <main>
            <div className="block p-5 m-0 width-screen h-[60vh] relative">
                <Image src={hosDetail.data.picture} alt="hosImg" fill={true} objectFit="cover"/>
            </div>
            <h1 className="text-5xl font-medium relative text-center bg-blue-950 text-white pt-10 pb-10 italic">{hosDetail.data.name}</h1>
            <div className="flex text-[#363062] flex-row my-5">
                <div className="text-md mx-5 text-left text-xl ml-20">
                <div> 
                    <span className="font-semibold">
                        Address: 
                    </span>
                    {" "}
                    <span>
                         {hosDetail.data.address} {hosDetail.data.district} {hosDetail.data.province} {hosDetail.data.postalcode}
                    </span>
                </div>
                <div>
                <span className="font-semibold">
                        Region: 
                    </span>
                    {" "}
                    <span>
                         {hosDetail.data.region}
                    </span>
                </div>
                <div>
                    <span className="font-semibold">
                        Telephone Number: 
                    </span>
                    {" "}
                    <span>
                         {hosDetail.data.tel}
                    </span>
                </div>
                </div>
            </div>
            <div className="flex justify-center">
            <RoomCatalog roomJson={roomDetail}/>
            </div>
            <div className="text-center w-[100%]">
                <Link href={`/reservations?id=${params.hid}&name=${hosDetail.data.name}`}>
                <button className="bg-[#F99417] text-white rounded-lg w-[90%] mb-10 py-2 text-lg">
                    Reserve this Hotel</button>
                </Link>
            </div>
            <ReviewPanel hid={params.hid} profile={profile}/>
        </main>
    );
}



// import Image from "next/image"
// import getHotel from "@/libs/getHotel"
// import Link from "next/link"

// export default async function HotelDetailPage({params}: {params: {hid:string}}){

//     const hotelDetail = await getHotel(params.hid)

//     /**
//      * Mock data for demonstration
//      */
//     /*
//     const mockCarRepo = new Map()
//     mockCarRepo.set('001',{name:'Honda Civic', image:"/img/civic.jpg"})
//     mockCarRepo.set('002',{name:'Honda Accord', image:"/img/accord.jpg"})
//     mockCarRepo.set('003',{name:'Toyota Fortuner', image:"/img/fortuner.jpg"})
//     mockCarRepo.set('004',{name:'Tesla Model 3', image:"/img/tesla.jpg"})
//     */
    
//     return(
//         <main className="text-center p-5">
//             <h1 className="text-lg font-medium">{hotelDetail.data.name}</h1>
//             <div className="flex flex-row my-5">
//                 <Image src={hotelDetail.data.picture} alt="Product Picture" width={0} height={0} sizes="100vw"
//                 className="rounded-lg w-[30%] bg-black" />
//                 <div className="text-md mx-5 text-left">Name: {hotelDetail.data.name}
//                 <div>{`Address: ${hotelDetail.data.address} ${hotelDetail.data.district}, ${hotelDetail.data.province}, ${hotelDetail.data.postalcode}`} </div>
//                 <div>Telephone Number: {hotelDetail.data.tel}</div>
//                 </div>
//             </div>
//         </main>
//     )
// }

// // export async function generateStaticParams() {
// //     return[{hid:'001'},{hid:'002'},{hid:'003'},{hid:'004'}]        
// // }