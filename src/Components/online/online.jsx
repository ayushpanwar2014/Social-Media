import "./online.css"

const online = ({user}) => {
  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

  return (
    <li className="rightbarFriend">
              <div className="rightbarProfileImgContainer">
                <img src={ user.profilePicture} alt="" className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
              </div>
              <span className="rightbarUsername">{user.username}</span>
            </li>
  )
}

export default online
