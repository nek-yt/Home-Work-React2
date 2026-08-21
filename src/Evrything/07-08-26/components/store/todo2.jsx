export const useTodo = create((set, get) => ({
    todos: [
        { id: 1, name: "John", age: 12},
        { id: 2, name: "Jane", age: 25},
        { id: 3, name: "Bob", age: 30},
    ],
    addUI: (todo) => set((state) => ({
        todos: [...state.todos, todo]
    }))
}))

