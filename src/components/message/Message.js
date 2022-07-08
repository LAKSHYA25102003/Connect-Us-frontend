import "./message.css"
import { format } from "timeago.js"
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Message({ message, own }) {
  const [sender, setSender] = useState(null);

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
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <Link to={`/profile/${sender&&sender._id}/${sender&&sender.name}`}>
          <img className="messageImg" src={sender && sender.profilePicture ? pf + sender.profilePicture : `${pf}profile.jpg`} alt="" />
        </Link>
        <p className="messageTopText">{message.text}</p>
      </div>
      <div className="messageBottom">
        {format(message.createdAt)}
      </div>
    </div>
  )
}
