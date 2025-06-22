const passwordEncryption = require("../config/passwordEncryption");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { upsertStreamUser } = require("../config/stream");

const signUpController = async (req, res)=>{
    const { email, password, fullName } = req.body;
    try{
        if(!email || !password || !fullName){
            return res.status(400).send("All fields are required");
        }
        if(password.length < 6){
            return res.status(400).send("Password must be at least 6 characters long");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).send("User already exists with this email");
        }
        const hashedPassword = await passwordEncryption(password);
        const randomAvatar = "https://api.dicebear.com/9.x/lorelei/svg"
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            profilePic: randomAvatar,
        })

        try{
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic,
            })
            console.log(`stream user created successfully: ${newUser.fullName}`);
        }catch(error){
            console.error('Error creating Stream user:', error);
            return res.status(500).send("Failed to create Stream user");
        }

        res.status(201).json({
            message: "User created successfully",
            user: newUser
        })

    }catch(error){
        console.error('Error during sign up:', error);
        res.status(500).send("Internal Server Error");
    }
}

const loginController = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).send("All fields are required");
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).send("User does not exist with this email");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).send("Invalid password");
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie("token", token);

        res.status(201).json({
            message: "User created successfully",
            user: user,
        })
    }catch(error){
        console.error('Error during login:', error);
        res.status(500).send("Internal Server Error");
    }
};

const logoutController = (req, res) => {
    try{
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    }catch(error){
        console.error('Error during logout:', error);
        res.status(500).send("Internal Server Error");
    }
} 

module.exports = {
    signUpController,
    loginController,
    logoutController
}