import "./login.css"

export default function Login() {
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
            <div className="loginBox">
                <input className="loginInput" type="email" placeholder="Email" name="email" />
                <input className="loginInput" type="text" placeholder="Password" name="password" />
                <button className="loginButton">Login</button>
                <span className="loginForget">Forgot Password?</span>
                <button className="loginRegister">Create a New Account</button>
            </div>
        </div>
      </div>
    </div>
  )
}
