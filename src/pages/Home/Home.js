import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import RightBar from "../../components/rightbar/RightBar"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"
import "./home.css"

export default function Home() {
  const navigate=useNavigate();
  
  useEffect(()=>{
    if(!localStorage.getItem("auth-token"))
    {
        navigate("/login");
    }
  },[])

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
