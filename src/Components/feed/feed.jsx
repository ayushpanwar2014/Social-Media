import "./feed.css"
import Share from "../share/share"
import Post from "../post/post"
import { useContext, useEffect, useState } from "react"
import apiRequest from "../../lib/apiRequest.js"
import { AuthContext } from "../../Context/AuthContext.jsx"

const feed = () => {

  const [posts,setPosts] = useState([]);

  const {currentUser} = useContext(AuthContext);

  useEffect(() => {

    const fetchPost = async () => {
      const res = await apiRequest.get("/post/profile/" + currentUser.username) 
                           && await apiRequest.get("/post/timeline/" + currentUser._id);
      setPosts(res.data.sort((p1,p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    }
    fetchPost()
  },[currentUser.username,currentUser._id])

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share/>
        {posts.map(p => (
          <Post  key={p._id} post={p}/>
        ))}
      </div>
    </div>
  )
}

export default feed
