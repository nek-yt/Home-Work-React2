import { configureStore } from "@reduxjs/toolkit";
import todoSlice from './practiceSlice'

export const store = configureStore({
    reducer: {
        todo: todoSlice
    }
})