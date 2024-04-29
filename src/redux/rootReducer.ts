// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import favSlice from "./features/favSlice";

const rootReducer = combineReducers({
    favSlice
});

export default rootReducer;
