import { useAtomValue, useSetAtom } from 'jotai'
import React, { useState } from 'react'
import { addAtom, dataAtom, deleteAtom, editAtom } from './store'

export default function PracticeMain() {
  const data = useAtomValue(dataAtom) ?? []
  const deleteData = useSetAtom(deleteAtom)
  const editData = useSetAtom(editAtom)
  const addData = useSetAtom(addAtom)

  const [open, setOpen] = useState(false)

  const [id, setId] = useState(null)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [status, setStatus] = useState(false)

  const [nameA, setNameA] = useState('')
  const [ageA, setAgeA] = useState('')
  const [openA, setOpenA] = useState(false)

  const editUser = () => {
    editData({
      id: id,
      name: name,
      age: Number(age),
      status: status,
    })

    setOpen(false)
    setName('')
    setId(null)
    setAge('')
  }

  const openModal = (item) => {
    setId(item.id)
    setName(item.name)
    setAge(item.age)
    setStatus(item.status)
    setOpen(true)
  }

  const addUser = () => {
    if (!nameA.trim()) return
    addData({ id: Date.now(), name: nameA, age: Number(ageA), status: true })
    setNameA('')
    setAgeA('')
    setOpenA(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-slate-200">
      <div className="max-w-8xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between pb-8 mb-8 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Users Directory
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage team members and their account statuses
            </p>
          </div>
          <button
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-sm transition-all duration-150 ease-in-out cursor-pointer"
            onClick={() => setOpenA(true)}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Member
          </button>
        </div>

        <div className="grid gap-3">
          {data.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-200">
              <p className="text-slate-400 text-sm">No users found.</p>
            </div>
          ) : (
            data.map((item) => (
              <div
                key={item.id}
                className="group flex items-center justify-between bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-6 py-4 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-medium text-slate-600 text-sm">
                    {item.name ? item.name.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-base">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                      <span>{item.age} years old</span>
                      <span className="text-slate-300">•</span>
                      <span
                        className={`inline-flex items-center gap-1.5 font-medium px-2 py-0.5 rounded-full text-xs ${
                          item.status
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                            : 'bg-slate-100 text-slate-600 border border-slate-200/60'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.status ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                        />
                        {item.status ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                  <button
                    className="text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 px-3 py-1.5 rounded-md transition-colors duration-150 cursor-pointer"
                    onClick={() => openModal(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 active:bg-rose-100 px-3 py-1.5 rounded-md transition-colors duration-150 cursor-pointer"
                    onClick={() => deleteData(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {openA && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 animate-in zoom-in-95 duration-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Add New Member
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jane Doe"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                  value={nameA}
                  onChange={(e) => setNameA(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  placeholder="e.g. 28"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                  value={ageA}
                  onChange={(e) => setAgeA(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
                onClick={() => setOpenA(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition"
                onClick={addUser}
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 animate-in zoom-in-95 duration-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Edit User Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-medium text-slate-700">
                  Account Status
                </span>
                <button
                  type="button"
                  onClick={() => setStatus(!status)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    status ? 'bg-slate-900' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      status ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition"
                onClick={editUser}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}