import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import postReducer from "./post"

const Store= configureStore({
    reducer:{
        user:userReducer,
        post:postReducer
    }
});

export default Store;