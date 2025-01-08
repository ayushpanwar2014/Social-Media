import "./login.css"
import Register  from "../register/register";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../Context/AuthContext";
import { useContext, useState } from "react";
import { toast } from 'react-toastify'
import { Link } from "react-router-dom";
import {CircularProgress} from "@mui/material"

const login = () => {


    const [click, setClick] = useState(true);
    const [isFetching, SetFetching] = useState(false);
    const handleClick  = () => {
      setClick((prev) => !prev);
    };


    const { updateUser } = useContext(AuthContext)
    const handleSubmit = async (e) => {
        SetFetching(true);
        e.preventDefault();
        const formData = new FormData(e.target);
    
        const email = formData.get("email");
        const password = formData.get("password");
    
        try {
    
          const res = await apiRequest.post("/auth/login", {
            email,
            password,
          });

          toast.success("Whoops! Logged In")
          SetFetching(false);
          updateUser(res.data);
    
        } catch (error) {
          SetFetching(false);
          toast.error("Invalid Credentials!!")
          console.log(error);
        }
      }

  return (

    <>
    {
        click ? (

          <div className="login">

        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Social Media</h3>
                <span className="loginDesc">Connect with friends and the world around you on Social Media.</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleSubmit}>
                    <input type="email" required placeholder="Email" className="loginInput" name="email"/>
                    <input type="password" required minLength={6} placeholder="Password" className="loginInput" name="password"/>
                    <button type="submit"  className="loginBottom">{isFetching ?  <CircularProgress color="white" size="25px"/>: "Log In"}</button>
                    <span className="loginForgot">Forgot Password</span>
                    <Link to="/register">
                    <button  className="loginRegisterButton">Create New Account</button>
                    </Link>
                </form>
            </div>
        </div>
      
    </div>
      ) : (
        <Register handleClick={handleClick} />
      )
    }
    </>
  )
}

export default login
