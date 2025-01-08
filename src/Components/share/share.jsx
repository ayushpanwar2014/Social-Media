import "./share.css"
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { AuthContext } from "../../Context/AuthContext";
import { useContext, useRef, useState } from "react";
import apiRequest from "../../lib/apiRequest";

const share = () => {

    const [file, setFile] = useState();
    const { currentUser } = useContext(AuthContext);
    const desc = useRef();
    const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
          userId: currentUser._id,
          desc: desc.current.value,
        };
        if (file) {
          const data = new FormData();
          const fileName = Date.now() + file.name;
          data.append("name", fileName);
          data.append("file", file);
          newPost.img = fileName;
          console.log(newPost);
          try {
            await apiRequest.post("/upload", data);
          } catch (err) {}
        }
        try {
          await apiRequest.post("/post", newPost);
          window.location.reload();
        } catch (err) {}
      };

    return (
        <div className="share">
            <div className="sharewrapper">
                <div className="shareTop">
                    <img  className="shareProfileImg" src={currentUser.profilePicture ? PF + currentUser.profilePicture : PF + "unknown.jpg"} alt="" />
                    <input ref={desc} placeholder={"What's on your mind " + currentUser.username + " ? "} className="shareInput" />
                </div>
                <hr className="shareHr" />
                <form className="shareButton" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMediaIcon htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                            <input style={{display: "none"}} type="file"  id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])}/>
                        </label>
                        <div className="shareOption">
                            <LabelIcon htmlColor="darkblue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <LocationOnIcon htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <AddReactionIcon htmlColor="HotPink" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="sharebutton" type="submit" >Share</button>
                </form>
            </div>
        </div>
    )
}

export default share
