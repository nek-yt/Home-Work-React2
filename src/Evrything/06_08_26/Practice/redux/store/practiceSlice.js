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

export const addData = createAsyncThunk("todo/addData", async (newTodo, { dispatch }) => {
  try {
    const formData = new FormData();
    formData.append("Name", newTodo.name);
    formData.append("Description", newTodo.description);

    if (newTodo.file instanceof File) {
      formData.append("Images", newTodo.file);
    }
    await axios.post(api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(getData());
  } catch (error) {
    console.error("ADD Error Details:", error.response?.data || error.message);
  }
});

export const editData = createAsyncThunk("todo/editData", async (updatedTodo, { dispatch }) => {
  try {
    await axios.put(api, updatedTodo);
    dispatch(getData());
  } catch (error) {
    console.error("EDIT Error Details:", error.response?.data || error.message);
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

export const getDataImg = createAsyncThunk('todo/getDataImg', async () => {
  try {
    await axios.get(`${api}/${id}`)
    dispatch(getData())
  } catch (error) {
    
  }
})

export const editDataImg = createAsyncThunk('todo/editDataImg', async (id, { dispatch }) => {
  try {
    await axios.put(`${api}/${id}`)
    dispatch(getDataImg())
  } catch (error) {
    
  }
})

export const deleteDataImg = createAsyncThunk('todo/deleteDataImg', async (id, { dispatch }) => {
  try {
    await axios.delete(`${api}/${id}`)
    dispatch(getDataImg())
  } catch (error) {
    
  }
})

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