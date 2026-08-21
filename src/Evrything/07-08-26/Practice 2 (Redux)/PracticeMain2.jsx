import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData, deleteData, addData, editData } from './store/todoSLice';

export default function PracticeMain2() {
  const { data = [], loading, error } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const [editImageName, setEditImageName] = useState("");
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const getImageUrl = (user) => {
    const img = user?.images?.[0]?.imageName || user?.imageName;
    if (!img) return null;
    return img.startsWith("http")
      ? img
      : `https://to-dos-api.softclub.tj/images/${img}`;
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    dispatch(
      editData({
        id: id,
        name: editName,
        description: editDescription,
        imageName: editImageName,
      })
    );

    setOpenEdit(false);
    setEditImageName("");
    setEditName("");
    setEditDescription("");
  };

  const openEditModal = (user) => {
    setId(user.id);
    setEditName(user.name || "");
    setEditDescription(user.description || "");
    const imgStr = user.images?.[0]?.imageName || user.imageName || "";
    setEditImageName(imgStr);
    setOpenEdit(true);
  };

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Description', description);
    if (file) {
      formData.append('Images', file);
    }

    dispatch(addData(formData)).then(() => {
      setName('');
      setDescription('');
      setFile(null);
      setOpen(false);
    });
  };

  if (loading) return <p className='bg-gray-200/20 border border-black w-100 h-20 m-10 text-4xl rounded flex items-center justify-center'>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-10">
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-5 hover:bg-blue-700"
      >
        Add Todo
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="border border-gray-300 p-5 rounded max-w-md w-full bg-white shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="border p-1 rounded"
              />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="border p-2 rounded"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="bg-gray-600/20 border-2 border-gray-400 px-4 py-2 rounded hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {openEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="border border-gray-300 p-5 rounded max-w-md w-full bg-white shadow-lg">
            <form onSubmit={handleEditUser} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                required
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Image Name"
                value={editImageName}
                onChange={(e) => setEditImageName(e.target.value)}
                className="border p-2 rounded"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setOpenEdit(false)}
                  className="bg-gray-600/20 border-2 border-gray-400 px-4 py-2 rounded hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-10">
        {data.length === 0 ? (
          <p>No user Found</p>
        ) : (
          data.map((item) => {
            const imgUrl = getImageUrl(item);
            return (
              <div key={item.id} className="border-2 border-black p-5 w-50 h-75 flex flex-col justify-between rounded">
                <div>
                  {imgUrl ? (
                    <img src={imgUrl} alt="todo-img" className="w-full h-32 object-cover rounded mb-2 bg-gray-400/10"/>
                  ) : (
                    <div className="w-full h-32 bg-gray-200 flex items-center justify-center rounded mb-2 text-xs text-gray-500">No image</div>
                  )}

                  <p><strong>{item.name}</strong></p>
                  <p>{item.description}</p>
                </div>
                <div className="flex gap-2 mt-2">
                  <button 
                    className="text-blue-600 hover:bg-blue-600 hover:text-white w-20 border border-blue-600 rounded" 
                    onClick={() => openEditModal(item)}
                  >
                    Edit
                  </button>
                  <button 
                    className="text-red-600 hover:bg-red-600 hover:text-white w-20 border border-red-600 rounded" 
                    onClick={() => dispatch(deleteData(item.id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}