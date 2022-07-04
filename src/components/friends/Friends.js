import "./friends.css"


export default function Friends(props) {

    const pf=process.env.REACT_APP_PUBLLC_FOLDER;

    return (
        <li className='sidebarFriendsListItem'>
            <img src={pf+props.user.profilePicture} alt="Image" className='sidebarFriendImage' />
            <span className='sidebarFriendImageText'>{props.user.name}</span>
        </li>
    )
}
