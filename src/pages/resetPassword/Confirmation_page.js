import "./reset.css"
import { useParams } from "react-router-dom";

export default function Confirmation_page() {
    const params=useParams();
    return(
        <div className="resetContainer">
            <div className="resetWrapper">
                <div className="resetLeft">
                    <h4 className="resetLogo">
                        ConnectUs
                    </h4>
                    <div className="resetDesc">
                        Connect with friends and the world around you on ConnectUs.
                    </div>
                </div>
                <div className="resetRight" style={{color:"rgba(0, 0, 0, 0.694)",marginLeft:"100px"}}>
                    <h3 style={{textAlign:"center"}}>Confirmation mail is sent on {params.email}  Please verify the provided email and set the new Password.</h3>
                </div>
            </div>
        </div>
    )
}
