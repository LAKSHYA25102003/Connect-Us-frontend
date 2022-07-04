import "./navbar.css";
import { Search, Person, Notifications, Chat } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
        <Link to="/" style={{textDecoration:"none"}}>
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
        <img src="/assets/persons/1.jpg" alt="Person" className="navbarImg" />
      </div>
    </div>
  )
}
