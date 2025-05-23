const router = require("express").Router();
const Post = require("../models/Post.js");
const User = require("../models/User.js");


//Create a Post

router.post("/", async (req, res) => {

    const newPost = new Post(req.body);

    try {

        const savedPost = await newPost.save();
        res.status(200).json(savedPost);

    } catch (error) {
        res.status(500).json(error);
    }
});

//Update a Post

router.put("/:id", async (req, res) => {


    try {

        const post = await Post.findById(req.params.id);

        if (post.userId === req.body.userId) {

            await post.updateOne({$set: req.body});
            res.status(200).json("Post has been updated");
        }
        else {
    
            return res.status(500).json("You can update only your post")
        }

    } catch (error) {
        res.status(500).json(error)
    }
    
});

//Delete a Post

router.delete("/:id", async (req, res) => {


    try {

        const post = await Post.findById(req.params.id);

        if (post.userId === req.body.userId) {

            await post.deleteOne();
            res.status(200).json("Post has been Deleted");
        }
        else {
    
            return res.status(500).json("You can delete only your post")
        }

    } catch (error) {
        res.status(500).json(error)
    }
    
});

//Like a Post

router.put("/:id/like", async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if(!post.likes.includes(req.body.userId)){

            await post.updateOne({$push: {likes : req.body.userId}});
            res.status(200).json("User Liked");
        }
        else{
            await post.updateOne({$pull: {likes : req.body.userId}});
            res.status(200).json("User UnLiked");
        }

    } catch (error) {
        res.status(500).json(error)
    }
    
});

//Get a Post

router.get("/:id", async (req,res) => {

    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error)
    }

});

//Get timeline Post

router.get("/timeline/:userId", async (req,res) => {

    try {

        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId : currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({userId: friendId});
            })
        );

        res.status(200).json(userPosts.concat(...friendPosts));
        
    } catch (error) {
        res.status(500).json(error)
    }
});

// Get User all post

router.get("/profile/:username", async (req,res) => {

    try {

        const user = await User.findOne({ username : req.params.username});
        const posts = await Post.find({ userId : user._id});

        res.status(200).json(posts);
        
    } catch (error) {
        res.status(500).json(error)
    }
});


module.exports = router;

