import { MoreVert } from "@mui/icons-material";
import "./post.css"
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import {format} from "timeago.js"
import {AuthContext} from "../../Context/AuthContext"

export default function post ({post}){

  const {currentUser} = useContext(AuthContext);
  const [like,setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false)
  const [user, setUser] = useState({})
  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  const likeHandler = () => {

    try {

      apiRequest.put("/post/"+ post._id + "/like", {
        userId: currentUser._id
      });

      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
      
    } catch (error) {

      console.log(error)
      
    }
  }

  useEffect(() => {

    const fetchUser = async () => {
      const res = await apiRequest.get(`/users?userId=${post.userId}`)
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  return (

        <div className="post">
          <div className="postWrapper">

            <div className="postTop">
              <div className="postTopLeft">
              <Link to={`/profile`}>
                <img style={{cursor:"pointer"}} className="postProfileImg" src={PF + user.profilePicture || PF + "unknown.webp"} alt="" />
              </Link>
                <span className="postUsername">{user.username}</span>
                <span className="postDate">{format(post.createdAt)}</span>
              </div>
              <div className="postTopRight">
                <MoreVert />
              </div>
            </div>

            <div className="postCenter">
              <span className="postText">{post?.desc}</span>
              <img src={PF + post.img} alt="" className="postImg" />

            </div>

            <div className="postBottom">
              <div className="postBottomLeft">
                <img className="likeIcon" src={PF + "like.png"} onClick={likeHandler} alt="" />
                <img className="likeIcon" src={PF + "heart.png"} onClick={likeHandler} alt="" />
                <span className="postLikeCounter">{like} people liked it</span>
              </div>
              <div className="postBottomRight">
                <span className="postCommentText">{post.comments} comments</span>
              </div>
            </div>

          </div>
        </div>
      
       

  )
}


