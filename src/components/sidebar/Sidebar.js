import React from 'react'
import "./sidebar.css"
import Friends from '../friends/Friends'
import {Users} from "../../dummyData";
import { useNavigate } from 'react-router-dom';
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School
} from '@mui/icons-material'


export default function Sidebar() {
  const navigate=useNavigate();
  const chatClickHandler=(e)=>{
    e.preventDefault();
    navigate("/messanger");
  }
 
  return (
    <div className='sideBarContainer'>
      <div className="sidebarWrapper">
        <ul className='sidebarList'>
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem" onClick={chatClickHandler} >
            <Chat className="sidebarIcon"  />
            <span className="sidebarListItemText">Chats</span>
          </li>
          {/* <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon"  />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li> */}
        </ul>
        <button className="sidebarButton">
          Show More
        </button>
        <hr className='sidebarHr' />
        <ul className='sidebarFriendsList'>
          {
            Users.map((u)=>{
              return <Friends key={u.id} user={u}/>
            })
          }
        </ul>
      </div>
    </div>
  )
}
