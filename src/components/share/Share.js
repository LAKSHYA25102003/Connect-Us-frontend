import "./share.css"
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { getUser } from "../../redux/user";
import { Link } from "react-router-dom";

export default function Share() {


    // getting the user
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("auth-token")) {
            dispatch(getUser());
        }
        else {
            navigate("/login");
        }
    }, [])

    const user = useSelector(state => state.user.user);

    return (
        <div className="shareContainer">
            <div className="shareWrapper">
                <div className="shareTop">
                    <Link to={`/profile/${user._id}/${user.name}`}>
                        <img src={user.profilePicture || `/assets/profile.jpg`} alt="Image" className="shareImageIcon" />
                    </Link>
                    <input placeholder={`What are you thinking ${user.name}?`} className="shareInput" />
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMedia htmlColor="orange" className="shareOptionIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                        </div>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareOptionIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareOptionIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="#FF33BB" className="shareOptionIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton">Share</button>
                </div>
            </div>
        </div>
    )
}
