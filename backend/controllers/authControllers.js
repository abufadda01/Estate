const Joi = require("joi")
const bcrypt = require("bcrypt")
const User = require("../models/userModel")
const createError = require("../utils/createError")


const signUp = async (req , res , next) => {

    const signUpSchema = Joi.object({
        username : Joi.string().required().min(3),
        email : Joi.string().email().required(),
        password : Joi.string().required().min(8)
    })
    
    const {value , error} = signUpSchema.validate(req.body , {abortEarly : false})

    if(error){
        return next(createError(400 , "Invalid Credentials"))
    }

    const {username , email , password} = value

    try {
        
        const user = new User({
            username ,
            email ,
            password
        })

        await user.save()

        res.json(user)


    } catch (error) {
        next(error)
    }
}





const signIn = async (req , res , next) => {

    const signInSchema = Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().required().min(8)
    })

    const {value , error} = signInSchema.validate(req.body)
    
    
    const {email , password} = value
    
    
    try {
        
        const user = await User.findOne({email}).select("+password")
        
        if(!user){
            return next(createError(404 , "User not found"))
        }

        if(error){
            return next(createError(500 , "Invalid Credentials"))
        }

        const isPasswordMatched = await bcrypt.compare(password , user.password)

        if(!isPasswordMatched){
            return next(createError(401 , "Wrong Password")) 
        }

        user.password = undefined

        const token = user.createJWT()

        res.cookie("access-token" , token , {httpOnly : true}).status(200).json({user})

    } catch (error) {
        next(error)
    }
}




module.exports = {signUp , signIn}