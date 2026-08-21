import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, deleteData, editData, addData } from "./redux/store/practiceSlice";
import { Trash2, X, Plus } from "lucide-react";

export default function Main() {
  const { data = [] } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const [id, setId] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [imageName, setImageName] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editImageName, setEditImageName] = useState("");
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const addUser = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    dispatch(
      addData({
        name: name,
        description: description,
        imageName: imageName,
      })
    );

    setImageName("");
    setName("");
    setDescription("");
    setOpenAdd(false);
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

  const openUserInfo = (user) => {
    setSelectedUser(user);
    setOpenInfo(true);
  };

  const getImageUrl = (user) => {
    const img = user?.images?.[0]?.imageName || user?.imageName;
    if (!img) return null;
    return img.startsWith("http")
      ? img
      : `https://to-dos-api.softclub.tj/images/${img}`;
  };

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-7xl font-bold">User List</h1>
        <button
          onClick={() => setOpenAdd(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus size={18} /> Add User
        </button>
      </div>

      {openAdd && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
          <div className="bg-white w-full max-w-md h-full p-6 relative flex flex-col justify-between overflow-y-auto">
            <div>
              <button
                onClick={() => setOpenAdd(false)}
                className="hover:bg-red-100 p-2 text-red-600 rounded transition absolute top-4 right-4"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold mt-8 mb-6">Add New User</h2>

              <form id="add-user-form" onSubmit={addUser} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Image Name / URL</label>
                  <input
                    type="text"
                    placeholder="Enter image URL..."
                    value={imageName}
                    onChange={(e) => setImageName(e.target.value)}
                    className="border p-2 rounded w-full focus:outline-blue-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Name</label>
                  <input
                    type="text"
                    placeholder="Enter name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded w-full focus:outline-blue-500"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Description</label>
                  <textarea
                    placeholder="Enter description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 rounded w-full h-32 resize-none focus:outline-blue-500"
                  />
                </div>
              </form>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                type="button"
                onClick={() => setOpenAdd(false)}
                className="bg-gray-200 text-gray-700 w-1/2 py-2 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="add-user-form"
                className="text-white bg-blue-600 w-1/2 py-2 rounded hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {openEdit && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
          <div className="bg-white w-full max-w-md h-full p-6 relative flex flex-col justify-between overflow-y-auto">
            <div>
              <button
                onClick={() => setOpenEdit(false)}
                className="hover:bg-red-100 p-2 text-red-600 rounded transition absolute top-4 right-4"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold mt-8 mb-6">Edit User</h2>

              <form id="edit-user-form" onSubmit={handleEditUser} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Image Name / URL</label>
                  <input
                    type="text"
                    value={editImageName}
                    onChange={(e) => setEditImageName(e.target.value)}
                    className="border p-2 rounded w-full focus:outline-blue-500"
                    placeholder="Enter image URL..."
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border p-2 rounded w-full focus:outline-blue-500"
                    placeholder="Enter name..."
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Description</label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="border p-2 rounded w-full h-32 resize-none focus:outline-blue-500"
                    placeholder="Enter description..."
                  />
                </div>
              </form>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                type="button"
                onClick={() => setOpenEdit(false)}
                className="bg-gray-200 text-gray-700 w-1/2 py-2 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="edit-user-form"
                className="text-white bg-blue-600 w-1/2 py-2 rounded hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {openInfo && selectedUser && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
          <div className="bg-white w-full max-w-md h-full p-6 relative flex flex-col justify-between overflow-y-auto">
            <div>
              <button
                onClick={() => setOpenInfo(false)}
                className="hover:bg-red-100 p-2 text-red-600 rounded transition absolute top-4 right-4"
              >
                <X size={24} />
              </button>

              {getImageUrl(selectedUser) ? (
                <img
                  src={getImageUrl(selectedUser)}
                  alt="todo-img"
                  className="w-full h-64 object-cover rounded mt-8 mb-6"
                />
              ) : (
                <div className="bg-gray-100 w-full h-64 flex items-center justify-center rounded mt-8 mb-6 text-gray-400">
                  No Image Available
                </div>
              )}

              <div className="flex flex-col gap-3">
                <p className="text-2xl font-bold">{selectedUser.name}</p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Description:</span> {selectedUser.description}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Status:</span>{" "}
                  <span className={selectedUser.isCompleted ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {selectedUser.isCompleted ? "Active" : "Inactive"}
                  </span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpenInfo(false)}
              className="text-white bg-red-600 w-full py-2 rounded hover:bg-red-700 transition mt-6"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-5 mt-10">
        {data.map((user) => {
          const imgUrl = getImageUrl(user);

          return (
            <div
              key={user.id}
              className="border p-4 rounded shadow-sm flex flex-col gap-2 w-64 cursor-pointer hover:scale-105 hover:shadow-2xl transition ease-initial"
              onClick={() => openUserInfo(user)}
            >
              {imgUrl ? (
                <img
                  src={imgUrl}
                  alt="todo-img"
                  className="w-full h-32 object-cover rounded mb-2 bg-gray-400/10"
                />
              ) : (
                <div className="w-full h-32 bg-gray-200 flex items-center justify-center rounded mb-2 text-xs text-gray-500">
                  No image
                </div>
              )}

              <p className="text-xl font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-black">Description:</span> {user.description}
              </p>
              <p className="text-sm">
                <span className="font-medium text-black">Status:</span>{" "}
                <span className={user.isCompleted ? "text-green-600" : "text-red-600"}>
                  {user.isCompleted ? "Active" : "Inactive"}
                </span>
              </p>

              <div className="flex gap-2 mt-auto pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(user);
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded flex-1 hover:bg-yellow-600 transition"
                >
                  Edit
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(deleteData(user.id));
                  }}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}