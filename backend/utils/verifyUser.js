const createError = require("./createError")
const jwt = require("jsonwebtoken")


const verifyUser = (req , res , next) => {

    const token = req.cookies.access_token

    if(!token){
        return next(createError(401 , "Unauthorized"))
    }

    jwt.verify(token , process.env.JWT_SECRET , (err , decodedToken) => {
        
        if(err){
            return next(createError(403 , "Forbidden"))
        }

        req.userId = decodedToken.id

        next()

    })
}


module.exports = verifyUser