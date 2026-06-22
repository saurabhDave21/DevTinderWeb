import { createSlice } from "@reduxjs/toolkit";

const connection = createSlice({
    name:"connection",
    initialState:{
        value:null
    },
    reducers:{
        addConnection:(state,action)=>{
            state.value = action.payload
        },
        removeConnection:(state,action)=>{
            state.value = null
        }
    }
})

export const {addConnection ,removeConnection} = connection.actions
export default connection.reducer