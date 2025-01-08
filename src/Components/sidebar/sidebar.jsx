import "./sidebar.css"
import FeedIcon from '@mui/icons-material/Feed';
import ChatIcon from '@mui/icons-material/Chat';
import DuoIcon from '@mui/icons-material/Duo';
import GroupsIcon from '@mui/icons-material/Groups';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkIcon from '@mui/icons-material/Work';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SchoolIcon from '@mui/icons-material/School';
import {Users} from "../../dummyData.js"
import CloseFriends from "../closeFriends/closeFriends.jsx";

const sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
              <FeedIcon className="sidebarIcon"/>
              <span className="sidebarListItemText">Feeds</span>
          </li>
          <li className="sidebarListItem">
              <ChatIcon className="sidebarIcon"/>
              <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
              <DuoIcon className="sidebarIcon"/>
              <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
              <GroupsIcon className="sidebarIcon"/>
              <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
              <BookmarksIcon className="sidebarIcon"/>
              <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
              <HelpOutlineIcon className="sidebarIcon"/>
              <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
              <WorkIcon className="sidebarIcon"/>
              <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
              <EventNoteIcon className="sidebarIcon"/>
              <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
              <SchoolIcon className="sidebarIcon"/>
              <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr"/>
        <ul className="sidebarFriendList">
          {Users.map(u => (
            <CloseFriends key={u.id} user={u}/>
          ))
          }
           
        </ul>
      </div>
    </div>
  )
}

export default sidebar
