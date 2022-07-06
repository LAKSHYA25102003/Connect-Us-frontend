import "./navbar.css";
import { Search, Person, Notifications, Chat } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getUser } from "../../redux/user"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [modal,setModal]=useState(false);
  const pf=process.env.REACT_APP_PUBLLC_FOLDER;
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

  const logOutHandler=(e)=>{
    e.preventDefault();
    localStorage.removeItem("auth-token");
    navigate("/login");
  }

  const user = useSelector(state => state.user.user);


  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">ConnectUs</span>
        </Link>
      </div>
      <div className="navbarMid">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="Search friends, posts, video..." className="searchInput" />
        </div>
      </div>
      <div className="navbarRight">
        <div className="navbarLinks">
          <span className="navbarLink">HomePage</span>
          <span className="navbarLink">TimeLine</span>
        </div>
        <div className="navbarIcons">
          <div className="navbarIconsItem">
            <Person />
            <span className="navbarIconsBedge">1</span>
          </div>
          <div className="navbarIconsItem">
            <Chat />
            <span className="navbarIconsBedge">1</span>
          </div>
          <div className="navbarIconsItem">
            <Notifications />
            <span className="navbarIconsBedge">1</span>
          </div>
        </div>
        
          <img onClick={()=>{setModal(!modal)}} src={user.profilePicture?pf+user.profilePicture:`${pf}profile.jpg`} alt="Person" className="navbarImg" />
  
        {
          modal&&<div className="navbarModal">
            <Link style={{textDecoration:"none"}} className="navbarModalItem" to={`/profile/${user._id}/${user.name}`}>
              Go to Profile
            </Link>
            <Link className="navbarModalItem" style={{textDecoration:"none"}}  to={`/${user._id}/${user.name}/update-profile`}>
              Update Profile
            </Link>
            <div className="navbarModalItem" onClick={logOutHandler}>
              Log Out
            </div>
          </div>
        }
      </div>
    </div>
  )
}
