import "./messanger.css"
import Navbar from "../../components/Navbar/Navbar"
import Conversation from "../../components/conversations/Conversation"
import Message from "../../components/message/Message"

export default function messanger() {
    return (
        <div>
            <Navbar />
            <div className="messangerContainer">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message own ={true} />
                            <Message />
                        </div>
                        <div className="chatBoxBottom">

                        </div>
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        online
                    </div>
                </div>
            </div>
        </div>
    )
}
