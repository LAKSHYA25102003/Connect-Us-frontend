import "./post.css"
import { MoreVert } from "@mui/icons-material"
import {Users} from "../../dummyData";
import { useState } from "react";


export default function Post(props) {

    const pf=process.env.REACT_APP_PUBLLC_FOLDER;

    const [like,setLike]=useState(props.post.like)
    const [isLike,setIsLike]=useState(false);

    const likeHandler=()=>{
        setLike(isLike?like-1:like+1);
        setIsLike(!isLike);
    }

    const {post}=props;
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img className="postProfileImage" src={pf+Users.filter((u)=>u.id===post.userId)[0].profilePicture} alt="Image" />
                    <span className="postProfileName">{Users.filter((u)=>u.id===post.userId)[0].name}</span>
                    <span className="postDate">{post.date}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert className="verticalDot"/>
                </div>
            </div>
            <div className="postMid">
                <span className="postText">{post.desc?post.desc:""}</span>
                <img src={pf+post.photo} alt="Post Image" className="postImage" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="postLikeIcon" src="/assets/heart.png" onClick={likeHandler} alt="" />
                    <img className="postLikeIcon" src="/assets/like.png" onClick={likeHandler} alt="" />
                    <span className="postLikeCounter">{like} Likes </span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentCounter">{post.comment} Comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
