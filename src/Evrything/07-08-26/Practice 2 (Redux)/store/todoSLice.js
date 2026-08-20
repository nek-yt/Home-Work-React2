import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = "https://to-dos-api.softclub.tj/api/to-dos";

export const getData = createAsyncThunk("todo/getData", async () => {
  try {
    const { data } = await axios.get(api);
    console.log(data)
    return data.data;
  } catch (error) {
    console.error("GET Error:", error.response?.data || error.message);
  }
});

export const deleteData = createAsyncThunk("todo/deleteData", async (id, { dispatch }) => {
  try {
    await axios.delete(`${api}?id=${id}`);
    dispatch(getData());
  } catch (error) {
    console.error("DELETE Error:", error.response?.data || error.message);
  }
});

export const addData = createAsyncThunk('todo/addData', async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(api, formData);      
      dispatch(getData());
      return response.data;
    } catch (error) {
      console.error("ADD Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const editData = createAsyncThunk("todo/editData", async (updatedTodo, { dispatch }) => {
  try {
    await axios.put(api, updatedTodo);
    dispatch(getData());
  } catch (error) {
    console.error("EDIT Error Details:", error.response?.data || error.message);
  }
});


const todoSlice = createSlice({
  name: "todo",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || [];
      })
      .addCase(getData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default todoSlice.reducer;