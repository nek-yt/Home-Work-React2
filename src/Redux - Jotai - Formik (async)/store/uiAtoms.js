import { atom } from "jotai";

export const filterAtom = atom("all");
export const searchAtom = atom("");
export const selectedTodoAtom = atom(null);
export const modalAtom = atom(false);
export const todoMetaAtom = atom({});

export const updateTodoMetaAtom = atom(null, (get, set, todos) => {
  if (!Array.isArray(todos)) return;

  const currentMeta = get(todoMetaAtom);
  const nextMeta = { ...currentMeta };

  todos.forEach((todo) => {
    const id = todo.id ?? todo.Id;
    if (id) {
      nextMeta[id] = {
        description: todo.description ?? todo.Description ?? "",
        isCompleted: Boolean(todo.isCompleted ?? todo.IsCompleted),
      };
    }
  });

  set(todoMetaAtom, nextMeta);
});