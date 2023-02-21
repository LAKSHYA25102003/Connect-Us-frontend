import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
    "user/getUser",
    async () => {
        const url = `${process.env.REACT_APP_BASE_URL}api/user/get-user-by-token`;
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'auth-token':localStorage.getItem("auth-token"),
            },
        })
        response=await response.json();
        return response;
    }
)


export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        status: null,
        error: ""
    },
    extraReducers:{
        [getUser.pending]:(state)=>{
            state.status="loading";
        },
        [getUser.fulfilled]:(state,action)=>{
            state.status="success";
            state.user=action.payload.user;
        },
        [getUser.rejected]:(state,action)=>{
            state.status="failed";
            state.error=action.error.message;
        }
    }
})




export default userSlice.reducer;


