const userModel = require("../models/user")
const jwt = require("jsonwebtoken")
const blacklistTokenModel = require("../models/blacklistTokens.model")

module.exports.findToken = async function(req,res,next){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    if(!token) return res.status(401).json({message: "Unauthorized"})
    const tokenExists = await blacklistTokenModel.findOne({ token });
    if (tokenExists) {
        
        return res.status(401).json({ message: "Unauthorized" });
    }
    
        try {
            const decoded = jwt.verify(token,process.env.SECRET_KEY)
        
        
        const user = await userModel.findById(decoded._id)
        if(user) req.user = user

        return next()
        } catch (error) {
            return res.status(401).json({message:"Unauthorized"})
        }
    
}