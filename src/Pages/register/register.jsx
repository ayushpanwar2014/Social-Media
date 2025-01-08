import apiRequest from "../../lib/apiRequest";
import "./register.css"
import { toast } from 'react-toastify'
import {Link} from "react-router-dom";
import {CircularProgress} from "@mui/material"
import { useState } from "react";


const register = () => {
    const [isFetching, SetFetching] = useState(false);

    const handleSubmit = async (e) => {
        SetFetching(true);
        e.preventDefault();
        const formData = new FormData(e.target);
    
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");
        const passwordAgain = formData.get("password-again");
    
        try {
            
            if(password === passwordAgain){

                await apiRequest.post("/auth/register", {
                    username,
                    email,
                    password,
                });

                SetFetching(false);
                toast.success("Account created ! You can login now!")

            }else{
                SetFetching(false);
                toast.error("Password is not Same coorect!!")
            }
    
        } catch (error) {
            SetFetching(false);
            toast.error("Email or Username already exist!")
            console.log(error);
        }
    
      }


  return (
    <div className="login">

        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Social Media</h3>
                <span className="loginDesc">Connect with friends and the world around you on Social Media.</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleSubmit}>
                    <input placeholder="Username"  required className="loginInput" name="username" />
                    <input placeholder="Email" required type="email" className="loginInput" name="email" />
                    <input placeholder="Password" type="password" required minLength={6} maxLength={10} className="loginInput" name="password" />
                    <input placeholder="Password Again"type="password" required minLength={6} maxLength={10} className="loginInput" name="password-again"/>
                    <button type="submit" disabled={isFetching} className="loginBottom1"> {isFetching ? <CircularProgress color="white" size="25px"/>  : "Sign Up"}</button>

                    <Link to="/login">
                    <button className="loginRegisterButton">Log Into Account</button>
                    </Link>
                </form>
            </div>
        </div>
      
    </div>
  )
}

export default register
