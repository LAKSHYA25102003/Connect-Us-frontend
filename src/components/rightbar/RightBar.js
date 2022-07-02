import React from 'react'
import "./RightBar.css"
import {Users} from "../../dummyData"
import Online from '../online/Online'


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
          {
            Users.map((u)=>{
              return <Online key={u.id} user={u}/>
            })
          }
        </ul>
      </div>
    </div>
  )
}
