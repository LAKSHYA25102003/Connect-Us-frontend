import "./setPassword.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import PostContext from "../../Context/post/PostContext";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

export default function SetPassword() {
  const context = useContext(PostContext);
  const { notify } = context;
  const [progress, setProgress] = useState(false);
const [pass,setPass]= useState("");
const [confirmPassword,setConfirmPassword] = useState("");
const token=useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      navigate("/")
    }
  }, []);


  const isSame = () => {
    if (pass === confirmPassword || confirmPassword.length === 0) {
      return true;
    }
    else {
      return false;
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if(isSame()===false)
    {
        return ;
    }
    setProgress(true);
    const data={
        password:pass
    }
    const url=`${process.env.REACT_APP_BASE_URL}api/auth-mail/acceptUser/${token.token}`;
    let response = await fetch(url,{
        method:"post",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data)
    })
    response = await response.json();
    if(response.success)
    {
        notify("success",response.message);
        navigate("/login");
    }
    else
    {
        notify("error",response.message);
    }
    setProgress(false);
  }


  return (
    <div className="registerContainer">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h4 className="registerLogo">
            ConnectUs
          </h4>
          <div className="registerDesc">
            Connect with friends and the world around you on ConnectUs.
          </div>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            {/* <input autoComplete="on" onChange={(e) => { setName(e.target.value) }} value={name} minLength="6" required={true} className="registerInput" type="text" placeholder="Username" name="name" />
            <input autoComplete="on" onChange={(e) => { setEmail(e.target.value) }} value={email} required={true} className="registerInput" type="email" placeholder="Email" name="email" /> */}
            <input autoComplete="on" onChange={(e)=>{setPass(e.target.value)}} value={pass} minLength="6" required={true} className="registerInput" type="password" placeholder="Password" name="password" />
            <input autoComplete="on" onChange={(e)=>{setConfirmPassword(e.target.value)}} value={confirmPassword} minLength="6" required={true} className="registerInput" type="text" placeholder="Confirm Password" name="confirmPassword" />
            {
              !isSame() && <div style={{ textAlign: "center", color: "red" }}>
                Password and Confirm Password does not match!
              </div>
            }
            <button required={true} className="registerButton" type="Submit"> {progress ? <div style={{
              height
                : "80%", display: "flex", justifyContent: "center", alignItems: "center"
            }}><CircularProgress style={{ color: "white" }} /></div> : "Continue"} </button>
          </form>
        </div>
      </div>
    </div>
  )
}
