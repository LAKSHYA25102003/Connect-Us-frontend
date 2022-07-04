import { createSlice } from "@reduxjs/toolkit";


export const userSlice=createSlice({
    name:"user",
    initialState:{
        user:{},
        status:false,
        error:""
    },
    reducers:{
        loginUser:(state,action)=>{
            if(action.payload.message==='success')
            {
                state.user=action.payload.user;
                state.status=true;
            }
        }
    }
})


export const {loginUser}=userSlice.actions;

export default userSlice.reducer;


