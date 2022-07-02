import "./post.css"
import { MoreVert } from "@mui/icons-material"

export default function Post() {
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img className="postProfileImage" src="/assets/persons/1.jpg" alt="Image" />
                    <span className="postProfileName">Jenny</span>
                    <span className="postDate">5 min ago</span>
                </div>
                <div className="postTopRight">
                    <MoreVert className="verticalDot"/>
                </div>
            </div>
            <div className="postMid">
                <span className="postText">Hey this is my post</span>
                <img src="/assets/persons/1.jpg" alt="Post Image" className="postImage" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="postLikeIcon" src="/assets/heart.png" alt="" />
                    <img className="postLikeIcon" src="/assets/like.png" alt="" />
                    <span className="postLikeCounter">32 Likes</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentCounter">9 Comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
