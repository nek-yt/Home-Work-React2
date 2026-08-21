import { configureStore } from "@reduxjs/toolkit";
import todoSlice from './todoSLice'

export const store = configureStore({
    reducer: {
        todo: todoSlice
    }
})