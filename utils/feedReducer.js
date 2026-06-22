import { createSlice } from "@reduxjs/toolkit";

const feed = createSlice({
    name:"feed",
    initialState:{
        value:null
    },
    reducers:{
        setFeed:(state,action)=>{
            state.value=action.payload
        },
        removeUserFromFeed:(state,action)=>{
            if (!state.value) return;
            state.value = state.value.filter(user => user._id !== action.payload)
        }
    }
})

export const { setFeed, removeUserFromFeed } = feed.actions
export default feed.reducer