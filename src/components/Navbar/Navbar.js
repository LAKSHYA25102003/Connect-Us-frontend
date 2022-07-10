import "./navbar.css";
import { Search, Person, Notifications, Chat,Cancel } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getUser } from "../../redux/user"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  const [modal, setModal] = useState(false);
  const pf = process.env.REACT_APP_PUBLLC_FOLDER;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchcred, setSearchcred] = useState("");
  const user = useSelector(state => state.user.user);
  const [searchResult, setSearchResult] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      dispatch(getUser());
    }
    else {
      navigate("/login");
    }
  }, [])

  const logOutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth-token");
    navigate("/login");
  }

  const onchange = (e) => {
    setSearchcred(e.target.value);
  }

  const searchHandler = async (e) => {
    e.preventDefault();
    if (searchcred !== "") {
      const url = `http://localhost:8000/api/user/search-user/${searchcred}`;
      let response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': "application/json",
          'auth-token': localStorage.getItem("auth-token"),
        },
      })
      response = await response.json();
      if (response.success === true) {
        setShowSearch(true);
        setSearchResult(response.users);
      }
    }
  }


  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">ConnectUs</span>
        </Link>
      </div>
      <div className="navbarMid">
        <div className="searchbar">
          <Search className="searchIcon" onClick={searchHandler} />
          <input placeholder="Search friends, posts, video..." className="searchInput" value={searchcred} onChange={onchange} />
        </div>
        {
          showSearch &&
          <div className='search-results'>
            <div className='search-result'>
              {
                (searchResult.length > 0) ?
                  searchResult.map((s) => {
                    return (
                      <Link key={s._id} className="searchUserInfo" to={`/profile/${s._id}/${s.name}`}>
                        <img className="searchUserImage" src={s.profilePicture?pf+s.profilePicture:`${pf}profile.jpg`} alt="Img" />
                        <span>
                          {s.name}
                        </span>
                      </Link>
                    )
                  })
                  :
                  <div className="searchUserInfo" >
                    <span>
                      No User Found!
                    </span>
                  </div>
              }
              <div className="cancelIcon" onClick={()=>{setShowSearch(false);setSearchcred("")}}>
                <Cancel/>
              </div>
            </div>
          </div>
        }
      </div>
      <div className="navbarRight">
        <div className="navbarLinks">
          <span className="navbarLink" onClick={(e) => { e.preventDefault(); navigate("/"); }}>HomePage</span>
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

        <img onClick={() => { setModal(!modal) }} src={user.profilePicture ? pf + user.profilePicture : `${pf}profile.jpg`} alt="Person" className="navbarImg" />

        <div className="navbarModalContainer">
          {
            modal && <div className="navbarModal">
              <Link style={{ textDecoration: "none" }} className="navbarModalItem" to={`/profile/${user._id}/${user.name}`}>
                Go to Profile
              </Link>
              <Link className="navbarModalItem" style={{ textDecoration: "none" }} to={`/${user._id}/${user.name}/update-profile`}>
                Update Profile
              </Link>
              <div className="navbarModalItem" onClick={logOutHandler}>
                Log Out
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
