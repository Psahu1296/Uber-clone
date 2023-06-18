import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./reducer/navSlice"

export const store = configureStore({
    reducer: {
        nav: navReducer,
    },
})