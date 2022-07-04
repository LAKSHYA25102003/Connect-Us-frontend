import "./online.css"


export default function Online(props) {
    const pf=process.env.REACT_APP_PUBLLC_FOLDER;
    return (
        <li className="onlineFriend">
            <div className="onlineFriendProfileContainer">
                <img src={pf+props.user.profilePicture} alt="" className="onlineFriendProfileImg" />
                <span className='rightbarOnlineIcon'></span>
            </div>
            <span className="onlineFriendProfile">{props.user.name}</span>
        </li>
    )
}
