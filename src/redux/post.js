import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
    "post/getPosts",
    async () => {
        const url = `http://localhost:8000/api/user/post/timeline/all`;
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





export const specificUserPosts = createAsyncThunk(
    "post/specificUserPosts",
    async (id) => {
        const url = `http://localhost:8000/api/user/post/profile/${id}`;
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
    name: "post",
    initialState: {
        posts: [],
        status: null,
        error: ""
    },
    extraReducers:{
        [getPosts.pending]:(state)=>{
            state.status="loading";
        },
        [getPosts.fulfilled]:(state,action)=>{
            state.status="success";
            state.posts=action.payload.posts;
            state.posts.sort((x, y) => {
                return new Date(x.timestamp) < new Date(y.timestamp) ? 1 : -1
            })
        },
        [getPosts.rejected]:(state,action)=>{
            state.status="failed";
            state.error=action.error.message;
        },
        [specificUserPosts.pending]:(state)=>{
            state.status="loading";
        },
        [specificUserPosts.fulfilled]:(state,action)=>{
            state.status="success";
            state.posts=action.payload.posts;
            state.posts.sort((x, y) => {
                return new Date(x.timestamp) < new Date(y.timestamp) ? 1 : -1
            })
        },
        [specificUserPosts.rejected]:(state,action)=>{
            state.status="failed";
            state.error=action.error.message;
        }
    }
})




export default userSlice.reducer;


