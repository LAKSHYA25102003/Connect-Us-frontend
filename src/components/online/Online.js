import "./online.css"

export default function Online(props) {
    return (
        <li className="onlineFriend">
            <div className="onlineFriendProfileContainer">
                <img src={props.user.profilePicture} alt="" className="onlineFriendProfileImg" />
                <span className='rightbarOnlineIcon'></span>
            </div>
            <span className="onlineFriendProfile">{props.user.name}</span>
        </li>
    )
}
