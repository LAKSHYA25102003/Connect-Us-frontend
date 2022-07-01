import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import RightBar from "../../components/rightbar/RightBar"

import React from 'react'
import "./home.css"

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className="homeContainer">
        <Sidebar/>
        <Feed/>
        <RightBar/>
      </div>
    </div>
  )
}
