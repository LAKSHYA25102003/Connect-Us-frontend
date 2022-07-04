import "./register.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";



export default function Register() {

  const navigate = useNavigate();

  useEffect(() => {

    if (localStorage.getItem("auth-token")) {
      navigate("/")
    }
  }, [])




  const [cred, setCred] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (event) => {
    setCred({ ...cred, [event.target.name]: event.target.value });
  }

  const isSame = () => {
    if (cred.password === cred.confirmPassword || cred.confirmPassword.length === 0) {
      return true;
    }
    else {
      return false;
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (isSame()) {
      const data = {
        name: cred.name,
        email: cred.email,
        password: cred.password
      }
      const url = "http://localhost:8000/api/user/auth/register"
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
      })

      response = await response.json();
      if (response.success === true) {
        navigate("/login");
      }
    }


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
            <input autoComplete="on" onChange={handleChange} value={cred.name} minLength="6" required={true} className="registerInput" type="text" placeholder="Username" name="name" />
            <input autoComplete="on" onChange={handleChange} value={cred.email} required={true} className="registerInput" type="email" placeholder="Email" name="email" />
            <input autoComplete="on" onChange={handleChange} value={cred.password} minLength="6" required={true} className="registerInput" type="password" placeholder="Password" name="password" />
            <input autoComplete="on" onChange={handleChange} value={cred.confirmPassword} minLength="6" required={true} className="registerInput" type="text" placeholder="Confirm Password" name="confirmPassword" />
            {
              !isSame() && <div style={{ textAlign: "center", color: "red" }}>
                Password and Confirm Password does not match!
              </div>
            }
            <button required={true} className="registerButton" type="Submit">Sign Up</button>
            <button required={true} className="registerLogin" onClick={() => {
              navigate("/login")
            }} type="button">Login to Your Account</button>
          </form>
        </div>
      </div>
    </div>
  )
}
