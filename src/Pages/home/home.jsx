import "./home.css"
import Profile from "../profile/profile"
import Topbar from "../../Components/topbar/topbar"
import Sidebar from "../../Components/sidebar/sidebar"
import Feed from "../../Components/feed/feed"
import Rightbar from "../../Components/rightbar/rightbar"
import { useState } from "react"


const home = () => {

  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };


  return (
    <>
    <Topbar />
    <div className="homeContainer">
      <Sidebar />
      <Feed/>
      <Rightbar/>
    </div>
  </>
  )
}

export default home
