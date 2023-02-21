import "./login.css"
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import PostContext from "../../Context/post/PostContext";
import { CircularProgress } from "@mui/material";
import { useState } from "react";

export default function Login() {
  const [progress, setProgress] = useState(false);

  const context = useContext(PostContext);
  const { loginSuccess, loginFail, ServerError } = context;
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      navigate("/")
    }
  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    setProgress(true);
    const url = `${process.env.REACT_APP_BASE_URL}api/user/auth/login`
    const data = {
      email: email.current.value,
      password: password.current.value
    }
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(data)
    })
    response = await response.json();
    if (response.success === true) {
      localStorage.setItem("auth-token", response.token);
      navigate("/");
      loginSuccess();
      setProgress(false);
      return;
    }
    else {
      if (response.status === 500) {
        ServerError();
      }
      else {
        loginFail();
      }
      setProgress(false);
    }
  }

  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h4 className="loginLogo" >
            ConnectUs
          </h4>
          <div className="loginDesc">
            Connect with friends and the world around you on ConnectUs.
          </div>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input autoComplete="on" required={true} className="loginInput" type="email" placeholder="Email" name="email" ref={email} />
            <input autoComplete="on" minLength="6" required={true} className="loginInput" type="password" placeholder="Password" name="password" ref={password} />
            <button className="loginButton" type="Submit"> {progress ? <div style={{
              height
                : "80%", display: "flex", justifyContent: "center", alignItems: "center"
            }}><CircularProgress style={{ color: "white" }} /></div> : "Continue"}</button>
            <span className="loginForget" onClick={() => { navigate("/reset-password") }}>Forgot Password?</span>
            <button className="loginRegister" onClick={() => {
              navigate("/register")
            }} type="button" >Create a New Account</button>
          </form>
        </div>
      </div>
    </div>
  )
}
