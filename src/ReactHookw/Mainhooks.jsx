import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const data = []

export default function Mainhooks() {
  const [user, setUser] = useState(data)
  const [editId, setEditId] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [viewUser, setViewUser] = useState(null)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const addUser = (newObj) => {
    newObj = {
      ...newObj,
      id: Date.now(),
    }
    setUser((prev) => [...prev, newObj])
  }

  const deleteUser = (id) => {
    setUser((prev) => prev.filter((item) => item.id !== id))
    if (viewUser && viewUser.id === id) {
      setViewUser(null)
    }
  }

  const editUser = (item) => {
    setEditId(item.id)
    reset({
      name: item.name,
      age: item.age,
      job: item.job,
    })
    setViewUser(null)
    setIsOpen(true)
  }

  const openAddModal = () => {
    setEditId(null)
    reset({ name: '', age: '', job: '' })
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setEditId(null)
    reset({ name: '', age: '', job: '' })
  }

  const onSubmit = (values) => {
    if (editId !== null) {
      setUser((prev) =>
        prev.map((item) => (item.id === editId ? { ...item, ...values } : item))
      )
    } else {
      addUser(values)
    }
    closeModal()
  }

  console.log(watch('name'))

  const cartoonyPrimaryBtn =
    'px-6 py-3 bg-slate-900 text-white font-semibold text-base rounded-2xl hover:scale-105 active:scale-95 hover:rotate-1 active:rotate-0 transition-transform duration-200 ease-spring cursor-pointer'

  const cartoonySecondaryBtn =
    'px-6 py-3 bg-slate-100 text-slate-700 font-semibold text-base rounded-2xl hover:scale-105 active:scale-95 hover:-rotate-1 active:rotate-0 transition-transform duration-200 ease-spring cursor-pointer'

  const cartoonyEditBtn =
    'px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:scale-110 active:scale-90 hover:-rotate-3 active:rotate-0 transition-transform duration-200 ease-spring cursor-pointer'

  const cartoonyDeleteBtn =
    'px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-semibold rounded-xl hover:scale-110 active:scale-90 hover:rotate-3 active:rotate-0 transition-transform duration-200 ease-spring cursor-pointer'

  return (
    <div className="relative min-h-screen bg-slate-100/90 p-8 md:p-12 font-sans text-slate-800 flex justify-center items-start pt-16 overflow-hidden">
      {/* Barely Noticeable Subtle Ambient Wavy Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.18] overflow-hidden">
        <svg
          className="absolute w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -100,150 Q 300,50 700,350 T 1500,200"
            fill="none"
            stroke="#64748b"
            strokeWidth="1.5"
            className="animate-[glowLine1_14s_ease-in-out_infinite_alternate]"
          />
          <path
            d="M -100,500 Q 400,700 800,300 T 1600,650"
            fill="none"
            stroke="#64748b"
            strokeWidth="1.5"
            className="animate-[glowLine2_18s_ease-in-out_infinite_alternate-reverse]"
          />
          <path
            d="M 200,-100 Q 600,400 300,900 T 800,1200"
            fill="none"
            stroke="#64748b"
            strokeWidth="1"
            className="animate-[glowLine3_22s_ease-in-out_infinite_alternate]"
          />
        </svg>
      </div>

      <style>{`
        @keyframes glowLine1 {
          0% { d: path('M -100,150 Q 300,50 700,350 T 1500,200'); opacity: 0.2; }
          50% { d: path('M -100,250 Q 500,400 800,150 T 1500,400'); opacity: 0.7; }
          100% { d: path('M -100,100 Q 200,300 900,200 T 1500,300'); opacity: 0.3; }
        }
        @keyframes glowLine2 {
          0% { d: path('M -100,500 Q 400,700 800,300 T 1600,650'); opacity: 0.3; }
          50% { d: path('M -100,350 Q 200,200 900,600 T 1600,450'); opacity: 0.8; }
          100% { d: path('M -100,600 Q 600,400 700,550 T 1600,350'); opacity: 0.2; }
        }
        @keyframes glowLine3 {
          0% { d: path('M 200,-100 Q 600,400 300,900 T 800,1200'); opacity: 0.15; }
          50% { d: path('M 400,-100 Q 200,600 500,800 T 600,1200'); opacity: 0.6; }
          100% { d: path('M 100,-100 Q 800,200 200,1000 T 900,1200'); opacity: 0.2; }
        }
      `}</style>

      <div className="relative z-10 w-full max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10">
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              User List
            </h1>
            <p className="text-base text-slate-400 mt-1">
              Total: <span className="font-semibold text-slate-700">{user.length}</span>
            </p>
          </div>
          <button onClick={openAddModal} className={cartoonyPrimaryBtn}>
            + Add Task
          </button>
        </div>

        <div className="space-y-3">
          {user.length === 0 ? (
            <div className="text-center py-20 text-slate-400 text-base border-2 border-dashed border-slate-200 rounded-3xl">
              No entries yet. Click "+ Add Task" to create one.
            </div>
          ) : (
            user.map((item) => (
              <div
                key={item.id || item.name}
                onClick={() => setViewUser(item)}
                className="group flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-2xl transition-all duration-200 cursor-pointer hover:scale-[1.01] active:scale-[0.99] hover:-rotate-0.5 active:rotate-0"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-3 h-3 rounded-full bg-slate-300 group-hover:bg-slate-900 transition-colors shrink-0" />
                  <div className="flex items-baseline gap-3 truncate">
                    <span className="font-bold text-slate-900 text-lg truncate">
                      {item.name}
                    </span>
                    {item.job && (
                      <span className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-lg border border-slate-200">
                        {item.job}
                      </span>
                    )}
                    {item.age && (
                      <span className="text-sm text-slate-400">
                        ({item.age} yrs)
                      </span>
                    )}
                  </div>
                </div>

                <div 
                  className="flex gap-2 shrink-0 ml-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => editUser(item)}
                    className={cartoonyEditBtn}
                  >
                    edit
                  </button>
                  <button
                    onClick={() => deleteUser(item.id)}
                    className={cartoonyDeleteBtn}
                  >
                    delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Info Dialog */}
      <div
        className={`fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-6 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          viewUser
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-8 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${
            viewUser
              ? 'scale-100 translate-y-0 rotate-0 opacity-100'
              : 'scale-90 translate-y-8 -rotate-2 opacity-0'
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900">User Details</h2>
            <button
              onClick={() => setViewUser(null)}
              className="text-slate-400 hover:text-slate-600 hover:rotate-90 text-base font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-all duration-200 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {viewUser && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</span>
                  <p className="text-xl font-bold text-slate-900">{viewUser.name}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Age</span>
                  <p className="text-base font-medium text-slate-700">{viewUser.age ? `${viewUser.age} years old` : 'N/A'}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Job</span>
                  <p className="text-base font-medium text-slate-700">{viewUser.job || 'N/A'}</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => editUser(viewUser)}
                  className={cartoonyEditBtn}
                >
                  edit
                </button>
                <button
                  onClick={() => deleteUser(viewUser.id)}
                  className={cartoonyDeleteBtn}
                >
                  delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form Dialog (Add / Edit) */}
      <div
        className={`fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-6 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-8 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${
            isOpen
              ? 'scale-100 translate-y-0 rotate-0 opacity-100'
              : 'scale-90 translate-y-8 rotate-2 opacity-0'
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900">
              {editId !== null ? 'Edit User' : 'Add User'}
            </h2>
            <button
              onClick={closeModal}
              className="text-slate-400 hover:text-slate-600 hover:rotate-90 text-base font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-all duration-200 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                placeholder="name"
                {...register('name', { required: true })}
                type="text"
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-400 text-base text-slate-800 placeholder-slate-400 transition-colors"
              />
            </div>
            <div>
              <input
                placeholder="age"
                {...register('age', { min: 1, max: 99 })}
                type="number"
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-400 text-base text-slate-800 placeholder-slate-400 transition-colors"
              />
            </div>
            <div>
              <input
                placeholder="job"
                {...register('job', { minLength: 1, maxLength: 99 })}
                type="text"
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-400 text-base text-slate-800 placeholder-slate-400 transition-colors"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={closeModal}
                className={cartoonySecondaryBtn}
              >
                Cancel
              </button>
              <button type="submit" className={cartoonyPrimaryBtn}>
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}