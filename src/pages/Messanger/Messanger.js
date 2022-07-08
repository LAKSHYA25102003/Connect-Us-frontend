import "./messanger.css"
import Navbar from "../../components/Navbar/Navbar"
import Conversation from "../../components/conversations/Conversation"
import Message from "../../components/message/Message";
import Chatonline from "../../components/ChatOnline/Chatonline";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { getUser } from "../../redux/user";
import { useDispatch } from "react-redux/es/exports";


export default function Messanger() {

    const dispatch = useDispatch();
    const [currChat, setCurrChat] = useState(null);
    const [messages, setMessages] = useState([])
    const [conversations, setConversations] = useState(null);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        dispatch(getUser());
    }, [])
    const currUser = useSelector((state) => state.user.user);

    useEffect(() => {
        const getConversation = async () => {
            const url = `http://localhost:8000/api/conversation/${currUser._id}`
            let response = await fetch(url, {
                method: "GET"
            })
            response = await response.json();
            if (response.success === true) {
                setConversations(response.conversations);
            }
        }

        getConversation();
    }, [currUser])

    useEffect(() => {
        const getMessages = async () => {
            const url = `http://localhost:8000/api/message/${currChat._id}`
            let response = await fetch(url, {
                method: "GET"
            })
            response = await response.json();
            if (response.success === true) {
                setMessages(response.messages);

            }
        }
        currChat && getMessages();
    }, [currChat])


    const handleSend = async (e) => {
        e.preventDefault();
        if (newMessage !== "") {
            const message = {
                text: newMessage,
                sender: currUser._id.toString(),
                conversationId: currChat._id.toString()
            }
            const url = "http://localhost:8000/api/message";
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(message)
            })
            response = await response.json();
            if (response.success == true) {
                messages.push(response.message);
                setNewMessage("");
            }
        }
    }
    return conversations && (
        <div>
            <Navbar />
            <div className="messangerContainer">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        {
                            conversations.map((c) => {
                                return (
                                    <div key={c._id} onClick={() => { setCurrChat(c) }}>
                                        <Conversation conversation={c} currUser={currUser} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="chatBox">
                    {
                        currChat ?
                            <div className="chatBoxWrapper">
                                <div className="chatBoxTop">
                                    {
                                        messages ? messages.map((m) => {
                                            return (<Message key={m._id} message={m} own={m.sender === currUser._id} />)
                                        }) :
                                            <div className="noConversation">Loading..</div>
                                    }
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea value={newMessage} onChange={(e) => { setNewMessage(e.target.value) }} className="chatMessageInput" placeholder="Write something...">

                                    </textarea>
                                    <button className="chatSubmitButton" onClick={handleSend}>
                                        Send
                                    </button>
                                </div>
                            </div> :
                            <span className="noConversation">Start conversation with your friends...</span>
                    }
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <Chatonline />
                    </div>
                </div>
            </div>
        </div>
    )
}
