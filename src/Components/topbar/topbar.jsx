import "./topbar.css"
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {AuthContext} from "../../Context/AuthContext"
import { useContext } from "react";
import { Link } from "react-router-dom";

const topbar = () => {

  const { currentUser} = useContext(AuthContext);
  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

  return (
    <div className="topbarContainer">

      <div className="topbarLeft">
        <Link to="/" style={{textDecoration: "none"}}>
        <span className="logo">Social-Media</span>
        </Link>
      </div>

      <div className="topbarCenter">

        <div className="searchBar">
          <SearchIcon className="searchIcon"/>
          <input placeholder="Search for friends, post or videos" className="searchInput" />
        </div>

      </div>

      <div className="topbarRight">

        <div className="topbarLinks">
          <Link to="/profile" style={{textDecoration: "none"}}>
          <div style={{color: "white"}}  className="topbarLink">Homepage</div>
          </Link>
          <Link to="/" style={{textDecoration: "none"}}>
          <div style={{color: "white"}}  className="topbarLink">Timeline</div>
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <ChatIcon />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to="/profile">
        <img className="topbarImg" src={PF + currentUser.profilePicture || PF + "unknown.jpg"} alt="" />
        </Link>
      </div>

    </div>
  )
}

export default topbar
