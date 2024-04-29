'use client'
export default function ReviewTags({tagsName, value, isUse}: {tagsName:string, value:boolean, isUse:Function}){

    return(
        <div className="justify-center w-fit mx-[2px]">
            {
                value?
                <button className="px-3 py-1 text-sm text-white rounded-lg bg-[#F99417] h-[30px] border-2 border-[#F99417]  w-fit text-center
                hover:bg-white hover:text-[#F99417]"
                onClick={(e)=>{isUse(!value); e.preventDefault(); e.stopPropagation()}}>
                {tagsName}</button>
                :<button className=" px-3 py-1 text-sm text-[#F99417] rounded-lg bg-white h-[30px] border-2 border-[#F99417] w-fit text-center
                hover:bg-[#F99417] hover:text-white"
                onClick={(e)=>{isUse(!value); e.preventDefault(); e.stopPropagation()}}>
                {tagsName}</button>
            }
        </div>
    )

}