import React, { useEffect, useState } from 'react'
import { useTodo } from './components/store/todo'
import { Pen, Trash2, X, Search, Filter, PenLine } from 'lucide-react'

export default function MainDay8() {
  const { todos, getUI, deleteUI, editUI, addUI } = useTodo()

  const [openEdit, setOpenEdit] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({ name: '', age: '', job: '' })

  const [openAdd, setOpenAdd] = useState(false)
  const [addData, setAddData] = useState({ name: '', age: '', job: '' })

  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUI()

    const timer = setTimeout(() => {
      setLoading(false)
    }, 10000)

    return () => clearTimeout(timer)
  }, [getUI])

  const handleOpenEdit = (item) => {
    setEditId(item.id)
    setEditData({ name: item.name || '', age: item.age || '', job: item.job || '' })
    setOpenEdit(true)
  }

  const handleCloseEdit = () => {
    setOpenEdit(false)
    setEditId(null)
    setEditData({ name: '', age: '', job: '' })
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    if (!editId) return
    editUI({ id: editId, ...editData })
    handleCloseEdit()
  }

  const handleOpenAdd = () => {
    setOpenAdd(true)
  }

  const handleCloseAdd = () => {
    setOpenAdd(false)
    setAddData({ name: '', age: '', job: '' })
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()
    addUI(addData)
    handleCloseAdd()
  }

  const filteredTodos = (todos || []).filter((item) => {
    const value = searchTerm.toLowerCase()
    const nameMatch = item.name ? item.name.toLowerCase().includes(value) : false
    const jobMatch = item.job ? item.job.toLowerCase().includes(value) : false
    const ageMatch = item.age ? String(item.age).includes(value) : false

    if (filterType === 'name') return nameMatch
    if (filterType === 'job') return jobMatch
    if (filterType === 'age') return ageMatch
    return nameMatch || jobMatch || ageMatch
  })

  return (
    <>
      {openEdit && (
        <dialog open className='fixed inset-0 z-50 w-[90%] max-w-lg bg-white/95 backdrop-blur-md rounded-3xl border-2 border-gray-300/80 p-6 flex flex-col gap-5 mx-auto my-auto shadow-2xl transition-all duration-300'>
          <div className="relative flex items-center justify-between border-b-2 border-gray-100 pb-4">
            <p className='text-3xl font-semibold text-gray-800'>Edit User Information</p>
            <button type="button" onClick={handleCloseEdit}>
              <X className='w-8 h-8 p-1 text-gray-500 transition-all duration-200 ease-out hover:bg-red-50 hover:text-red-600 rounded-full cursor-pointer' />
            </button>
          </div>
          <form onSubmit={handleEditSubmit} className='flex flex-col gap-4 mt-2'>
            <input
              type="text"
              placeholder='Name'
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className='border border-gray-300 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all'
            />
            <input
              type="text"
              placeholder='Age'
              value={editData.age}
              onChange={(e) => setEditData({ ...editData, age: e.target.value })}
              className='border border-gray-300 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all'
            />
            <input
              type="text"
              placeholder='Job'
              value={editData.job}
              onChange={(e) => setEditData({ ...editData, job: e.target.value })}
              className='border border-gray-300 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all'
            />
            <button type="submit" className='bg-blue-600 text-white font-medium p-3 rounded-2xl hover:bg-blue-700 active:scale-[0.98] cursor-pointer transition-all duration-200 shadow-md shadow-blue-500/20 mt-2'>
              Save Changes
            </button>
          </form>
        </dialog>
      )}

      {openAdd && (
        <dialog open className='fixed inset-0 z-50 w-[90%] max-w-lg bg-white/95 backdrop-blur-md rounded-3xl border-2 border-gray-300/80 p-6 flex flex-col gap-5 mx-auto my-auto shadow-2xl transition-all duration-300'>
          <div className="relative flex items-center justify-between border-b-2 border-gray-100 pb-4">
            <p className='text-3xl font-semibold text-gray-800'>Add New User</p>
            <button type="button" onClick={handleCloseAdd}>
              <X className='w-8 h-8 p-1 text-gray-500 transition-all duration-200 ease-out hover:bg-red-50 hover:text-red-600 rounded-full cursor-pointer' />
            </button>
          </div>
          <form onSubmit={handleAddSubmit} className='flex flex-col gap-4 mt-2'>
            <input
              type="text"
              placeholder='Name'
              value={addData.name}
              onChange={(e) => setAddData({ ...addData, name: e.target.value })}
              className='border border-gray-300 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all'
            />
            <input
              type="text"
              placeholder='Age'
              value={addData.age}
              onChange={(e) => setAddData({ ...addData, age: e.target.value })}
              className='border border-gray-300 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all'
            />
            <input
              type="text"
              placeholder='Job'
              value={addData.job}
              onChange={(e) => setAddData({ ...addData, job: e.target.value })}
              className='border border-gray-300 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all'
            />
            <button type="submit" className='bg-green-600 text-white font-medium p-3 rounded-2xl hover:bg-green-700 active:scale-[0.98] cursor-pointer transition-all duration-200 shadow-md shadow-green-500/20 mt-2'>
              Add User
            </button>
          </form>
        </dialog>
      )}

      <div className='bg-gray-200/50 w-[95%] mx-auto flex items-center justify-between p-4 mt-10 rounded-3xl border-2 border-gray-300/80 shadow-sm'>
        <p className="text-3xl font-medium px-6 py-3 bg-white text-center border border-gray-300/80 rounded-2xl flex items-center justify-center shadow-xs">ToDo user's</p>
        <button onClick={handleOpenAdd} className='bg-blue-600 text-white font-medium px-6 py-3 rounded-2xl hover:bg-blue-700 active:scale-95 transition-all cursor-pointer shadow-md shadow-blue-600/20'>
          Add user
        </button>
      </div>

      <div className='bg-gray-200/50 w-[95%] rounded-3xl flex flex-col gap-3 p-3 mx-auto mt-5 border-2 border-gray-300/80 max-h-[700px] overflow-y-auto'>
        <div className='sticky top-0 z-10 flex flex-col md:flex-row items-center gap-3 w-full bg-white/80 backdrop-blur-md p-2 rounded-2xl border border-gray-300/60 shadow-xs'>
          <div className='relative flex-1 flex items-center w-full'>
            <Search className='w-5 h-5 absolute left-3.5 text-gray-400 pointer-events-none' />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full bg-white border border-gray-300/80 pl-10 pr-4 py-2.5 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-xs'
            />
          </div>
          <div className='relative flex items-center w-full md:w-auto'>
            <Filter className='w-4 h-4 absolute left-3 text-gray-500 pointer-events-none' />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className='w-full md:w-auto bg-white border border-gray-300/80 pl-9 pr-8 py-2.5 rounded-2xl text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-xs appearance-none cursor-pointer'
            >
              <option value="all">All Fields</option>
              <option value="name">Name</option>
              <option value="job">Job</option>
              <option value="age">Age</option>
            </select>
          </div>
        </div>

        {!todos || todos.length === 0 ? (
          <p className='text-center bg-white px-8 py-6 text-2xl font-medium text-gray-500 rounded-2xl flex items-center justify-center mx-auto shadow-xs border border-gray-200'>
            {loading ? 'Loading . . .' : 'No internet !'}
          </p>
        ) : filteredTodos.length === 0 ? (
          <p className='text-center bg-white px-8 py-6 text-xl font-medium text-gray-500 rounded-2xl flex items-center justify-center mx-auto shadow-xs border border-gray-200'>No matching users found.</p>
        ) : (
          filteredTodos.map((item) => (
            <header key={item.id} className='bg-white w-[99%] rounded-2xl p-5 border border-gray-300/70 flex flex-col gap-2 mx-auto hover:shadow-md transition-all duration-200 ease-out shrink-0'>
              <div className="flex items-center gap-6 md:gap-10">
                <img src={item.avatar} alt={item.name || 'User avatar'} className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 p-0.5 shadow-xs" />
                <section>
                  <h3 className='flex items-center gap-3'>
                    <span className='font-semibold text-2xl text-gray-800'>{item.name ? item.name : 'Name not available'}</span>
                    <span className='text-gray-500 font-normal text-lg'> ({item.age})</span>
                  </h3>
                  <p className='text-sm font-medium text-gray-500 mt-0.5'>{item.job ? item.job : 'Job not available'}</p>
                </section>
                <div className="flex gap-4 ml-auto">
                  <button type="button" onClick={() => handleOpenEdit(item)}>
                    <PenLine className='w-9 h-8 p-1.5 text-blue-600 transition-all duration-200 ease-out hover:bg-blue-50 hover:scale-110 active:scale-90 rounded-xl cursor-pointer select-none' />
                  </button>
                  <button type="button" onClick={() => deleteUI(item.id)}>
                    <Trash2 className="w-8 h-8 p-1.5 text-red-600 transition-all duration-200 ease-out hover:bg-red-50 hover:scale-110 active:scale-90 rounded-xl cursor-pointer select-none" />
                  </button>
                </div>
              </div>
            </header>
          ))
        )}
      </div>

      <p className='text-center text-gray-500 absolute bottom-2 left-1/2 transform -translate-x-1/2'>a simple todo project</p>
    </>
  )
}
  