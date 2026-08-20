import axios from "axios";
import { atom } from "jotai";
import { loadable, atomWithRefresh } from "jotai/utils";

const api = "https://to-dos-api.softclub.tj/api/to-dos";
export const imageBaseUrl = "https://to-dos-api.softclub.tj/images/";

export const dataAtom = atomWithRefresh(async () => {
  try {
    let { data } = await axios.get(api);
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
});

export const loadableData = loadable(dataAtom);

export const deleteAtom = atom(null, async (get, set, id) => {
  try {
    await axios.delete(`${api}?id=${id}`);
    set(dataAtom);
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
});

export const addAtom = atom(null, async (get, set, newItem) => {
  try {
    const formData = new FormData();
    formData.append("Name", newItem.name);
    formData.append("Description", newItem.description);
    formData.append("IsCompleted", newItem.isCompleted);

    if (newItem.images) {
      for (let i = 0; i < newItem.images.length; i++) {
        formData.append("Images", newItem.images[i]);
      }
    }

    await axios.post(api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    set(dataAtom);
  } catch (error) {
    console.error("Error adding todo:", error);
  }
});

export const editAtom = atom(null, async (get, set, updatedItem) => {
  try {
    const formData = new FormData();
    formData.append("Id", updatedItem.id);
    formData.append("Name", updatedItem.name);
    formData.append("Description", updatedItem.description);
    formData.append("IsCompleted", updatedItem.isCompleted);

    if (updatedItem.images) {
      for (let i = 0; i < updatedItem.images.length; i++) {
        formData.append("Images", updatedItem.images[i]);
      }
    }

    await axios.put(api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    set(dataAtom);
  } catch (error) {
    console.error("Error updating todo:", error);
  }
});