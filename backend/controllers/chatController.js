const { generateStreamToken } = require("../config/stream");

const getStreamToken = async (req, res)=>{
    try {
        const token = generateStreamToken(req.user.id);
        if (!token) {
            return res.status(500).json({
                success: false,
                message: "Failed to generate token"
            });
        }
        return res.status(200).json({
            success: true,
            token: token
        });
    }catch(error){
        console.error("Error in getStreamToken:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

module.exports = {
    getStreamToken
}