import { useEffect } from "react"
import "./profile.css"
import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import RightBar from "../../components/rightbar/RightBar"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {useParams} from "react-router";

export default function Profile() {
    const params=useParams();
    const [postUser, setPostUser] = useState({});
    const pf=process.env.REACT_APP_PUBLLC_FOLDER;

    const navigate = useNavigate();

    const fetchPostUser = async () => {
        const url = `http://localhost:8000/api/user/get-user-by-id/${params.id}`
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
            },
        })
        response = await response.json();
        if (response.success === true) {
            setPostUser(response.user);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem("auth-token")) {
            navigate("/login");
        }
        else {
            fetchPostUser();
        }
    }, [])

    return (
        <div>
            <Navbar />
            <div className="profileContainer">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileUserCover">
                            <img className="profileUserCoverImg" src={postUser.coverPicture||`${pf}cover.jpg`} alt="" />
                            <img src={postUser.profilePicture||`${pf}profile.jpg`} alt="" className="profileUserImg" />
                        </div>
                        <div className="profileUserInfo">
                            <h4 className="profileUserInfoName">{postUser.name}</h4>
                            <span className="profileUserInfoDesc">{postUser.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed  profileId={params.id} />
                        <RightBar profileUser={postUser} />
                    </div>
                </div>
            </div>
        </div>
    )
}
