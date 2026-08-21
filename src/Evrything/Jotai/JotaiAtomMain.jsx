import { useAtomValue, useSetAtom } from 'jotai'
import React, { useState } from 'react'
import { addAtom, dataAtom, deleteAtom, editAtom } from './store/atom'

export default function JotaiAtomMain() {
  const data = useAtomValue(dataAtom)
  const deleteData = useSetAtom(deleteAtom) 
  const addData = useSetAtom(addAtom)
  const editData = useSetAtom(editAtom)

  const [nameAdd, setNameAdd] = useState('')
  const [nameEdit, setNameEdit] = useState('')
  const [editId, setEditId] = useState(null)
  const [open, setOpen] = useState(false)

  const addHandle = () => {
    if (!nameAdd.trim()) return alert('The name is not defined')

    addData({ id: Date.now(), name: nameAdd })
    setNameAdd('')
  }

  const handleEdit = () => {
    if (!nameEdit.trim()) return alert('The name is not defined')

    editData({
      id: editId,
      name: nameEdit
    })
    setNameEdit('')
    setEditId(null)
    setOpen(false)
  }

  const openModal = (item) => {
    setEditId(item.id)
    setNameEdit(item.name)
    setOpen(true)
  }

  return (
    <div>
        
      <input 
        value={nameAdd}
        onChange={(e) => setNameAdd(e.target.value)}
        placeholder="Enter name"
        className='border-2 p-2'
      />
      <button onClick={addHandle}>Add</button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white border-2 border-gray-700 w-100 h-100 mx-auto mt-20">
          <input 
            type="text" 
            value={nameEdit} 
            onChange={(e) => setNameEdit(e.target.value)} 
            className='border-2 p-2'
          />
          <div className="flex items-center gap-10">
            <button className='border-2 bg-blue-600 text-white px-4 py-1 hover:bg-blue-800 hover:text-white transition ease-in-out' onClick={handleEdit}>Save Edit</button>
            <button className='border-2 border-red-600 text-red-600 px-4 py-1 hover:bg-red-600 hover:text-white transition ease-in-out' onClick={() => setOpen(false)}>Cancel</button>
          </div>
        </div>
        </div>
      )}

      <div className="flex flex-wrap gap-10 p-10">
        {data.map((item) => (
          <div key={item.id} className="border-2 p-2 border-black w-45 h-30 rounded">
            <p>{item.name}</p>
            <div className="flex items-center justify-evenly mt-10">
              <button onClick={() => deleteData(item.id)}>delete</button>
              <button onClick={() => openModal(item)}>edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}