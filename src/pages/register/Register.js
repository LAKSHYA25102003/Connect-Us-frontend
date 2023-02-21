import "./register.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import PostContext from "../../Context/post/PostContext";
import { CircularProgress } from "@mui/material";


export default function Register() {
  const context = useContext(PostContext);
  const { notify } = context;
  const [progress, setProgress] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      navigate("/")
    }
  }, []);


  // const isSame = () => {
  //   if (cred.password === cred.confirmPassword || cred.confirmPassword.length === 0) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  const handleClick = async (e) => {
    e.preventDefault();
    setProgress(true);
    const data = {
      name: name,
      email: email,
    }
    const url = `${process.env.REACT_APP_BASE_URL}api/auth-mail/createUser`
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(data)
    })
    response = await response.json();
    if(response.success)
    {
      navigate(`/Confirmation_page/${email}`)
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
            <input autoComplete="on" onChange={(e) => { setName(e.target.value) }} value={name} minLength="6" required={true} className="registerInput" type="text" placeholder="Username" name="name" />
            <input autoComplete="on" onChange={(e) => { setEmail(e.target.value) }} value={email} required={true} className="registerInput" type="email" placeholder="Email" name="email" />
            {/* <input autoComplete="on" onChange={handleChange} value={cred.password} minLength="6" required={true} className="registerInput" type="password" placeholder="Password" name="password" />
            <input autoComplete="on" onChange={handleChange} value={cred.confirmPassword} minLength="6" required={true} className="registerInput" type="text" placeholder="Confirm Password" name="confirmPassword" /> */}
            {/* {
              !isSame() && <div style={{ textAlign: "center", color: "red" }}>
                Password and Confirm Password does not match!
              </div>
            } */}
            <button required={true} className="registerButton" type="Submit"> {progress ? <div style={{
              height
                : "80%", display: "flex", justifyContent: "center", alignItems: "center"
            }}><CircularProgress style={{ color: "white" }} /></div> : "Continue"} </button>
            <button required={true} className="registerLogin" onClick={() => {
              navigate("/login")
            }} type="button">Login to Your Account</button>
          </form>
        </div>
      </div>
    </div>
  )
}
