// store.ts
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { TypedUseSelectorHook, useSelector } from "react-redux"; // Import TypedUseSelectorHook and useSelector


const persistConfig = {
    key: 'rootPersist',
    storage
}

const reduxPersistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: reduxPersistedReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;