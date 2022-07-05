import "./RightBar.css"
import { Users } from "../../dummyData"
import Online from '../online/Online'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { getUser } from "../../redux/user";
import { useEffect } from "react";


export default function RightBar(props) {

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

  const ProfileRightBar = () => {

    return (
      <div className='rightbarWrapper'>
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{props.profileUser.city||"Mention Your City"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From(Country):</span>
            <span className="rightbarInfoValue">{props.profileUser.from||"Mention Your Country"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{props.profileUser.relationship||"Mention About Your RelationShip"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">
          Friends
        </h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img className="rightbarFollowingImg" src={`${pf}1.jpg`} alt="" />
            <span className="rightbarFollowingName">Jenny</span>
          </div>
          <div className="rightbarFollowing">
            <img className="rightbarFollowingImg" src={`${pf}1.jpg`} alt="" />
            <span className="rightbarFollowingName">Jenny</span>
          </div>
          <div className="rightbarFollowing">
            <img className="rightbarFollowingImg" src={`${pf}1.jpg`} alt="" />
            <span className="rightbarFollowingName">Jenny</span>
          </div>
          <div className="rightbarFollowing">
            <img className="rightbarFollowingImg" src={`${pf}1.jpg`} alt="" />
            <span className="rightbarFollowingName">Jenny</span>
          </div>
          <div className="rightbarFollowing">
            <img className="rightbarFollowingImg" src={`${pf}1.jpg`} alt="" />
            <span className="rightbarFollowingName">Jenny</span>
          </div>
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
      {props.profileUser ? <ProfileRightBar /> : <HomeRightBar />}
    </div>
  )
}
