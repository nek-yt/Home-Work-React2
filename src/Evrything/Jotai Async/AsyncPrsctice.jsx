import React, { useState } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { addAtom, deleteAtom, editAtom, imageBaseUrl, loadableData } from './store'

export default function AsyncPractice() {
  const dataAtom = useAtomValue(loadableData)
  const deleteData = useSetAtom(deleteAtom)
  const addData = useSetAtom(addAtom)
  const editData = useSetAtom(editAtom)

  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState(null)

  const [openEdit, setOpenEdit] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editImages, setEditImages] = useState(null)

  const handleAdd = async () => {
    if (!name.trim()) return

    await addData({
      name,
      description,
      isCompleted: false,
      images,
    })

    setName('')
    setDescription('')
    setImages(null)
    setOpen(false)
  }

  const handleOpenEdit = (item) => {
    setEditId(item.id)
    setEditName(item.name || '')
    setEditDescription(item.description || '')
    setEditImages(null)
    setOpenEdit(true)
  }

  const handleEdit = async () => {
    if (!editName.trim()) return

    await editData({
      id: editId,
      name: editName,
      description: editDescription,
      isCompleted: false,
      images: editImages,
    })

    setOpenEdit(false)
    setEditId(null)
    setEditName('')
    setEditDescription('')
    setEditImages(null)
  }

  if (dataAtom.state === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-slate-500 text-sm">
        Loading...
      </div>
    )
  }

  if (dataAtom.state === 'hasError') {
    return (
      <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg">
        Error loading items: {String(dataAtom.error)}
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4 space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <h1 className="text-xl font-semibold text-slate-900">To-Dos</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Add Task
        </button>
      </div>

      {open && (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter task name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Description
            </label>
            <input
              type="text"
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages(e.target.files)}
              className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-slate-900 file:text-white hover:file:bg-slate-800"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setOpen(false)}
              className="text-xs text-slate-600 hover:bg-slate-200 px-3 py-1.5 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="text-xs bg-slate-900 text-white hover:bg-slate-800 px-3 py-1.5 rounded-md transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {openEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-6 w-full max-w-md mx-4 space-y-4">
            <h2 className="text-base font-semibold text-slate-900">Edit Task</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  New Images (Optional)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setEditImages(e.target.files)}
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-slate-900 file:text-white hover:file:bg-slate-800 cursor-pointer"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setOpenEdit(false)}
                className="text-xs text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded-md transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="text-xs bg-slate-900 text-white hover:bg-slate-800 px-3 py-1.5 rounded-md transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {dataAtom.data?.length === 0 ? (
        <p className="flex items-center justify-center min-h-[200px] text-slate-500 text-sm">
          No To-Dos Found
        </p>
      ) : (
        dataAtom.data?.map((e) => (
          <div
            key={e.id}
            className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg shadow-xs hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center gap-4">
              {e.images && e.images.length > 0 ? (
                <img
                  src={`${imageBaseUrl}${e.images[0].imageName}`}
                  alt={e.name}
                  className="w-12 h-12 object-cover rounded-md border border-slate-200 shrink-0"
                />
              ) : (
                <div className="w-12 h-12 bg-slate-100 rounded-md border border-slate-200 flex items-center justify-center text-slate-400 text-[10px] shrink-0">
                  No img
                </div>
              )}

              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-900">{e.name}</p>
                {e.description && (
                  <p className="text-xs text-slate-500">{e.description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenEdit(e)}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-2.5 py-1.5 rounded transition-colors cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => deleteData(e.id)}
                className="text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}