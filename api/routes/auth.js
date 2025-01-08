const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


//Register
router.post("/register", async (req,res) => {

    

    try {

        //generate hashed Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        

        //Create new User
        const newUser = await new User({
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword
        });

        //Save User in Database
        const user = await newUser.save();

        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json(error);
    }
});


//Login
router.post("/login", async (req,res) => {

    

    try {

        const user = await User.findOne({email: req.body.email});

        if (!user) return res.status(404).json("User Not Found");
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) return res.status(400).json("Invalid Credentials");

        const age =  1000 * 60 * 60 * 24 * 3;  
        
        const token = jwt.sign(
            {
                id : user.id,
                isAdmin: false,
            }, 
             "12encbsb2381bbd&&", 
            {expiresIn: age}
        )

        const { password, updatedAt, ...other } = user._doc

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: age,
        }).status(200).json(other)

    } catch (error) {
        
        res.status(500).json(error);
    }
});

router.post("/logout", async (req,res) => {

    res.clearCookie("token").status(200).json({message : "Logout Successful"});

});

module.exports = router;