import { atom } from "jotai";

export const dataAtom = atom([
    {id:1, name: 'Adam', age: 23, status: true},
    {id:2, name: 'Josh', age: 41, status: true},
    {id:3, name: 'TRUEFAS', age: 123, status: true},
    {id:4, name: 'Monkeysy', age: 65, status: true},
])

export const deleteAtom = atom(null, (get, set, id) => {
  set(dataAtom, get(dataAtom).filter((e) => e.id !== id));
})

export const editAtom = atom(null, (get, set, updItem) => {
  set(dataAtom, get(dataAtom).map((item) => (item.id === updItem.id ? { ...item, ...updItem } : item)));
})

export const addAtom = atom(null, (get, set, newData) => {
    set(dataAtom, [...get(dataAtom), newData])
})