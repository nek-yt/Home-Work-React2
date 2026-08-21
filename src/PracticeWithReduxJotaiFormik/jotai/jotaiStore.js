import axios from "axios";
import { atom } from "jotai";

const api = "https://to-dos-api.softclub.tj/api/to-dos";

export const dataAtom = atom(async () => {
    try {
        const { data } = await axios.get(api)
        console.log(data);
        
        return data.data
    } catch (error) {
        console.error(error);
        
    }
})
