import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FavState = {
    favItems: string[]
}

const initialState:FavState = {favItems: []}

export const favSlice = createSlice({
    name: "fav",
    initialState,
    reducers: {
        checkFav: (state, action:PayloadAction<{name:string, fav:boolean}>)=>{
            if(action.payload.fav){
                state.favItems.push(action.payload.name)
            }
            else{
                const remainItems = state.favItems.filter(obj => {
                    return (obj != action.payload.name)
                })
                state.favItems = remainItems
            }
        }
    }
})

export const { checkFav } = favSlice.actions
export default favSlice.reducer