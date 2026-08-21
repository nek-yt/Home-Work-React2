import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const api = "https://to-dos-api.softclub.tj/api/to-dos";

export const getData = createAsyncThunk('todo/getData', async () => {
    try {
        const { data } = await axios.get(api)
        console.log(data);
        
        return data.data
    } catch (error) {
        
    }
})

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
  },
});

export default todoSlice.reducer;