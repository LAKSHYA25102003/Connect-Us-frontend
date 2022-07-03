import "./register.css"

export default function Register() {
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
                <input className="loginInput" type="text" placeholder="Username" name="name" />
                <input className="loginInput" type="email" placeholder="Email" name="email" />
                <input className="loginInput" type="text" placeholder="Password" name="password" />
                <input className="loginInput" type="text" placeholder="Confirm Password" name="password" />
                <button className="loginButton">Sign Up</button>
                <button className="loginRegister">Login to Your Account</button>
            </div>
        </div>
      </div>
    </div>
  )
}
