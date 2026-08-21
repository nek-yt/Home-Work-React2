import React, { useState } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { addAtom, deleteAtom, editAtom, imageBaseUrl, loadableData } from './storeJotai'
import { Plus, Edit3, Trash2, Image as ImageIcon, Loader2, AlertCircle, X, Check } from 'lucide-react'

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
      <div className="flex flex-col items-center justify-center min-h-[300px] text-slate-500 gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-slate-900" />
        <span className="text-sm font-medium">Fetching tasks...</span>
      </div>
    )
  }

  if (dataAtom.state === 'hasError') {
    return (
      <div className="max-w-xl mx-auto my-8 p-4 bg-rose-50/80 border border-rose-200/80 text-rose-800 rounded-xl flex items-start gap-3 shadow-xs">
        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold mb-0.5">Failed to load tasks</p>
          <p className="text-rose-600/90 leading-relaxed">{String(dataAtom.error)}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-6">
      <div className="flex items-center justify-between pb-5 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Tasks</h1>
          <p className="text-xs text-slate-500 mt-1">Manage your to-dos with Jotai async state</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </div>

      {open && (
        <div className="p-5 bg-slate-50/80 border border-slate-200/80 rounded-xl shadow-xs space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <h3 className="text-sm font-semibold text-slate-900">New Task</h3>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Title</label>
              <input
                type="text"
                placeholder="What needs to be done?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg shadow-2xs focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10 transition-all placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Description</label>
              <input
                type="text"
                placeholder="Add extra details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg shadow-2xs focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10 transition-all placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Images</label>
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setImages(e.target.files)}
                  className="w-full text-xs text-slate-500 border border-slate-200 rounded-lg bg-white file:mr-3 file:py-2 file:px-3.5 file:rounded-l-lg file:border-0 file:border-r file:border-slate-200 file:text-xs file:font-medium file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              onClick={() => setOpen(false)}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="inline-flex items-center gap-1.5 text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" /> Save
            </button>
          </div>
        </div>
      )}

      {openEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xl p-6 w-full max-w-md space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-semibold text-slate-900">Edit Task</h2>
              <button
                onClick={() => setOpenEdit(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Title</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg shadow-2xs focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Description</label>
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg shadow-2xs focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Replace Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setEditImages(e.target.files)}
                  className="w-full text-xs text-slate-500 border border-slate-200 rounded-lg bg-white file:mr-3 file:py-2 file:px-3.5 file:rounded-l-lg file:border-0 file:border-r file:border-slate-200 file:text-xs file:font-medium file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100 cursor-pointer"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setOpenEdit(false)}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {dataAtom.data?.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[220px] border border-dashed border-slate-200 rounded-xl bg-slate-50/50 p-6 text-center">
          <p className="text-sm font-medium text-slate-600">No tasks found</p>
          <p className="text-xs text-slate-400 mt-1">Click "Add Task" above to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {dataAtom.data?.map((e) => (
            <div
              key={e.id}
              className="group flex items-center justify-between p-4 bg-white border border-slate-200/80 hover:border-slate-300 rounded-xl shadow-2xs hover:shadow-xs transition-all"
            >
              <div className="flex items-center gap-3.5 min-w-0 pr-4">
                {e.images && e.images.length > 0 ? (
                  <img
                    src={`${imageBaseUrl}${e.images[0].imageName}`}
                    alt={e.name}
                    className="w-12 h-12 object-cover rounded-lg border border-slate-200/80 shrink-0 bg-slate-50"
                  />
                ) : (
                  <div className="w-12 h-12 bg-slate-100/70 rounded-lg border border-slate-200/60 flex items-center justify-center text-slate-400 shrink-0">
                    <ImageIcon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                )}

                <div className="min-w-0 space-y-0.5">
                  <p className="text-sm font-semibold text-slate-900 truncate">{e.name}</p>
                  {e.description && (
                    <p className="text-xs text-slate-500 truncate leading-relaxed">{e.description}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleOpenEdit(e)}
                  className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Edit task"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteData(e.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}