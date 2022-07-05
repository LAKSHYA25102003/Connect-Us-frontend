import "./navbar.css";
import { Search, Person, Notifications, Chat } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/user"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
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
        <Link to={`/profile/${user._id}/${user.name}`}>
          <img src={user.profilePicture?pf+user.profilePicture:`${pf}profile.jpg`} alt="Person" className="navbarImg" />
        </Link>
      </div>
    </div>
  )
}
