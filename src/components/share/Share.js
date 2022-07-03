import "./share.css"
import {PermMedia,Label,Room,EmojiEmotions} from "@mui/icons-material"

export default function Share() {
    return (
        <div className="shareContainer">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src="/assets/persons/1.jpg" alt="Image" className="shareImageIcon" />
                    <input placeholder="What are you thinking?" className="shareInput"/>
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMedia htmlColor="orange" className="shareOptionIcon"/>
                            <span className="shareOptionText">Photo or Video</span>
                        </div>
                        <div  className="shareOption">
                            <Label htmlColor="blue" className="shareOptionIcon"/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div  className="shareOption">
                            <Room htmlColor="green" className="shareOptionIcon"/>
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div  className="shareOption">
                            <EmojiEmotions htmlColor="#FF33BB" className="shareOptionIcon"/>
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton">Share</button>
                </div>
            </div>
        </div>
    )
}
