import { create } from "zustand";
import axios from "axios";

const api = "https://to-dos-api.softclub.tj/api/to-dos";
export const imageBaseUrl = "https://to-dos-api.softclub.tj/images/";

export const useTodoStore = create((set, get) => ({
  data: [],
  loading: false,

  // Fetch Todos
  getTodos: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(api);
      set({ data: data.data, loading: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ loading: false });
    }
  },

  // Delete Todo
  deleteTodo: async (id) => {
    try {
      await axios.delete(`${api}?id=${id}`);
      get().getTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  },

  // Add Todo
  addTodo: async (newItem) => {
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

      get().getTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  },

  // Edit Todo
  editTodo: async (updatedItem) => {
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

      get().getTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  },
}));