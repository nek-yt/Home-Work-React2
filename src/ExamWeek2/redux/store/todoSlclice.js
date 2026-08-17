import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 3, name: 'Bob', age: 28 }
  ],
  reducers: {
    deleteUI: (state, action) => {
      return state.filter(t => t.id !== action.payload);
    }
  }
});

export const { deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
