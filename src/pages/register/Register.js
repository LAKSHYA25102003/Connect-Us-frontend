import "./register.css"

export default function Register() {
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
            <div className="registerBox">
                <input className="registerInput" type="text" placeholder="Username" name="name" />
                <input className="registerInput" type="email" placeholder="Email" name="email" />
                <input className="registerInput" type="text" placeholder="Password" name="password" />
                <input className="registerInput" type="text" placeholder="Confirm Password" name="password" />
                <button className="registerButton">Sign Up</button>
                <button className="registerLogin">Login to Your Account</button>
            </div>
        </div>
      </div>
    </div>
  )
}
