const jwt =  require('jsonwebtoken');
const User = require('../model/User');

const isLoggedIn =async (req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({ message: "Unauthorized access" });
    }
    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id).select("-password");
        req.user = currentUser;
        next();
    }catch(error){
        console.error('Error during token verification:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = isLoggedIn;