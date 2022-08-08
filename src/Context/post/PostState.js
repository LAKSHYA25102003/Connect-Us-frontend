import PostContext from "./PostContext";
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/post";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PostState(props) {
    const dispatch=useDispatch();
    const deletePostFn=async (id)=>{
        const url=`http://localhost:8000/api/user/post/delete/${id}`
        let response=await fetch(url,{
            method:"DELETE",
            headers: {
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem("auth-token"),
            },
        })
        response=await response.json();
        console.log(response);
        if(response.success===true)
        {
            dispatch(deletePost({id}));
        }
    }

    const loginSuccess=()=>{
        toast.success("Successfully Login!");
    }

    const ServerError=()=>{
        toast.error("Internal Server Error!")
    }

    const loginFail=()=>{
        toast.error("Invalid Credentials!");
    }

    const logoutSuccess=()=>{
        toast.success("Successfully Logged Out!");
    }

    const profileUpdated=()=>{
        toast.success("Profile is Updated Successfully!");
    }

    const UserAlreadyExist=()=>{
        toast.warning("Email is in use already!");
    }

    const registerSuccess=()=>{
        toast.success("Account is created successfully!");
    }

    const passwordChange=()=>{
        toast.success("Password is changed successfully!");
    }

    const notFound=()=>{
        toast.warning("User is not found!");
    }

    return (

        <PostContext.Provider value={{deletePostFn,loginSuccess,ServerError,loginFail,logoutSuccess,profileUpdated,UserAlreadyExist,registerSuccess,passwordChange,notFound}}>
            {props.children}
        </PostContext.Provider>

    )
}

