import { configureStore } from '@reduxjs/toolkit'
import postSlice from './reducers/post.slice'
import userSlice from './reducers/user.slice'
import profileSlice from './reducers/profile.slice'

export default configureStore({
  reducer: {
    profile: profileSlice.reducer,
    posts: postSlice.reducer, 
    user: userSlice.reducer,
  },
})