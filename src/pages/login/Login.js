import "./login.css"
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



export default function Login() {
  const navigate=useNavigate();

  const email=useRef();
  const password=useRef();

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      navigate("/")
    }
  }, [])

  const handleClick=async (e)=>{
    e.preventDefault();

    const url="http://localhost:8000/api/user/auth/login"
    const data={
      email:email.current.value,
      password:password.current.value
    }
    let response=await fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify(data)
    })
    response=await response.json();
    if(response.success===true)
    {
      localStorage.setItem("auth-token",response.token);
      navigate("/");
      return ;
    }
    else
    {
      console.log(response);
    }
  }

  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <div className="loginLeft">
            <h4 className="loginLogo">
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
                <button className="loginButton" type="Submit">Login</button>
                <span className="loginForget" onClick={()=>{navigate("/reset-password")}}>Forgot Password?</span>
                <button className="loginRegister" onClick={()=>{
                  navigate("/register")
                }} type="button" >Create a New Account</button>
            </form>
        </div>
      </div>
    </div>
  )
}
