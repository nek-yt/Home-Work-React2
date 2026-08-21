import { create } from 'zustand';

export const useTodo = create((set) => ({
  todoDetails: [
    { id: 1, job: 'Developer', status: true },
    { id: 2, job: 'Designer', status: true },
    { id: 3, job: 'Manager', status: false }
  ],
  deleteUI: (id) => set((state) => ({
    todoDetails: state.todoDetails.filter(t => t.id !== id)
  }))
}));