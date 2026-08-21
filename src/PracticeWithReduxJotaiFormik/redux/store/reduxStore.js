import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSliceRedux";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});