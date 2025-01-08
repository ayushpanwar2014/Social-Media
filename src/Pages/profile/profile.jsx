import "./profile.css"
import Topbar from "./../../Components/topbar/topbar"
import Sidebar from "./../../Components/sidebar/sidebar"
import Feed from "./../../Components/feed/feed"
import Rightbar from "./../../Components/rightbar/rightbar"
import { useContext} from "react"
import { AuthContext } from "../../Context/AuthContext"

const profile = () => {

  const {currentUser} = useContext(AuthContext)
  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

  return (
    <>
    <Topbar/>
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
              <img className="profileCoverImg" src={currentUser.coverPicture ? PF + currentUser.coverPicture : PF + "nocover.avif"} alt="" />
              <img className="profileUserImg" src={currentUser.profilePicture ? PF + currentUser.profilePicture : PF + "unknown.jpg"} alt="" />
              </div>
            </div>

            <div className="profileInfo">
              <h4 className="profileInfoName">{currentUser.username}</h4>
              <span className="profileInfoDesc">{currentUser.desc}</span>
            </div>

            <div className="profileRightBottom">
            <Feed />
            <Rightbar currentUser={currentUser}/>
            </div>
       
        </div>
      </div>
    </>
  )
}

export default profile
