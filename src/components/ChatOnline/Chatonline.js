import "./chatonline.css"
import { useEffect, useState } from "react";

export default function Chatonline(props) {
    const pf=process.env.REACT_APP_PUBLLC_FOLDER;
    const { onlineUsers, currUser, setCurrChat } = props;
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState(null);


    useEffect(() => {
        const fetchFriends = async () => {
            const url = `http://localhost:8000/api/user/friends/${currUser._id}`
            let response = await fetch(url, {
                method: "GET"
            })
            response = await response.json();
            if (response.success === true) {
                setFriends(response.friendlist);
                setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
            }
        }
        (currUser._id !== undefined) && fetchFriends();
    }, [currUser])



    return (
        (onlineFriends!==null)&&<div className="chatOnline">
            {
                onlineFriends.map((o) => {
                    return (<div key={o._id} className="chatOnlineFriend">
                        <div className="chatOnlineImgContainer">
                            <img className="chatOnlineImg" src={o.profilePicture?pf+o.profilePicture:`${pf}profile.jpg`} alt="" />
                            <div className="chatOnlineBadge"></div>
                        </div>
                        <span className="chatOnlineName">{o.name}</span>
                    </div>
                    )
                })
            }
        </div>
    )
}
