'use client'
export default function SearchTags({tagsName, value, isUse}: {tagsName:string, value:boolean, isUse:Function}){

    return(
        <div className="justify-center sm:w-[100%] w-full">
            {
                value?
                <button className="px-5 py-1 text-lg text-white rounded-lg bg-[#363062] h-[50px] border-4 border-[#363062]  w-full text-center
                hover:bg-white hover:text-[#363062]"
                onClick={(e)=>{isUse(!value); e.preventDefault(); e.stopPropagation()}}>
                {tagsName}</button>
                :<button className=" px-5 py-1 text-lg text-[#363062] rounded-lg bg-white h-[50px] border-4 border-[#363062] w-full text-center
                hover:bg-[#363062] hover:text-white"
                onClick={(e)=>{isUse(!value); e.preventDefault(); e.stopPropagation()}}>
                {tagsName}</button>
            }
        </div>
    )

}