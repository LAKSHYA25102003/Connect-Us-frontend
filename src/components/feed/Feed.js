import React from 'react'
import "./Feed.css"
import Share from '../share/Share'
import Post from '../post/Post'
import { getPosts } from '../../redux/post';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/exports";
import { useEffect } from 'react';
import { specificUserPosts } from '../../redux/post';



export default function Feed(props) {


  const postCreated=()=>{
    !props.profileId?dispatch(getPosts()):dispatch(specificUserPosts(props.profileId));
  }
  
  const dispatch=useDispatch();
  useEffect(()=>{
    !props.profileId?dispatch(getPosts()):dispatch(specificUserPosts(props.profileId));
  },[])
  
  const Posts=useSelector(state=>state.post.posts);
  

  return (
    <div className='feedContainer'>
      <div className="feedWrapper">
        <Share postCreated={postCreated}/>
        {
          Posts.map((post)=>{
            return <Post key={post._id} post={post} />
          })
        }
      </div>
    </div>
  )
}
