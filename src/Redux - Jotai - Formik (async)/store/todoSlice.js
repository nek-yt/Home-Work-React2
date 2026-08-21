import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = "https://to-dos-api.softclub.tj/api/to-dos";
export const imageBaseUrl = "https://to-dos-api.softclub.tj/images/";

const getErrorMessage = (error) => {
  if (error.response?.data) {
    if (typeof error.response.data === "string") return error.response.data;
    if (error.response.data.errors?.[0]) return error.response.data.errors[0];
    if (error.response.data.message) return error.response.data.message;
  }
  return error.message || "Something went wrong";
};

export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(api, {
        params: { PageNumber: 1, PageSize: 50 },
      });
      // The Softclub API nests array inside response.data.data
      const rawData = response.data?.data || response.data || [];
      return Array.isArray(rawData) ? rawData : [];
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createTodo = createAsyncThunk(
  "todos/create",
  async (values, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("Name", values.name || "");
      formData.append("Description", values.description || "");
      Array.from(values.images || []).forEach((image) =>
        formData.append("Images", image)
      );

      await axios.post(api, formData);
      return await dispatch(fetchTodos()).unwrap();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/update",
  async (values, { dispatch, rejectWithValue }) => {
    try {
      await axios.put(api, {
        id: values.id,
        name: values.name,
        description: values.description,
      });

      if (values.images?.length) {
        const formData = new FormData();
        Array.from(values.images).forEach((image) =>
          formData.append("Images", image)
        );
        await axios.post(`${api}/${values.id}/images`, formData);
      }

      return await dispatch(fetchTodos()).unwrap();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const removeTodo = createAsyncThunk(
  "todos/remove",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${api}?id=${id}`);
      return await dispatch(fetchTodos()).unwrap();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const toggleTodo = createAsyncThunk(
  "todos/toggle",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.put(
        "https://to-dos-api.softclub.tj/completed",
        null,
        { params: { id } }
      );
      return await dispatch(fetchTodos()).unwrap();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    actionStatus: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addMatcher(
        (action) =>
          [createTodo, updateTodo, removeTodo, toggleTodo].some((thunk) =>
            thunk.pending.match(action)
          ),
        (state) => {
          state.actionStatus = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          [createTodo, updateTodo, removeTodo, toggleTodo].some((thunk) =>
            thunk.fulfilled.match(action)
          ),
        (state) => {
          state.actionStatus = "idle";
        }
      )
      .addMatcher(
        (action) =>
          [createTodo, updateTodo, removeTodo, toggleTodo].some((thunk) =>
            thunk.rejected.match(action)
          ),
        (state, action) => {
          state.actionStatus = "idle";
          state.error = action.payload;
        }
      );
  },
});

export default todoSlice.reducer;