import PostContext from "./PostContext";
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/post";

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

    return (

        <PostContext.Provider value={{deletePostFn}}>
            {props.children}
        </PostContext.Provider>

    )
}


