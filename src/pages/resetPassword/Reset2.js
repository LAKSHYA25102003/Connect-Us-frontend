import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import PostContext from "../../Context/post/PostContext";
import "./reset.css"
import { CircularProgress } from "@mui/material";

export default function Reset2() {
    const context=useContext(PostContext);
    const {passwordChange,notFound,ServerError,notify}=context;
    const [render,setRender]=useState(false);
    const [progress,setProgress] = useState(false);
    const navigate = useNavigate();
    const [email,setEmail]=useState("");
   
    

    useEffect(()=>{
        if(localStorage.getItem("auth-token"))
        {
            navigate(-1);
        }
        else
        {
            setRender(true);
        }
    },[])

    const sendMail=async (e)=>{
        e.preventDefault();
        setProgress(true);
        const data={
            email:email
        }
        const url=`http://localhost:8000/api/auth-mail/password-generate-link`
        let response=await fetch(url,{
            method:"post",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data)
        })
        response=await response.json();
        if(response.success)
        {
            setProgress(false);
            navigate(`/Confirmation_page/${email}`);
        }
        else
        {
            notify("error",response.message);
            setProgress(false);
        }
    }


    

    return render&&(
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
                <div className="resetRight">
                    <form className="resetBox" onSubmit={sendMail}>
                        <input value={email} autoComplete="on" required={true} className="resetInput" type="email" placeholder="Email" name="email" onChange={(e)=>{setEmail(e.target.value)}} />
                        <button required={true} className="resetButton" type="Submit">{progress?<div style={{height
                        :"80%",display:"flex",justifyContent:"center",alignItems:"center"}}><CircularProgress style={{color:"white"}} /></div>:"Continue"}</button>
                        <button required={true} className="resetButton" onClick={() => {
                            navigate("/login")
                        }} type="button">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
