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
  const user=useSelector(state=>state.user.user);

  const postCreated=()=>{
    !props.profileId?dispatch(getPosts()):dispatch(specificUserPosts(props.profileId));
  }
  
  const dispatch=useDispatch();
  useEffect(()=>{
    !props.profileId?dispatch(getPosts()):dispatch(specificUserPosts(props.profileId));
  },[props.profileId])

  const Posts=useSelector(state=>state.post.posts);

  return (
    <div className='feedContainer'>
      <div className="feedWrapper">
        {
        props.profileId?((props.profileId===user._id)&&<Share postCreated={postCreated}/>):
        <Share postCreated={postCreated}/>
        }
        {
          Posts.length!==0?Posts.map((post)=>{
            return <Post key={post._id} post={post} />
          }):
          <div style={{color:"gray",fontSize:"24px",fontWeight:"500"}}>No Posts!</div>
        }
        
      </div>
    </div>
  )
}
