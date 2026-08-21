import { configureStore } from '@reduxjs/toolkit'
    import counterReducer from './boxSlicle.js'

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})