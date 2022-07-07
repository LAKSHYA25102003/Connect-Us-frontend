import "./conversation.css"

export default function Conversation() {
    const pf=process.env.REACT_APP_PUBLLC_FOLDER;
  return (
    <div className="conversation">
      <img className="conversationImg" src={`${pf}profile.jpg`} alt="" />
      <span className="conversationName">Lakshya</span>
    </div>
  )
}
