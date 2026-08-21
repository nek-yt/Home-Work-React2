import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTodo } from './zustand/store/store';
import { deleteTodo } from './redux/store/store';

export default function MainApp() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const { todoDetails, deleteDetail } = useTodo();

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
    deleteDetail(id);
  };

  return (
    <div className=" ">
      <div className="flex items-center justify-between">
        {todos.map((todo) => {
          const detail = todoDetails.find(d => d.id === todo.id);
          return (
            <div key={todo.id} className="p-4 border border-gray-500">
              <div className="todo-content">
                <p> <span>Name:</span> {todo.name}</p>
                <p> <span>Age:</span> {todo.age}</p>
                <p> <span>Job:</span> {detail.job}</p>
                <p> <span>Status:</span> {detail.status ? 'Active' : 'Inactive'}</p>
              </div>
              <div className="">
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
