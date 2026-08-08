import { create } from 'zustand';

export const useJobStore = create((set) => ({
  jobs: [
    { id: 1, name: 'Muhammad', age: 28, job: 'Cop', createdAt: new Date() },
    { id: 2, name: 'Aziz', age: 25, job: 'UI Designer', createdAt: new Date() },
    { id: 3, name: 'Sino', age: 32, job: 'Backend Developer', createdAt: new Date() },
  ],

  addUI: (job) =>
    set((state) => ({
      jobs: [
        ...state.jobs,
        {
          ...job,
          id: Date.now(),
          createdAt: new Date(),
        },
      ],
    })),

  editUI: (id, updates) =>
    set((state) => ({
      jobs: state.jobs.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    })),

  deleteUI: (id) =>
    set((state) => ({
      jobs: state.jobs.filter((item) => item.id !== id),
    })),
}));