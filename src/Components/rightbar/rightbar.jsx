import "./rightbar.css"
import { Users } from "../../dummyData.js"
import Online from "../online/online"
import apiRequest from "../../lib/apiRequest.js"
import { AuthContext } from "../../Context/AuthContext.jsx"
import { useContext } from "react"
import { toast } from 'react-toastify'
import { Link } from "react-router-dom"

const rightbar = ({ currentUser}) => {

  const {updateUser} = useContext(AuthContext);
  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

  const handleLogOut = async () => {

    try {

      const res = await apiRequest.post("/auth/logout");
      toast.error("🥹 You are logged  out!!")
      updateUser(null);
      console.log(res.data);

    } catch (error) {

      console.log(error);
      toast.error(error)

    }

  }

  const HomeRightBar = () => {

    return (
      <>
      
        <div className="birthdayContainer">
          <img src={PF+"gift.png"} alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Pola foster</b> and <b>3 others friends</b> have a birthday today
          </span>
        </div>
        <img className="rightbarAd" src={PF+"ad2.jpg"} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">

          {Users.map(u => (

            <Online key={u.id} user={u} />
          ))}
        </ul>

      </>
    );
  };

  const ProfileRightbar = () => {
      return (
        <>
          <h4 className="rightbarTitle">User Information -:</h4>
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">City: </span>
              <span className="rightbarInfoValue">{currentUser.city}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">From: </span>
              <span className="rightbarInfoValue">{currentUser.from}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Relationship: </span>
              <span className="rightbarInfoValue">{currentUser.relationship === 1 ? "Single" : currentUser.relationship === 2 ? "Married" : "-"}</span>
            </div>
            <Link to={"/login"}>
          <button onClick={handleLogOut} className="logOut">Log Out</button>
            </Link>
          </div>


          <h4 className="rightbarTitle">User Friends -:</h4>
          <div className="rightbarFollowings">
            <div className="rightbarFollowing">
              <img src={PF+"person/1.jpeg"} alt=""  className="rightbarFollowingImg"/>
              <span className="rightbarFollowingName">John Carter</span>
            </div>
            <div className="rightbarFollowing">
              <img src={PF+"person/2.jpeg"} alt=""  className="rightbarFollowingImg"/>
              <span className="rightbarFollowingName">John Carter</span>
            </div>
            <div className="rightbarFollowing">
              <img src={PF+"person/3.jpeg"} alt=""  className="rightbarFollowingImg"/>
              <span className="rightbarFollowingName">John Carter</span>
            </div>
            <div className="rightbarFollowing">
              <img src={PF+"person/4.jpeg"} alt=""  className="rightbarFollowingImg"/>
              <span className="rightbarFollowingName">John Carter</span>
            </div>
          </div>
          
        </>

      )
  }


  return (

    <div className="rightbar">
      <div className="rightbarWrapper">
         {currentUser ? <ProfileRightbar/> :<HomeRightBar/>} 
      </div>
    </div>


  )
}

export default rightbar
