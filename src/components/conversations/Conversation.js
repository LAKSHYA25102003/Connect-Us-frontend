import { useEffect, useState } from "react";
import "./conversation.css"

export default function Conversation(props) {
  const [friend,setFriend]=useState(null);
  const {currUser,conversation}=props;

  const friendId=conversation.members.find((m)=>m!==currUser._id);
  const getFriends=async()=>{
    const url=`${process.env.REACT_APP_BASE_URL}api/user/get-user-by-id/${friendId}`;
    let response=await fetch(url,{
      method:"GET",
    })
    response=await response.json();
    if(response.success==true)
    {
      setFriend(response.user);
    }
  }

  useEffect(()=>{
    getFriends();
  },[friendId,currUser,conversation])

  const pf=process.env.REACT_APP_PUBLLC_FOLDER;
  return friend&&(
    <div className="conversation">
      <img className="conversationImg" src={friend.profilePicture?pf+friend.profilePicture:`${pf}profile.jpg`} alt="" />
      <span className="conversationName">{friend.name}</span>
    </div>
  )
}
