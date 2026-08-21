import { create } from "zustand";

const useTodo = create((set) => ({
  todo: [
    {id:1, name: 'john Doe', age:12}
  ],

  deleteUI: (id) => set((state) => ({data: state.data.filter((e) => e.id !== id)})),

}))

export default useTodo