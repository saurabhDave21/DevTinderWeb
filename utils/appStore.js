import { configureStore } from '@reduxjs/toolkit'
import user from "../utils/userReducer"
import feed from "../utils/feedReducer"
import connection from "../utils/connectionReducer"
import request from "../utils/requestreducer"
export const store = configureStore({
  reducer: {
    user,
    feed,
    connection,
    request
  },
})