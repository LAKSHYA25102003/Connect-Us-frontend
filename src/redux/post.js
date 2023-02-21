import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
    "post/getPosts",
    async () => {
        const url = `${process.env.REACT_APP_BASE_URL}api/user/post/timeline/all`;
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
        const url = `${process.env.REACT_APP_BASE_URL}api/user/post/profile/${id}`;
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


export const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        status: null,
        error: ""
    },
    reducers:{
        deletePost: (state,action)=>{
            state.posts=state.posts.filter((post)=>{
                return (post._id!==action.payload.id)
            });

            state.posts.sort((x, y) => {
                return new Date(x.timestamp) < new Date(y.timestamp) ? 1 : -1
            });
        }
    },
    extraReducers:{
        [getPosts.pending]:(state)=>{
            state.status="loading";
        },
        [getPosts.fulfilled]:(state,action)=>{
            state.status="success";
            state.posts=action.payload.posts;
            state.posts.sort((x, y) => {
                return new Date(x.createdAt) < new Date(y.createdAt) ? 1 : -1
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
                return new Date(x.createdAt) < new Date(y.createdAt) ? 1 : -1
            })
        },
        [specificUserPosts.rejected]:(state,action)=>{
            state.status="failed";
            state.error=action.error.message;
        }
    }
})


export const {deletePost} = postSlice.actions;

export default postSlice.reducer;


