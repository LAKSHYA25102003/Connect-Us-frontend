import "./profile.css"
import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import RightBar from "../../components/rightbar/RightBar"

export default function Profile() {
    return (
        <div>
            <Navbar />
            <div className="profileContainer">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileUserCover">
                            <img className="profileUserCoverImg" src="/assets/ad.jpg" alt="" />
                            <img src="/assets/persons/1.jpg" alt="" className="profileUserImg" />
                        </div>
                        <div className="profileUserInfo">
                            <h4 className="profileUserInfoName">Jenny Jukhana </h4>
                            <span className="profileUserInfoDesc">Hii my dear friends !</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed />
                        <RightBar />
                    </div>
                </div>
            </div>
        </div>
    )
}
