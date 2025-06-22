const jwt =  require('jsonwebtoken');

const isLoggedIn = (req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({ message: "Unauthorized access" });
    }
    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    }catch(error){
        console.error('Error during token verification:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = isLoggedIn;