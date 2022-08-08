import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import PostContext from "../../Context/post/PostContext";
import "./reset.css"

export default function Reset() {
    const context=useContext(PostContext);
    const {passwordChange,notFound,ServerError}=context;
    const [render,setRender]=useState(false);
    const navigate = useNavigate();;
    const [cred, setCred] = useState({ email: "", password: "", confirmPassword: "" })

    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value });
    }
    const isSame = () => {
        if (cred.password === cred.confirmPassword || cred.confirmPassword.length === 0) {
            return true;
        }
        else {
            return false;
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
    },[])


    const submitHandler = async (e) => {
        e.preventDefault();
        if (isSame()) {
            const data = {
                email: cred.email,
                password: cred.password
            }
            const url = "http://localhost:8000/api/user/reset-password";
            let response = await fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                },
                body:JSON.stringify(data)

            })
            response=await response.json();
            console.log(response);
            if(response.success===true)
            {
                console.log("Password updated successfully");
                passwordChange();
                navigate("/login");
            }
            else if(response.status===404)
            {
                notFound();
            }
            else
            {
                ServerError();
            }
        }
    }

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
                    <form className="resetBox" onSubmit={submitHandler}>
                        <input value={cred.email} autoComplete="on" required={true} className="resetInput" type="email" placeholder="Email" name="email" onChange={onChange} />
                        <input value={cred.password} autoComplete="on" minLength="6" required={true} className="resetInput" type="password" placeholder="Reset Password" name="password" onChange={onChange} />
                        <input value={cred.confirmPassword} autoComplete="on" minLength="6" required={true} className="resetInput" type="text" placeholder="Confirm Reset Password" name="confirmPassword" onChange={onChange} />
                        {
                            !isSame() && <div style={{ textAlign: "center", color: "red" }}>
                                Reset Password and Confirm Reset Password does not match!
                            </div>
                        }
                        <button required={true} className="resetButton" type="Submit">Submit</button>
                        <button required={true} className="resetButton" onClick={() => {
                            navigate("/login")
                        }} type="button">Login to Your Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
