import "./message.css"

export default function Message({own}) {
    const pf=process.env.REACT_APP_PUBLLC_FOLDER;
  return (
    <div className={own?"message own":"message"}>
      <div className="messageTop">
        <img className="messageImg" src={`${pf}profile.jpg`} alt="" />
        <p className="messageTopText">Hello this is message Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse ipsum mollitia architecto quia perspiciatis. Corporis hic officiis tenetur tempora nihil, obcaecati ex! A, placeat obcaecati itaque et nemo rem eligendi repellendus.</p>
      </div>
      <div className="messageBottom">
        5 Min ago
      </div>
    </div>
  )
}
