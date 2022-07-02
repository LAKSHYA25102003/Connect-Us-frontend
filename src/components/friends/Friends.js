import "./friends.css"

export default function Friends(props) {
    return (
        <li className='sidebarFriendsListItem'>
            <img src={props.user.profilePicture} alt="Image" className='sidebarFriendImage' />
            <span className='sidebarFriendImageText'>{props.user.name}</span>
        </li>
    )
}
