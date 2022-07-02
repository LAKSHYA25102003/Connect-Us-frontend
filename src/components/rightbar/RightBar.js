import React from 'react'
import "./RightBar.css"

export default function RightBar() {
  return (
    <div className='rightbarContainer'>
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img className='birthdayGift' src="/assets/gift.png" alt="giftCard" />
          <span className='birthdayText'><b>Lakshya</b> and other 2 friends have birthday today.</span>
        </div>
        <img className='rightbarAd' src="/assets/ad.jpg" alt="Advertisement" />
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className="onlineFriendsList">
          <li className="onlineFriend">
            <div className="onlineFriendProfileContainer">
              <img src="/assets/persons/1.jpg" alt="" className="onlineFriendProfileImg" />
              <span className='rightbarOnlineIcon'></span>
            </div>
            <span className="onlineFriendProfile">Jenny</span>
          </li>
          <li className="onlineFriend">
            <div className="onlineFriendProfileContainer">
              <img src="/assets/persons/1.jpg" alt="" className="onlineFriendProfileImg" />
              <span className='rightbarOnlineIcon'></span>
            </div>
            <span className="onlineFriendProfile">Jenny</span>
          </li>
          <li className="onlineFriend">
            <div className="onlineFriendProfileContainer">
              <img src="/assets/persons/1.jpg" alt="" className="onlineFriendProfileImg" />
              <span className='rightbarOnlineIcon'></span>
            </div>
            <span className="onlineFriendProfile">Jenny</span>
          </li>
          <li className="onlineFriend">
            <div className="onlineFriendProfileContainer">
              <img src="/assets/persons/1.jpg" alt="" className="onlineFriendProfileImg" />
              <span className='rightbarOnlineIcon'></span>
            </div>
            <span className="onlineFriendProfile">Jenny</span>
          </li>
          <li className="onlineFriend">
            <div className="onlineFriendProfileContainer">
              <img src="/assets/persons/1.jpg" alt="" className="onlineFriendProfileImg" />
              <span className='rightbarOnlineIcon'></span>
            </div>
            <span className="onlineFriendProfile">Jenny</span>
          </li>
          <li className="onlineFriend">
            <div className="onlineFriendProfileContainer">
              <img src="/assets/persons/1.jpg" alt="" className="onlineFriendProfileImg" />
              <span className='rightbarOnlineIcon'></span>
            </div>
            <span className="onlineFriendProfile">Jenny</span>
          </li>
          <li className="onlineFriend">
            <div className="onlineFriendProfileContainer">
              <img src="/assets/persons/1.jpg" alt="" className="onlineFriendProfileImg" />
              <span className='rightbarOnlineIcon'></span>
            </div>
            <span className="onlineFriendProfile">Jenny</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
