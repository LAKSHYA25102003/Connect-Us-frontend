import "./message.css"
import { format } from "timeago.js"
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MoreVert, NavigateNextTwoTone } from "@mui/icons-material"

export default function Message({ message, own,isMessageDeleted }) {
  const [sender, setSender] = useState(null);
  const [showDelete,setshowDelete]=useState(false);
  useEffect(() => {
    const getUser = async () => {
      const url = `http://localhost:8000/api/user/get-user-by-id/${message.sender}`
      let response = await fetch(url, {
        method: "GET"
      })
      response = await response.json();
      if (response.success === true) {
        setSender(response.user);
      }
    }

    getUser();
  }, [message._id])

  const pf = process.env.REACT_APP_PUBLLC_FOLDER;

  const deleteMessage=async ()=>{
    const url=`http://localhost:8000/api/message/delete/message/${message._id}`
    let response=await fetch(url,{
      method:"DELETE",
      headers: {
        'Content-Type': "application/json",
        'auth-token': localStorage.getItem("auth-token"),
      },
    })
    response = await response.json();
    if (response.success === true) {
      console.log(response);
      isMessageDeleted();
    }
  }

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop" style={{display:"flex",cursor:"pointer",alignItems:"center"}}>
        <Link to={`/profile/${sender&&sender._id}/${sender&&sender.name}`}>
          <img className="messageImg" src={sender && sender.profilePicture ? pf + sender.profilePicture : `${pf}profile.jpg`} alt="" />
        </Link>
        <p className="messageTopText" >{message.text}</p>
        <MoreVert style={{fontSize:"15px"}} onClick={()=>{setshowDelete(!showDelete)}}/>
        {
          showDelete&&<button style={{display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"white",color:"black",borderRadius:"5px",outline:"none",cursor:"pointer"}} onClick={()=>{deleteMessage()}}>Delete</button>
        }
      </div>
      <div className="messageBottom">
        {format(message.createdAt)}
      </div>
    </div>
  )
}
