import { atom } from "jotai";

export const dataAtom = atom([
  { id: 1, name: 'John' },
]);

export const deleteAtom = atom(null, (get, set, id) => {
  set(dataAtom, get(dataAtom).filter((e) => e.id !== id));
});

export const addAtom = atom(null, (get, set, newData) => {
  set(dataAtom, [...get(dataAtom), newData]);
});

export const editAtom = atom(null, (get, set, updItem) => {
  set(dataAtom, get(dataAtom).map((item) => (item.id === updItem.id ? { ...item, ...updItem } : item)));
});