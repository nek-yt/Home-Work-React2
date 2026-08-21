import axios from 'axios'
import { create } from 'zustand';
import React from 'react'
const api = "https://699328f38f29113acd402f5b.mockapi.io/gamble/api/v1/gamble"

export const useTodo = create((set, get) => ({
    todos: [],
    getUI: async () => {
        try {
            const response = await axios.get(api)
            set({ todos: response.data })
        } catch (error) {
            console.error("Error fetching todos:", error)
        }
    },
    deleteUI: async (id) => {
        try {
            await axios.delete(`${api}/${id}`)
            set((state) => ({
                todos: state.todos.filter((item) => item.id !== id)
            }))
        }
        catch (error) {
            console.error("Error deleting todo:", error)
        }
    },
    editUI: async (obj) => {
        try {
            await axios.put(`${api}/${obj.id}`, obj);
            get().getUI();
        } catch (error) {
            console.error("Error editing todo:", error);
        }
    },
    addUI: async (obj) => {
        try {
            await axios.post(api, obj);
            get().getUI();
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    },
}))