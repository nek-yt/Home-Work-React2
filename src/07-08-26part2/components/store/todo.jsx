import { create } from 'zustand';

export const useJobStore = create((set) => ({
  jobs: [
    { id: 1, name: 'Muhammad', age: 28, job: 'Cop', status: 'active', priority: 'high', createdAt: new Date() },
    { id: 2, name: 'Aziz', age: 25, job: 'UI Designer', status: 'active', priority: 'medium', createdAt: new Date() },
    { id: 3, name: 'Sino', age: 32, job: 'Backend Developer', status: 'inactive', priority: 'low', createdAt: new Date() },
  ],

  addJob: (job) => set((state) => ({
    jobs: [...state.jobs, { ...job, id: Date.now(), createdAt: new Date() }]
  })),

  updateJob: (id, updates) => set((state) => ({
    jobs: state.jobs.map(item => item.id === id ? { ...item, ...updates } : item)
  })),

  deleteJob: (id) => set((state) => ({
    jobs: state.jobs.filter(item => item.id !== id)
  })),

  toggleStatus: (id) => set((state) => ({
    jobs: state.jobs.map(item => item.id === id ? {
      ...item,
      status: item.status === 'active' ? 'inactive' : 'active'
    } : item)
  })),
}));