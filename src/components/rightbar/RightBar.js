import "./RightBar.css"
import { Users } from "../../dummyData"
import Online from '../online/Online'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Add, Remove, Chat, DriveFileMove } from '@mui/icons-material'
import { getUser } from "../../redux/user";
import { useDispatch } from "react-redux";



const RightBar = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const postUser = props.postUser;
  const pf = process.env.REACT_APP_PUBLLC_FOLDER;
  const navigate = useNavigate();
  const [friendList, setFriendList] = useState([]);
  const fetchFriends = async () => {
    const url = "http://localhost:8000/api/user/friends/" + postUser._id;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
      }
    });
    response = await response.json();
    if (response.success === true) {
      setFriendList(response.friendlist);
    }
  }

  const unfollowHandler = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8000/api/user/${postUser._id}/unfollow`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'auth-token': localStorage.getItem("auth-token"),
      },
    })
    response = await response.json();
    if (response.success == true) {
      dispatch(getUser());
    }
  }

  const followHandler = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8000/api/user/${postUser._id}/follow`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'auth-token': localStorage.getItem("auth-token"),
      },
    })
    response = await response.json();
    if (response.success === true) {
      dispatch(getUser());
    }
  }

  const messageClickHandler = async (e) => {
    e.preventDefault();
    const data = {
      recieverId: `${postUser._id}`,
      senderId: `${user._id}`
    }
    const url = "http://localhost:8000/api/conversation";
    let response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'auth-token': localStorage.getItem("auth-token"),
      },
      body: JSON.stringify(data)

    })
    response = await response.json();
    if (response.success === true) {
      navigate("/messanger");
    }
  }


  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      postUser && fetchFriends();
    }
    else {
      navigate("/login");
    }
  }, [postUser, Object.keys(user).length])



  const ProfileRightBar = () => {
    return Object.keys(user).length !== 0 && (
      <div className='rightbarWrapper'>
          {(postUser._id !== user._id) &&
            (user.following.includes(postUser._id) ?
              <div className="rightbarButtons">
                <button className="rightbarFollowButton" onClick={unfollowHandler}>
                  <span className="rightbarFollowButtonText" >Unfollow</span>
                  <Remove />
                </button>
                <button className="rightbarFollowButton">
                  <span className="rightbarFollowButtonText" onClick={messageClickHandler}>Messages</span>
                  <Chat style={{marginLeft:"5px"}} />
                </button>
              </div>
              :
              <button className="rightbarFollowButton">
                <span className="rightbarFollowButtonText" onClick={followHandler}>Follow</span>
                <Add />
              </button>)
          }
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{postUser.city || "City is not added"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From(Country):</span>
            <span className="rightbarInfoValue">{postUser.from || "Country is not added"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{postUser.relationship || "Relationship information is not added"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">
          Friends
        </h4>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between"}}>
        {
          friendList.length !== 0 ? friendList.map((friend) => {
            return (
              <div key={friend._id} className="rightbarFollowings" onClick={(e) => {
                e.preventDefault();
                navigate(`/profile/${friend._id}/${friend.name}`)
              }}>
                <div className="rightbarFollowing">
                  <img className="rightbarFollowingImg" src={friend.profilePicture ? pf + friend.profilePicture : `${pf}profile.jpg`} alt="" />
                  <span className="rightbarFollowingName">{friend.name}</span>
                </div>
              </div>
            )
          }) :
            <div style={{ color: "gray", fontSize: "20px", fontWeight: "500" }}>No Friends yet!</div>
        }
        </div>
      </div>
    )
  }



  const HomeRightBar = () => {
    return (
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img className='birthdayGift' src="/assets/gift.png" alt="giftCard" />
          <span className='birthdayText'><b>Lakshya</b> and <b>other 2 friends</b> have birthday today.</span>
        </div>
        <img className='rightbarAd' src={`${pf}ad.jpg`} alt="Advertisement" />
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className="onlineFriendsList">
          {
            Users.map((u) => {
              return <Online key={u.id} user={u} />
            })
          }
        </ul>
      </div>
    )
  }

  return (
    <div className='rightbarContainer'>
      {postUser ? <ProfileRightBar /> : <HomeRightBar />}
    </div>
  )
}


export default RightBar;
