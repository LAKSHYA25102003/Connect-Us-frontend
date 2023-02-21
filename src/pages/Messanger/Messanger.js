import "./messanger.css"
import Navbar from "../../components/Navbar/Navbar"
import Conversation from "../../components/conversations/Conversation"
import Message from "../../components/message/Message";
import Chatonline from "../../components/ChatOnline/Chatonline";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import  { getUser } from "../../redux/user";
import { useDispatch } from "react-redux/es/exports";
import { useRef } from "react"
import { io } from "socket.io-client"
import { useNavigate } from "react-router-dom";

export default function Messanger() {
    const navigate = useNavigate();
    const scrollRef = useRef();
    const dispatch = useDispatch();
    const [currChat, setCurrChat] = useState(null);
    const [messages, setMessages] = useState([])
    const [conversations, setConversations] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const currUser = useSelector((state) => state.user.user);
    const socket = useRef()
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const isMessageDeleted=()=>
    {
        getMessages();
        return ;
    }
    
    useEffect(() => {
        arrivalMessage && currChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage,currChat])

    // to send some thing to server
    useEffect(() => {
        if (Object.keys(currUser).length !== 0) {
            socket.current?.emit("addUser", currUser._id);
            socket.current?.on("getUsers", users => {
                setOnlineUsers(currUser.following.filter(f => users.some(u => f === u.userId)));
            })
        }
        // (currUser.following !== undefined) && socket.current?.on("getUsers", users => {
        //     setOnlineUsers(currUser.following.filter(f => users.some(u => f === u.userId)));
        // });
        // socket.current?.on("getUsers",users=>{
        //     console.log("hii");
        //     console.log(users);
        // })
    }, [currUser])

    useEffect(() => {
        if (!localStorage.getItem("auth-token")) {
            navigate("/login");
        }
        else {
            socket.current = io("ws://localhost:9000")
            dispatch(getUser());
            socket.current.on("getMessage", (data) => {
                setArrivalMessage({
                    sender: data.senderId,
                    text: data.text,
                    createdAt: Date.now()
                })
            })
        }
    }, [])

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

    useEffect(() => {
        currChat && getMessages();
    }, [currChat,messages.length])

    // to scroll automatically
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length])

    const recieverid = currChat?.members.find(m => m !== currUser._id);

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
            if (response.success === true) {
                setMessages((prev) => [...prev, response.message]);
                setNewMessage("");
                await socket.current.emit("sendMessage", {
                    senderId: currUser._id,
                    recieverId: recieverid,
                    text: newMessage
                })
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
                                            return (
                                                <div key={m._id} ref={scrollRef}>
                                                    <Message message={m} own={m.sender === currUser._id} isMessageDeleted={isMessageDeleted} />
                                                </div>
                                            )
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
                        <Chatonline onlineUsers={onlineUsers} currUser={currUser} setCurrChat={setCurrChat} />
                    </div>
                </div>
            </div>
        </div>
    )
}
