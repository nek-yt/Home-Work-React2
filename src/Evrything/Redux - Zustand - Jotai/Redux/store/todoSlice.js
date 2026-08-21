import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = "https://to-dos-api.softclub.tj/api/to-dos";
export const imageBaseUrl = "https://to-dos-api.softclub.tj/images/";

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  try {
    const { data } = await axios.get(api);
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
});

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { dispatch }) => {
    try {
      await axios.delete(`${api}?id=${id}`);
      dispatch(getTodos());
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (newItem, { dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("Name", newItem.name);
      formData.append("Description", newItem.description);
      formData.append("IsCompleted", newItem.isCompleted);

      if (newItem.images) {
        for (let i = 0; i < newItem.images.length; i++) {
          formData.append("Images", newItem.images[i]);
        }
      }

      await axios.post(api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(getTodos());
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }
);

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async (updatedItem, { dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("Id", updatedItem.id);
      formData.append("Name", updatedItem.name);
      formData.append("Description", updatedItem.description);
      formData.append("IsCompleted", updatedItem.isCompleted);

      if (updatedItem.images) {
        for (let i = 0; i < updatedItem.images.length; i++) {
          formData.append("Images", updatedItem.images[i]);
        }
      }

      await axios.put(api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(getTodos());
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default todoSlice.reducer;