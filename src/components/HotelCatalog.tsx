'use client'

import ProductCard from "./ProductCard";
import Link from "next/link";
import { HotelJson, HotelItem } from "interfaces";
import { useState } from "react";
import { useAppSelector } from "@/redux/store"

export default async function HotelCatalog({hotelJson}:{hotelJson:Promise<HotelJson>}){

    // const [favourite,setFavourite] = useState(false);
    // const favItems = useAppSelector((state)=>state.favSlice.favItems)

    //console.log(favItems)
    //console.log(carItems)
    //const dispatch = useDispatch<AppDispatch>()

    const hotelJsonReady = await hotelJson
    return (
        <>
        <div className="font-medium italic text-[#4D4C7D] pt-2">
        Explore {hotelJsonReady.count} models in our catalog
        </div>
        {/* <div>
            <button className='bg-[#F99417] text-white border-2 border-[#F99417] font-semibold py-2 px-2 m-2 mt-5 rounded
            hover:bg-white hover:text-[#F99417] '
            onClick={(e) => { e.stopPropagation(); setFavourite(!favourite); }}>
                {favourite? 'Show all hotels' : 'Show only favourtie'}
            </button>
        </div> */}
        <div style={{margin: "20px", display:"flex", flexDirection:"row", alignContent:"space-around", justifyContent:"space-around", flexWrap:"wrap"}}>
                {
                    // favourite ?
                    // hotelJsonReady.data.map((hotelItem:HotelItem)=>(
                    //     (favItems.filter((obj:string)=> obj==hotelItem.name)).length >= 1 ?
                    //     <Link href={`/hotels/${hotelItem.id}`} 
                    //     className="w-[100%] sm:w-[55%] md:w-[35%] lg:w-[30%]
                    //     p-2 sm:p-4 md:p-4 lg:p-8">
                    //     <ProductCard hotelName={hotelItem.name} region={hotelItem.region} 
                    //     fav={(favItems.filter((obj:string)=> obj==hotelItem.name)).length >= 1 ? true : false} 
                    //     imgSrc={hotelItem.picture}/>
                    //     </Link>
                    //     : null
                    // ))
                    // :
                    hotelJsonReady.data.map((hotelItem:HotelItem)=>(
                        <Link href={`/hotels/${hotelItem.id}`} 
                        className="w-[100%] sm:w-[55%] md:w-[35%] lg:w-[30%]
                        p-2 sm:p-4 md:p-4 lg:p-8">
                        <ProductCard hotelName={hotelItem.name} region={hotelItem.region} 
                       // fav={(favItems.filter((obj:string)=> obj==hotelItem.name)).length>= 1 ? true : false} 
                        imgSrc={hotelItem.picture}/>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}