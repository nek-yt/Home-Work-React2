import React from 'react'
import { useTodo } from './components/store/todo2'

export default function practice2() {
    const {todos, addUI} = useTodo((state) => ({
        todos: state.todos,
        addUI: state.addUI
    }))

  return (
    <div>
      {todos.map((el) => (
        <div key={el.id} className="">
            <h1>{el.name}</h1>
            <p>{el.age}</p>
        </div>
      ))}
    </div>
  )
}
