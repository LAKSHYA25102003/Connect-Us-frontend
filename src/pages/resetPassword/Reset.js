import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import PostContext from "../../Context/post/PostContext";
import "./reset.css"
import { useParams } from "react-router-dom";

export default function Reset() {
    const context=useContext(PostContext);
    const {passwordChange,notFound,ServerError,notify}=context;
    const [render,setRender]=useState(false);
    const navigate = useNavigate();
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword] =useState("");
    const [expired,setExpired]=useState(true);
    const params=useParams();

    
    const isSame = () => {
        if (password === confirmPassword || confirmPassword.length === 0) {
            return true;
        }
        else {
            return false;
        }
    }

    const confirmLink=async ()=>{
        const url=`${process.env.REACT_APP_BASE_URL}api/auth-mail/check-link/${params.token}`
        let response = await fetch(url,{
            method:"post",
        })
        response = await response.json();
        console.log(response);
        if(response.success)
        {
            setExpired(false);
        }
        else
        {
            return ;
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("auth-token"))
        {
            navigate(-1);
        }
        else
        {
            setRender(true);
        }
        confirmLink();
    },[])


    const submitPassword=async (e)=>{
        e.preventDefault();
        const url=`${process.env.REACT_APP_BASE_URL}api/auth-mail/set-new-password/${params.token}`;
        if(!isSame)
        {
            return ;
        }
        const data={
            password:password
        }
        let response=await fetch(url,{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data),
        })
        response = await response.json();
        if(response.success)
        {
            notify("success","Password changed successfully");
            navigate("/login");
        }
        else
        {
            notify("error",response.message);
        }
    }

    if(expired===false){
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
                    <form className="resetBox" onSubmit={submitPassword}>
                        <input value={password} autoComplete="on" minLength="6" required={true} className="resetInput" type="password" placeholder="Reset Password" name="password" onChange={(e)=>{setPassword(e.target.value)}} />
                        <input value={confirmPassword} autoComplete="on" minLength="6" required={true} className="resetInput" type="text" placeholder="Confirm Reset Password" name="confirmPassword" onChange={(e)=>{setConfirmPassword(e.target.value)}} />
                        {
                            !isSame() && <div style={{ textAlign: "center", color: "red" }}>
                                Reset Password and Confirm Reset Password does not match!
                            </div>
                        }
                        <button required={true} className="resetButton" type="Submit">Continue</button>
                        
                    </form>
                </div>
            </div>
        </div>
    )

                    }
                    else
                    {
                        return <h1 style={{textAlign:"center"}}>Link has been used already.</h1>
                    }
}
