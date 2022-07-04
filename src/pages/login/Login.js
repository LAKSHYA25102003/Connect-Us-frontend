import "./login.css"
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/user";

export default function Login() {
  const dispatch=useDispatch();

  const email=useRef();
  const password=useRef();

  const handleClick=async (e)=>{
    e.preventDefault();

    const url="http://localhost:8000/api/auth/login"
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
                <input required={true} className="loginInput" type="email" placeholder="Email" name="email" ref={email} />
                <input minLength="6" required={true} className="loginInput" type="password" placeholder="Password" name="password" ref={password} />
                <button className="loginButton">Login</button>
                <span className="loginForget">Forgot Password?</span>
                <button className="loginRegister">Create a New Account</button>
            </form>
        </div>
      </div>
    </div>
  )
}
