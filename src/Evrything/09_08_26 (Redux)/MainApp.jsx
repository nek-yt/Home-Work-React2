import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, reset } from './store/boxSlicle'

export default function Counter() {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        
        <span className='border-2 border-gray-300 w-20 h-10 text-xl flex items-center justify-center'> {count} </span>
        <div className="">
            <button
                aria-label="Decrement value"
                className='border-2 border-red-500 w-20 h-10 text-xl'
                onClick={() => dispatch(decrement())}
            >
                dec -
            </button>

            <button
                aria-label="Decrement value"
                className='border-2 border-red-500 w-20 h-10 text-xl'
                onClick={() => dispatch(reset())}
            >
                reset
            </button>

            <button
                aria-label="Increment value"
                className='border-2 border-green-500 w-20 h-10 text-xl'
                onClick={() => dispatch(increment())}
            >
              inc +
            </button>
        </div>
      </div>
    </div>
  )
}