import { createSlice } from "@reduxjs/toolkit";


const request = createSlice({
    name:"request",
    initialState:{
        value:null
    },
    reducers:{
        addRequest:(state,action)=>{
            state.value = action.payload
        },
        removeRequest:(state,action)=>{
            state.value = null
        }
    }
})

export const {addRequest,removeRequest} = request.actions
export default request.reducer
