import { Room, RoomJson } from "interfaces";
import Image from "next/image";

export default async function RoomCatalog({roomJson}:{roomJson:Promise<RoomJson>}) {
    const roomReady = await roomJson;
    return(
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center place-content-center w-[90%] mb-6">
            {
                roomReady.data.map((room:Room)=>(
                    <div className="bg-[rgb(77,76,125)] relative flex flex-row rounded-lg w-full h-[250px]">
                        <div className="w-[60%] h-full relative rounded-l-lg">
                        <Image src={room.picture} alt = 'Room Picture' fill={true} className="object-cover rounded-l-lg"/>
                        </div>
                        <div className="text-center relative w-[40%]">
                            <div className="text-center align-center mt-10 text-2xl text-white text-wrap font-semibold underline">{room.roomtype}</div>
                            <div className="mt-8">
                                <div className="text-center align-center text-lg text-white text-wrap">BedType: {room.bedtype}</div>
                                <div className="text-center align-center text-lg text-white text-wrap">Capacity: {room.roomcap}</div>
                            </div>
                            <div className="h-1/5 text-center align-middle w-full absolute bottom-0 bg-[#363062] rounded-br-lg">
                                <div className="text-center align-middle p-3 text-xl text-white font-semibold text-wrap">Price: {room.price}</div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
    
}