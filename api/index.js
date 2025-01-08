
const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const UserRoute = require('./routes/users.js');
const AuthRoute = require('./routes/auth.js');
const PostsRoute = require('./routes/posts.js');
const multer = require("multer");
const cors = require("cors");
const path = require("path")

dotenv.config();
const app = express();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors({ origin: "http://localhost:5173", credentials: true}))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
   
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/users", UserRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/post", PostsRoute);

app.listen(8800, () => {

    console.log("Backend server is running!");
});