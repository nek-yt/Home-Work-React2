import { useAtomValue } from 'jotai'
import React, { useEffect } from 'react'
import { dataAtom } from './jotai/jotaiStore'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from './redux/store/todoSliceRedux'
import { PenLine, Trash2 } from 'lucide-react'

export default function MainTodoSection() {
    const datajojo = useAtomValue(dataAtom)
    const dispatch = useDispatch();
    const data = useSelector((state) => state.todos.data)


     useEffect(() => {
        dispatch(getData());
      }, [dispatch]);
    
  return (
    <div>
    <div className="flex flex-wrap gap-5 p-5">
        {data.map((item) => {
        const detail = datajojo.find(data => data.id === item.id);
           return(  
           <div key={item.id} className="border-2 border-black p-5 w-60 flex flex-col gap-10">
            <div className="w-full h-50 bg-gray-50 border mb-2">
                there is no img 
            </div>
            <div className="flex flex-col align-bottom">
                <p>(redux) name: {item.name}</p>
                <p>(jotai) description: {detail.description}</p>
                <div className="flex gap-10">
                    <button className='text-blue-600 w-20 border-2 border-blue-600 h-10 px-6.5 rounded hover:bg-blue-600 hover:text-white transition'><PenLine /></button>
                    <button className='text-red-600 w-20 border-2 border-red-600 h-10 px-6.5 rounded hover:bg-red-600 hover:text-white transition'><Trash2 /></button>
                </div>
            </div>
            </div>
        )})}    
    </div>  
    </div>
  )
}
